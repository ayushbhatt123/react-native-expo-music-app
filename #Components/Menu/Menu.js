import React, { useState, useEffect, useRef } from "react";

import { Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native"; 
import { Icon } from '../../Global_Values/Component_Theme';
import { Width, Height } from "../../Global_Values/Global_Variables";
import { Container, Nav, Font, Slides, Title, Text, View, Component } from "./Menu_Style";

import Exit from "./Exit";
import Sliders from "./Slider";
import { PLAY, TOAST } from "../../Redux/Types/Types";
import { getMusics } from "../../Redux/Action/Music_Action";
import { users } from "../../Global_Values/Global_Functions";
import { getPlaylist } from './../../Redux/Action/Playlist_Action';

import LottieView from 'lottie-react-native';
import { FlatList ,BackHandler } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

const Menu = ({navigation}) => {

    const animation = useRef();

    const [visible, setVisible] = useState(false);
    
    const dispatch = useDispatch();

    const Datas = useSelector(state => state.MusicsReducer);
    const isPlaying = useSelector(state => state.PlayReducer);
    const netStatus = useSelector(state => state.NetworkReducer);

    //navigate based on props
    const handelNavigation = (val) => {
        navigation.navigate(`${val}`);
    };

    //to show exit confirmation modal
    const toggleOverlay = () => {
        setVisible(pre => !pre);
        return true;
    };

    //exit from app
    const exitApp = () => {
        BackHandler.exitApp();
        return true;
    };

    //send pressed music to redux
    const handelPlay = (val,itemId) => {
        if(netStatus)
            dispatch({
                type: PLAY,
                payload: {...val, type:"SERVER", mainId:itemId},
            });
        else
            dispatch({
                type: TOAST,
                payload: {
                    title: "Connect to Network",
                    type: "warning" 
                }
            });
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            toggleOverlay
        );
    
        return () => backHandler.remove();
    }, []);

    //call function from redux action
    useEffect(() => {
        dispatch(getMusics());
    }, [dispatch]);

    //check for network and get playlist
    useEffect(() => {
        users().then(data => {
            if(data?.result)
                dispatch(getPlaylist(data?.result._id))
        });
    }, []);

    const renderItem = ({ item }) => {
        return (
            <Slides key={item._id}>
                <Title> {item.header} </Title>
                <ScrollView horizontal>
                    {item.data.map(arr => (
                            <View key={arr.idx} activeOpacity={0.8} onPress={() => handelPlay(arr,item._id)}>
                            <Image 
                                source={{ uri: arr.artwork }}
                                PlaceholderContent={<ActivityIndicator />}
                                style={{ width: Width*0.4, height: Height*0.15, borderRadius: 5, resizeMode: "cover" }}
                            />
                            <Text numberOfLines={1}> {arr.title} </Text>
                        </View>
                    ))}
                </ScrollView>
            </Slides>
        );
    };
    
    return (
        <SafeAreaView>
            <Container isPlaying={isPlaying}>
                <Nav> 
                    <AntDesign name="left" size={20} onPress={toggleOverlay} color="white" style={Icon.back}/>
                    <Font> MENU </Font>
                    <AntDesign name="setting" size={24} onPress={() => handelNavigation("SETTINGS")} color="white" style={Icon.back}/>
                </Nav>
                <ScrollView>
                    <Component>
                        <Sliders/>
                        {Datas.length === 0 ? (
                            <LottieView 
                                ref={animation}
                                source={require('../../Animations/loading1.json')} 
                                loop={true}
                                autoPlay={true} 
                                style={{width: Width*0.75, height: Width*0.75, zIndex: 999}}
                            />
                        ) : null}
                        <FlatList
                            data={Datas}
                            keyExtractor={item => item._id}
                            renderItem={renderItem}
                            initialNumToRender={5}
                            maxToRenderPerBatch={5}
                            windowSize={4}
                        />
                    </Component>
                </ScrollView>
            </Container>
            <Exit visible={visible} navigation={navigation} toggle={toggleOverlay} exitApp={exitApp}/>
        </SafeAreaView>
    );
};

export default Menu;