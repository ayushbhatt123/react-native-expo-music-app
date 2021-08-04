import React, { useState, useRef, useEffect } from "react";
import { ModalComponent, ModalText, View } from "./Toast_Styles";

import { CLEAR_TOAST } from "../Redux/Types/Types";

import { Modal } from "react-native";
import { useDispatch } from "react-redux";
import LottieView from 'lottie-react-native';

const Toast = (props) => {

    const animation = useRef(null);
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
            dispatch({
                type: CLEAR_TOAST,
            });
        }, 2000);
    }, [props]);

    if(props.title.length === 0 || props.type.length ===0) {
        return null;
    };

    return (
        <Modal animationType="fade" visible={isVisible} transparent={true}> 
            <View>
                <ModalComponent type={props.type}>
                    <LottieView 
                        ref={animation}
                        source={props.type === "success" ? require('../Animations/confirm.json') : 
                                props.type === "error"   ? require('../Animations/error.json') :
                                props.type === "info"   ? require('../Animations/info.json') :
                                require('../Animations/warning.json')
                        }
                        loop={false} 
                        autoPlay={true}
                        style={{width: 40, height: 40}}
                    />
                    <ModalText numberOfLines={1}>
                        {props.title}
                    </ModalText>
                </ModalComponent>
            </View>
        </Modal>
    );
};

export default Toast;