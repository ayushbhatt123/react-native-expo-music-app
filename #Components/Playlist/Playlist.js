import React, { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';

import { Container, Nav, View, Font, BackIcon, More,
        Text, MusicList, Music, MusicText, Span, Div, Styles} from "./Playlist_Style";

import { Avatar } from 'react-native-elements';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Width } from "../../Global_Values/Global_Variables";

import EmptyPlaylist from "./EmptyPlaylist";
import PlaylistOption from "./PlaylistOption";
import { PLAY, TOAST } from "../../Redux/Types/Types";
import { users } from "../../Global_Values/Global_Functions";
import { backHandlers } from "../../Global_Values/Global_Functions";

import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

const Playlist = ({navigation}) => {

    const [user, setUser] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState()

    const dispatch = useDispatch();
    const PlaylistData = useSelector(state => state.PlaylistReducer);
    const isPlaying = useSelector(state => state.PlayReducer);

    const comingSoon = () => {
        dispatch({
            type: TOAST,
            payload: {
                title: "Coming Soon",
                type: "info"
            }
        });
    };

    //send music to redux
    const handelPress = (val) => {
        dispatch({
            type: PLAY, 
            payload: val,
        });
    };

    //modal to remove from playlist
    const handelModal = (val) => {
        setModalData(val);
        setModalVisible(pre => !pre);
    };

    //call users when component renders
    useFocusEffect(() => {
        users().then(res => setUser(res));
    });

    //on back button press
    useEffect(() => {
        backHandlers(navigation);
    }, []);

    if(user===null) 
        return <EmptyPlaylist data={"USER"}/>
     else if(PlaylistData.length===0)
        return <EmptyPlaylist data={"PLAYLIST"}/>

    return (
        <SafeAreaView>
            <Container isPlaying={isPlaying}>
                <Nav> 
                    <View>
                        <AntDesign name="left" size={16} color="white" />
                        <Font> Playlist </Font>
                    </View>
                    <BackIcon onPress={comingSoon} activeOpacity={0.8}>
                        <AntDesign name="filter" size={15} color="white"/>
                        <Text> Filter </Text>
                    </BackIcon>
                </Nav>
                <ScrollView>
                    <MusicList>
                        {PlaylistData.map(ar => (
                            <Music currMusic={ar.url===isPlaying.url} key={ar.idx} onPress={() => handelPress(ar)} activeOpacity={0.8}>
                                {ar.url===isPlaying.url ? (
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
                                            source={{uri:ar.artwork}}
                                        />
                                        <Div>
                                            <MusicText numberOfLines={1}> {ar.title || "Undefined"} </MusicText>
                                            <Span numberOfLines={1}> {ar.artist || "undefined"} </Span>
                                        </Div>
                                    </LinearGradient>
                                ) : (<>
                                    <Avatar
                                        size={Width*0.16}
                                        rounded
                                        source={{uri:ar.artwork}}
                                    />
                                    <Div>
                                        <MusicText numberOfLines={1}> {ar.title || "Undefined"} </MusicText>
                                        <Span numberOfLines={1}> {ar.artist || "Undefined"} </Span>
                                    </Div>
                                </>)}
                                <More>
                                    <Feather name="more-horizontal" size={25} color="white" onPress={() => handelModal(ar)}/>
                                </More>
                            </Music>
                        ))}
                    </MusicList>
                </ScrollView>
                {modalVisible ? (
                    <PlaylistOption isVisible={modalVisible} close={handelModal} data={modalData} user={user}/>
                ) : null}
            </Container>
        </SafeAreaView>
    );  
};

export default Playlist;