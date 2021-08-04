import React, { useState ,useEffect, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { Container, Nav, Font, Menu, Buttons,
    Main, Like, Add, Text, View, Styles, Header } from "./Music_Styles";

import { Image } from 'react-native-elements';
import { ActivityIndicator } from "react-native"; 
import { Icon } from '../../Global_Values/Component_Theme';
import { Width } from "../../Global_Values/Global_Variables";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import { TOAST } from "../../Redux/Types/Types";
import { likeMusic } from "../../Redux/Action/Music_Action";
import { users } from '../../Global_Values/Global_Functions';
import { createPlaylist } from "../../Redux/Action/Playlist_Action";

import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, TouchableWithoutFeedback } from 'react-native';

const Music = (props) => {

    const play = useRef(null);
    const next = useRef(null);
    const tick = useRef(null);
    const heart = useRef(null);
    const previous = useRef(null);
    const animation = useRef(null);

    const [user, setUser] = useState(null);
    const [like, setLike] = useState(0);
    const [likeStatus, setLikeStatus] = useState(false);
    const [playlistStatus, setPlaylistStatus] = useState(false);
    
    const dispatch = useDispatch();
    const LikeData = useSelector(state => state.LikeReducer);
    const netStatus = useSelector(state => state.NetworkReducer);

    const notify = (title,type) => {
        dispatch({
            type: TOAST,
            payload: {
                title: title,
                type: type
            }
        });
    };

    //add music to playlist
    const handelAdd = () => {
        if(!netStatus)
            notify("Connect to Network!!", "warning");
        if(user?.result && netStatus) {
            dispatch(createPlaylist(user?.result._id,props.music))
            setPlaylistStatus(true);
        } else {
            notify("Sign in to create a playlist", "error")
        }
    };

    //like music
    const handelLike = () => {
        if(!netStatus)
            notify("Connect to Network!!", "warning");
        else {
            const data = {
                idx: props.music.idx,
                userId: user?.result._id,
            };
            setLikeStatus(true);
            dispatch(likeMusic(props.music.mainId,data));
        }
    };

    //play or pause audio
    const playPause = () => {
        props.isPlaying ? play.current.pause() : play.current.play();
        props.audioPlay(props.music);
    };

    //play previous music
    const previousPlay = () => {
        previous.current.play();
        props.playNext("PRE");
    };

    //play next music
    const nextPlay = () => {
        next.current.play();
        props.playNext("NEXT")
    };

    useEffect(() => {
        LikeData.map(ar => (
            ar.idx === props.music.idx ? setLike(1) : setLike(0)
        ))
    }, [props.music,LikeData]);

    //call users when component renders
    useEffect(() => {
        users().then(res => setUser(res));
    }, []);

    return (
        <SafeAreaView>
            <Modal animationType="slide" visible={props.isVisible} onRequestClose={props.handelModal}>
                <Container>
                    <Header>
                        <Nav> 
                            <Font numberOfLines={1}> {props.music.title || props.music.filename.replace(/.mp3/i, "") || "Unknown"} </Font>
                            <AntDesign name="down" size={25} color="white" onPress={props.handelModal} style={Icon.icon}/>
                        </Nav>
                        {props.music.artwork ? (
                            <Image 
                                source={{ uri: props.music.artwork }}
                                PlaceholderContent={<ActivityIndicator />}
                                style={{ width: Width*0.9, height: Width*0.9, borderRadius: 999, resizeMode: "cover" }}
                            />
                        ) : (
                            <LottieView 
                                ref={animation}
                                source={require('../../Animations/default.json')} 
                                loop={true}
                                autoPlay={true} 
                                style={{width: Width*0.9, height: Width*0.9}}
                            />
                        )}
                        <LinearGradient
                            colors={['#EE0070', '#5E5CDE']}
                            location={[0.45, 1]}
                            start={{ x: 0, y: 0}} 
                            end={{x: 1, y: 0.5}}
                            style={Styles.linearGradient}
                        >
                            <Slider
                                style={{width: Width*0.95, height: 10,}}
                                minimumValue={0}
                                maximumValue={1}
                                minimumTrackTintColor="#EE0070"
                                maximumTrackTintColor="transparent"
                                thumbTintColor="#fff"
                                value={props.seekBars()}
                                onValueChange={(val) => props.sliderPositions(val)}
                                onSlidingStart={() => props.setisSliding(true)}
                                onSlidingComplete={(val) => props.slidingSlider(val)}
                                tapToSeek={true}
                            />
                        </LinearGradient>
                    </Header>
                    <Menu>
                        <View>
                            <Text> {props.currentPosition} </Text>
                            <Text> {props.totalTime} </Text>
                        </View>
                        <Buttons>
                            <TouchableWithoutFeedback onPress={previousPlay}>
                                <LottieView 
                                    ref={previous}
                                    source={require('../../Animations/previous.json')} 
                                    loop={false} 
                                    style={{width: Width*0.15, height: Width*0.15}}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={playPause}>
                                <LottieView 
                                    ref={play} 
                                    source={!props.isPlaying ? require('../../Animations/play.json') : require('../../Animations/pause.json')} 
                                    loop={!props.isPlaying} 
                                    style={!props.isPlaying ? {width: Width*0.25, height: Width*0.25} : {width: Width*0.15, height: Width*0.15}}
                                    autoPlay={true}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={nextPlay}>
                                <LottieView 
                                   ref={next} 
                                   source={require('../../Animations/next.json')} 
                                   loop={false} 
                                   style={{width: Width*0.15, height: Width*0.15}}
                                />
                            </TouchableWithoutFeedback>
                        </Buttons>
                        <Main likeStatus={likeStatus}>
                            {likeStatus ? (
                                <LottieView 
                                    ref={heart} 
                                    source={require("../../Animations/heart.json")} 
                                    loop={false} 
                                    autoPlay={true}
                                    style={{width: Width*0.25, height: Width*0.25}}
                                    onAnimationFinish={() => setLikeStatus(false)}
                                />
                            ) : (
                                <Like onPress={handelLike}>
                                    <AntDesign name="hearto" size={20} color="white" style={Icon.icon}/>
                                    <Text> {props.music.like+like} </Text>
                                </Like>
                            )}
                            {playlistStatus ? (
                                <LottieView 
                                    ref={tick} 
                                    source={require("../../Animations/tick.json")}
                                    loop={false} 
                                    autoPlay={true}
                                    style={{width: Width*0.10, height: Width*0.10}}
                                    onAnimationFinish={() => setPlaylistStatus(false)}
                                />
                            ) : (
                                <Add onPress={handelAdd}>
                                    <MaterialIcons name="playlist-add" size={35} color="white" style={Icon.icon}/>
                                </Add>
                            )}
                        </Main>
                    </Menu>
                </Container>
            </Modal>
        </SafeAreaView>
    );
};

export default Music;