import React, { useRef } from "react";

import { Overlay } from 'react-native-elements';
import { Width } from "../../Global_Values/Global_Variables";
import { Styles, Buttons, Button1, Button2, ButtonText, ButtonText2, HeadText, ConfirmText, Header } from "./Menu_Style";

import LottieView from 'lottie-react-native';

const Exit = (props) => {

    const animation = useRef(null);

    return (
        <Overlay
            isVisible={props.visible}
            onBackdropPress={props.toggle} 
            overlayStyle={Styles.component}
        >
            <Header>
                <LottieView 
                    ref={animation}
                    source={require('../../Animations/exit.json')} 
                    loop={true} 
                    autoPlay={true}
                    style={{width: Width*0.10, height: Width*0.10}}
                />
                <HeadText> Exit </HeadText>
            </Header>
            <ConfirmText> Are you sure you want to exit !! </ConfirmText>
            <Buttons>
                <Button1 activeOpacity={0.8} onPress={() => props.toggle()}> 
                    <ButtonText> No </ButtonText>
                </Button1>
                <Button2 activeOpacity={0.8} onPress={() => props.exitApp()}> 
                    <ButtonText2> Yes </ButtonText2> 
                </Button2>
            </Buttons>
        </Overlay >
    );
};

export default Exit;