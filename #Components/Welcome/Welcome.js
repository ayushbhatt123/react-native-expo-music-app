import React, { useState, useEffect } from "react";

import { Page, Header, Buttons, Button1, ButtonText1, ButtonText2, 
     Footer, Link ,Button2 } from "../../Global_Values/Global_Theme";

import { Image } from 'react-native-elements';
import { ActivityIndicator } from "react-native"; 
import { WelcomeContainer } from "./Welcome_Styles";
import { Width, Height } from "../../Global_Values/Global_Variables";

import { STATUS } from "../../Redux/Types/Types";
import { users } from "../../Global_Values/Global_Functions";

import { useDispatch } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';

const Welcome = ({navigation}) => {

    const [user, setUser] = useState();

    const dispatch = useDispatch();

    //navigate to login or signup based on buttonPressed
    const handelNavigation = (val,status) => {
        navigation.navigate(`${val}`);
        dispatch({
            type: STATUS,
            payload: status,
        });
    };

    //get user info whenever component renders
    useEffect(() => {
        users().then(res => setUser(res));
    }, []);

    //if already user then directly goto menu page 
    if(user) {
        navigation.navigate("MENU");
    };

    return (
        <SafeAreaView>
            <Page>
                <Image 
                    source={require("../../assets/images/background.jpg")}
                    PlaceholderContent={<ActivityIndicator/>}
                    style={{ width: Width*0.95, height: Height*0.55 }}
                    resizeMode="contain"
                />
                <WelcomeContainer>
                    <Header> Welcome </Header>
                    <Buttons>
                        <Button1 activeOpacity={0.9} onPress={() => handelNavigation("AUTH",true)}>
                            <ButtonText1> REGISTER </ButtonText1>
                        </Button1>
                        <Button2 activeOpacity={0.8} onPress={() => handelNavigation("AUTH",false)}>
                            <ButtonText2> LOG IN </ButtonText2>
                        </Button2>
                    </Buttons>
                   
                    <Footer>
                        Our <Link> privacy policy </Link> and <Link> terms & condition </Link>
                    </Footer>
                </WelcomeContainer>
            </Page>
        </SafeAreaView>
    );
};

export default Welcome;