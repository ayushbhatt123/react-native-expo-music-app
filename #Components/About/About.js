import React, { useEffect } from "react";

import { Image } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native";
import { Icon } from '../../Global_Values/Component_Theme';
import { SafeAreaView } from "react-native-safe-area-context";
import { Width } from "../../Global_Values/Global_Variables";
import { Container, AvatarView ,Nav, List, Font, View, Heading, Text, H4, Menu, Grid } from "./About_Styles";

import { AboutData, AppData } from "./AboutData";
import { openUrl, backHandlers } from "../../Global_Values/Global_Functions";

import { useSelector } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

const About = ({navigation}) => {

    const isPlaying = useSelector(state => state.PlayReducer);

    //on back button press
    useEffect(() => {
        backHandlers(navigation);
    }, []);

    return (
        <SafeAreaView>
            <Container isPlaying={isPlaying}>
                <Nav> 
                    <AntDesign name="left" size={18} color="white" style={Icon.back}/>
                    <Font> ABOUT </Font>
                    <AntDesign name="left" size={18} color="transparent" style={Icon.back}/>
                </Nav>
                <ScrollView>
                    <AvatarView>
                        <Image 
                            source={require("../../assets/images/profile.jpg")}
                            PlaceholderContent={<ActivityIndicator />}
                            alt="img"
                            style={{ width: Width, height: Width*0.5, resizeMode: "cover"}}
                        />
                    </AvatarView>
                    <Text>
                        Full Stack Web and Android Developer
                    </Text>
                    <Grid>
                        {AboutData.map(ar => (
                            <View key={ar.id} activeOpacity={0.9} onPress={() => openUrl(ar.URL)} activeOpacity={0.8}>
                                <Image 
                                    source={{uri: ar.img}}
                                    PlaceholderContent={<ActivityIndicator />}
                                    style={{ width: Width*0.08, height: Width*0.08, resizeMode: "cover"}}
                                />
                                <Text numberOfLines={1}> {ar.data} </Text>
                            </View>
                        ))}
                    </Grid>
                    <H4> About App </H4>
                    <Grid>
                        {AppData.map(ar => (
                            <List key={ar.id}  activeOpacity={1}>
                                <Heading> {ar.title} </Heading>
                                {ar.details.map(arr => (
                                    <Menu key={arr}>
                                        <Text> - {arr} </Text>
                                    </Menu>
                                ))}
                            </List>
                        ))}
                    </Grid>
                </ScrollView>
            </Container>
        </SafeAreaView>
    );
};

export default About;