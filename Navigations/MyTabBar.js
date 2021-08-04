import React from "react";

import { Height } from "../Global_Values/Global_Variables";
import { Container, Tab, View, Text } from "./MyTabBar_Styles";
import { Entypo, Ionicons, MaterialCommunityIcons, FontAwesome  } from '@expo/vector-icons';

import MiniMusic from "../#Components/MiniPlayer/MiniMusic";

import { useSelector } from "react-redux";

const MyTabBar = ({ state, descriptors, navigation }) => {

    const isPlaying = useSelector(state => state.PlayReducer);

    const Icon = (props) => {
        switch(props.label) {
            case "MENU":
                return <Entypo name="home" size={Height*0.028} style={{color: props.isFocused ?  "#F9BA00" : "white"}} />

            case "DEVICE MUSIC":
                return <Ionicons name="musical-notes" size={Height*0.025} style={{color: props.isFocused ?  "#F9BA00" : "white"}}/>

            case "PLAYLIST":
                return <MaterialCommunityIcons name="playlist-music" size={Height*0.028} style={{color: props.isFocused ?  "#F9BA00" : "white"}} />

            case "ABOUT":
                return <FontAwesome  name="info" size={Height*0.028} style={{color: props.isFocused ?  "#F9BA00" : "white"}} />

            default: return <Ionicons name="person" size={Height*0.025} style={{color: props.isFocused ?  "#F9BA00" : "white"}}/>;   
        }
    };
                            

    return (
        <Container>
            {isPlaying.length!==0 ? (
                <Tab style={{borderBottomWidth: 2, borderBottomColor: "black"}}>
                    <MiniMusic navigation={navigation}/>
                </Tab>
             ) : null}
            <Tab>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label = options.tabBarLabel !== undefined ?
                            options.tabBarLabel
                        : 
                            options.title !== undefined ? options.title : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <View 
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            key={label}
                        >
                            <Icon label={label} isFocused={isFocused}/>
                            <Text isFocused={isFocused}> {label} </Text>
                        </View>
                    );
                })}
            </Tab>
        </Container>
    );
};

export default MyTabBar;