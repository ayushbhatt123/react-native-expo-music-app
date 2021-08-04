import React, { useRef } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Width, Height } from "../../Global_Values/Global_Variables";

import LottieView from 'lottie-react-native';

const EmptyPlaylist = ({data}) => {

    const ref = useRef(null);

    return (
        <View style={Styles.view}>
            <LottieView 
                ref={ref} 
                source={require('../../Animations/music.json')} 
                loop={true} 
                autoPlay={true}
                style={{width: Width*0.9, height: Width*0.9}}
            />
            <Text style={Styles.text}>
                {data!=="USER" ? "Add some songs to Playlist" : "Sign In to view Playlist"}    
            </Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    view: {
        width: Width,
        height: Height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
    },
    text: {
        color: "lightgray",
        fontSize: Width*0.075,
        marginTop: Height*0.1
    },  
});

export default EmptyPlaylist;