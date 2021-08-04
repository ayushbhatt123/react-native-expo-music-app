import React, { useState ,useEffect, useRef } from 'react';

import { Image } from 'react-native-elements';
import { ActivityIndicator } from "react-native"; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Width } from "../../Global_Values/Global_Variables";
import { Container, Play, Header, View, Span, Text } from "./Mini_Styles";

import Music from "../Music/Music";
import MusicData from '../Menu/Music';
import { PLAY } from '../../Redux/Types/Types';
import { convertTime } from '../../Global_Values/Global_Functions';

import { Audio } from 'expo-av';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

const MiniMusic = () => {

    const animation = useRef(null);
    
    const dispatch = useDispatch();
    const musics = useSelector(state => state.PlayReducer);
    const ServerData = useSelector(state => state.MusicsReducer);
    const PlaylistData = useSelector(state => state.PlaylistReducer);
    const DeviceData = useSelector(state => state.DeviceMediaReducer);

    const [modalVisible, setModalVisible] = useState(false);
    const [currMusic, setCurrMusic] = useState(null);
    const [playbackObj, setPlaybackObj] = useState(null);
    const [soundObj, setsoundObj] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [position, setPosition] = useState(0);
    const [sliderPosition, setSliderPosition] = useState(0);
    const [isSliding, setisSliding] = useState(false);

    const currentPosition = isSliding ? sliderPosition : convertTime(position/1000) || "00:00";
    const totalTime = convertTime(duration/1000);

    //open music in full screen
    const handelModal = () => {
        setModalVisible(pre => !pre);
    };

    //handel music play
    const audioPlay = async(val) => {
        try {
            //play song
            if(soundObj === null) {
                const audio = new Audio.Sound();
                Audio.setAudioModeAsync({
                    staysActiveInBackground: true,
                    playsInSilentModeIOS: true,
                    playThroughEarpieceAndroid: false,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                });
                const status = await audio.loadAsync(
                    { uri: val.url },
                    { shouldPlay: true }
                );
                audio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                audio.setProgressUpdateIntervalAsync(1000);
                setPlaybackObj(audio);
                setsoundObj(status);
                setCurrMusic(val);
            } 

            //pause song
            if(soundObj && soundObj.isLoaded && soundObj.isPlaying && currMusic.idx===val.idx) {
                const status = await playbackObj.setStatusAsync({shouldPlay: false});
                setsoundObj(status);
            }

            //resume song
            if(soundObj && soundObj.isLoaded && !soundObj.isPlaying && currMusic.idx===val.idx) {
                const status = await playbackObj.playAsync();
                setsoundObj(status);
            }

            //select another song
            if(soundObj && soundObj.isLoaded && currMusic.idx !== val.idx) {
                await playbackObj.stopAsync();
                await playbackObj.unloadAsync();
                const status = await playbackObj.loadAsync(
                    { uri: val.url },
                    { shouldPlay: true }
                );
                setsoundObj(status);
                setCurrMusic(val);
            }
        } catch(err) {
            console.log(`Error at audio ${err}`);
            //notify error pls retry
        }
    };

    const onPlaybackStatusUpdate = async(status) => {
        try {
            //constantly update duration and position
            if(status.isLoaded && status.isPlaying) {
                setDuration(status.durationMillis);
                setPosition(status.positionMillis);
                setSliderPosition(status.positionMillis);
            }
    
            //play next automatically
            if(status.didJustFinish) {
                setIsPlaying(false);
                playNext("NEXT");
            }
        } catch(err) {
            console.log(`Error at playback status ${err}`);
        }
    };

    //onSlidingComplete render this function
    const slidingSlider = async(value) => {
        try {
            if(soundObj === null) 
                return;
            const status = await playbackObj.setPositionAsync(Math.floor(soundObj.durationMillis*value));
            setsoundObj(status);
            setPosition(status.positionMillis);
            setisSliding(false);
            setIsPlaying(status.isPlaying);

        } catch(err) {
            console.log(`Error at slider completed ${err}`);
        }
    };
    
    //calculate seek bar value
    const seekBars = () => {
        if (duration === 0 || position === 0) {
            return 0;
        }
        return position/duration;
    };

    //get realtime sliders position
    const sliderPositions = (props) => {
        const val = convertTime(props*duration/1000);
        setSliderPosition(val);
    };

    //play next or previous music
    const playNext = (val) => {
        
        var index;

        if(musics.type==="SERVER") {
            if(currMusic!==null) 
                index = val==="NEXT" ? currMusic.idx+1 :  currMusic.idx-1;
            else 
                index = val==="NEXT" ? musics.idx+1 :  musics.idx-1;

            ServerData.map(ar => ar.data.filter(arr => arr.idx===index).map(song => {
                if(song)
                    dispatch({
                        type: PLAY,
                        payload: {...song, type:"SERVER"}, 
                    })
                else
                    PlaylistData.map(ar => ar.data.filter(arr => arr.oldIdx===index).map(song => (
                        dispatch({
                            type: PLAY,
                            payload: {...song, type:"SERVER"}, 
                        })
                    )))
            }));
            
        } else if(musics.type==="SLIDER") {
            if(currMusic!==null) 
                index = val==="NEXT" ? MusicData.find(arr => arr.id > currMusic.id) :  MusicData.find(arr => arr.id < currMusic.id) ;
            else 
                index = val==="NEXT" ? MusicData.find(arr => arr.id > musics.id) :  MusicData.find(arr => arr.id < musics.id) ;

            dispatch({
                type: PLAY,
                payload: {...index, _id:index.id, url:index.uri, idx:index.id, type:"DEVICE"}, 
            })
        }

        else{
            if(currMusic!==null) 
                index = val==="NEXT" ? DeviceData.find(arr => arr.id > currMusic.id) :  DeviceData.find(arr => arr.id < currMusic.id) ;
            else 
                index = val==="NEXT" ? DeviceData.find(arr => arr.id > musics.id) :  DeviceData.find(arr => arr.id < musics.id) ;

            dispatch({
                type: PLAY,
                payload: {...index, _id:index.id, url:index.uri, idx:index.id, type:"DEVICE"}, 
            })
        }
    };

    //update audio if new audio is selected
    useEffect(() => {
        if(currMusic !== musics)
            audioPlay(musics);
    }, [musics]);

    //update isPlaying object when change in sound object
    useEffect(() => {
        if(soundObj)
            setIsPlaying(soundObj.isPlaying);
    }, [soundObj]);

    return (
        <SafeAreaView>  
            <Container activeOpacity={0.8} onPress={handelModal}>
                <Header>
                    {musics.type === "SERVER" ?
                        <Image 
                            source={{ uri: musics.artwork }}
                            PlaceholderContent={<ActivityIndicator />}
                            style={{ width: Width*0.15, height: Width*0.15, borderRadius: 5 }}
                        />
                    :
                        <LottieView 
                            ref={animation}
                            source={require('../../Animations/default.json')} 
                            loop={true}
                            autoPlay={true} 
                            style={{width: Width*0.15, height: Width*0.15}}
                        />
                    }
                    <View>
                        <Text numberOfLines={1}> {musics.title || musics.filename.replace(/.mp3/i, "") || "Unknown"} </Text> 
                        <Span numberOfLines={1}> {musics.artist || "Unknown"} </Span>
                    </View>
                </Header>
                <Play onPress={() => audioPlay(musics)}>
                    <FontAwesome5 name={isPlaying ? "pause" : "play"} size={Width*0.08} color="white"/>
                </Play>
            </Container>
            <Music
                isVisible={modalVisible}
                handelModal={handelModal}
                music={musics}
                seekBars={seekBars}
                sliderPosition={sliderPosition}
                audioPlay={audioPlay}
                isPlaying={isPlaying}
                setisSliding={setisSliding}
                slidingSlider={slidingSlider}
                sliderPositions={sliderPositions}
                currentPosition={currentPosition}
                totalTime={totalTime}
                playNext={playNext}
            />
        </SafeAreaView>
    );
};

export default MiniMusic;