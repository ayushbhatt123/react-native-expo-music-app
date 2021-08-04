import React, { useState, useEffect } from "react";

import { Avatar } from 'react-native-elements';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Icon } from '../../Global_Values/Component_Theme';
import { Width } from "../../Global_Values/Global_Variables";
import { Nav, Font, MusicList, MusicText, Div } from "./DeviceData_Styles";
import { Container, Music, More, Styles } from "../Playlist/Playlist_Style";

import { PLAY, DEVICE_MEDIA, TOAST } from "../../Redux/Types/Types";
import { backHandlers } from './../../Global_Values/Global_Functions';

import { Alert, FlatList } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from "react-native-safe-area-context";

const DeviceData = ({navigation}) => {
    
    const [media, setMedia] = useState([]);

    const dispatch = useDispatch();
    const isPlaying = useSelector(state => state.PlayReducer);

    //send notification based on props
    const notify = (title,type) => {
        dispatch({
            type: TOAST,
            payload: {
                title: title,
                type: type
            }
        });
    };

    //send music to redux to play
    const handelPress = (val) => {
        dispatch({
            type: PLAY,
            payload: {...val, _id:val.id, url:val.uri, idx:val.id, type:"DEVICE"},
        });
    };

    //show alert box for permission error
    const notifyError = () => {
        Alert.alert("Permission Required", "This app need permission to read audio files", 
        [
            {
                text: "Ok",
                onPress: getPermission
            }, {
                text: "Cancel",
                onPress: notifyError
            }
        ])
    };

    //get all audio files from device
    const getAudioFiles = async() => {
        try {
            const media = await MediaLibrary.getAssetsAsync({
                mediaType: "audio"
            });
            setMedia(media.assets);
        } catch(err) {
            console.log(`Error at getting device audio ${err}`)
        }
    };

    //get permission to look for audio files in device
    const getPermission = async() => {
        try {
            const permission = await MediaLibrary.getPermissionsAsync();

            if(permission.granted) {
                getAudioFiles();
            }
    
            if(!permission.granted && !permission.canAskAgain)
                notify("You need to enable permission to play device songs","error");
    
            if(!permission.granted && permission.canAskAgain) {
                const { status, canAskAgain } =  await MediaLibrary.requestPermissionsAsync();
                if(status === "denied" && canAskAgain) {
                    notify("You must allow this permission to play music from device","warning");
                    notifyError();
                }

                if(status === "denied" && !canAskAgain) 
                    notify("You need to enable permission to play device songs","warning");
            }
        } catch(err) {
            console.log(`Error while getting permission ${err}`)
            notify("Error while getting permission","error");
        }
    };

    //on back button press
    useEffect(() => {
        backHandlers(navigation);
    }, []);

    //if new audio to device send to redux
    useEffect(() => {
        dispatch({
            type: DEVICE_MEDIA,
            payload: media,
        });
    }, [media]);

    //get permission on component renders
    useEffect(() => {
        getPermission();
    }, []);
    console.log(isPlaying.url)

    const renderItem = ({ item }) => {
        return (<>
            <Music currMusic={item.uri===isPlaying.url} key={item.filename} activeOpacity={0.7} onPress={() => handelPress(item)}>
                {item.uri===isPlaying.url ? (
                    <LinearGradient
                        colors={['#ff00bd', '#6D0AC4']}
                        location={[0.45, 1]}
                        start={{ x: 0, y: 0}} 
                        end={{x: 1, y: 0.5}}
                        style={Styles.linearGradient}
                    >
                        <Avatar
                            size={Width*0.16}
                            rounded
                            source={require("../../assets/images/music.jpg")}
                        />
                        <Div>
                            <MusicText numberOfLines={1} currMusic={item.uri===isPlaying.url}> 
                                {item.filename.replace(/.mp3/i, "")} 
                            </MusicText>
                        </Div>
                    </LinearGradient>
                ) : (<>
                    <Avatar
                        size={Width*0.16}
                        rounded
                        source={require("../../assets/images/music.jpg")}
                    />
                    <Div>
                        <MusicText numberOfLines={1} currMusic={item.uri===isPlaying.url}> 
                            {item.filename.replace(/.mp3/i, "")} 
                        </MusicText>
                    </Div>
                </>)}
                <More>
                    <Feather name="more-horizontal" onPress={() => notify("Coming Soon","info")} size={25} color="white"/>
                </More>
            </Music>
        </>);
    };

    return (
        <SafeAreaView>
            <Container isPlaying={isPlaying}>
                <Nav> 
                    <AntDesign name="left" size={16} color="white" onPress={() => navigation.goBack()} style={Icon.back}/>
                    <Font> Device Audio </Font>
                    <AntDesign name="left" size={16} color="transparent" style={Icon.back}/>
                </Nav>
                    <MusicList isPlaying={isPlaying}>
                        <FlatList
                            data={media}
                            keyExtractor={item => item.uri}
                            renderItem={renderItem}
                            initialNumToRender={10}
                            maxToRenderPerBatch={10}
                            windowSize={8}
                        />
                    </MusicList>
            </Container>
        </SafeAreaView>
    );
};

export default DeviceData;