import React, { useState, useRef } from "react";

import { Page, Header, Buttons, Button1, ButtonText1, Social, Facebook,
        Twitter, Google, Footer, Link, TextInputs, InputField, Input } from "../../Global_Values/Global_Theme";
import { Image } from 'react-native-elements';
import { RegisterContainer } from "./Auth_Styles";
import { ActivityIndicator } from "react-native"; 
import { Width, Height } from "../../Global_Values/Global_Variables";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import { LOADING, TOAST } from "../../Redux/Types/Types";
import { signIn, signUp} from "../../Redux/Action/Auth_Action";

import { Keyboard } from "react-native";
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Auth = ({navigation}) => {

    const animation = useRef(null);

    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [showIcon, setShowIcon] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const isSignUp = useSelector(state => state.AuthStatus);
    const showLoading = useSelector(state => state.LoadingReducer);

    //show password on pressing eye icon
    const handelEyePress = () => {
        setShowPassword(pre => !pre);
    };

    //update formData when user type input
    const handelChange = (event,name) => {
        setFormData({...formData, [name]: event});
        if(name === "password" && event.length!==0)
            setShowIcon(true);
        else 
            setShowIcon(false);
    };

    //function to executes when user press submit btn
    const handelSubmit = () => {
        dispatch({
            type: LOADING,
            payload: true
        });
        if(isSignUp) {
            if(formData.password === formData.confirmPassword) {
                dispatch(signUp(formData, navigation));
                setFormData(initialState);
            }
             else {
                dispatch({
                    type: TOAST,
                    payload: {
                        title: "Password Mismatch",
                        type: "error" 
                    }
                });
                dispatch({
                    type: LOADING,
                    payload: false
                });
             }
        } else {
            dispatch(signIn(formData, navigation));
            setFormData(initialState);
        }
    };

    //notification
    const handelSoon = () => {
        dispatch({
            type: TOAST,
            payload: {
                title: "Coming Soon",
                type: "info" 
            }
        });
    };

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                extraHeight={15}
                extraScrollHeight={15}
            >
                <Page>
                    {showLoading ? (
                        <LottieView 
                            ref={animation}
                            source={require('../../Animations/loading1.json')} 
                            loop={true}
                            autoPlay={true} 
                            style={{width: Width*0.8, height: Width*0.8, position: "absolute", zIndex: 999}}
                        />
                    ) : null}
                    <Image 
                        source={require("../../assets/images/background.jpg")}
                        PlaceholderContent={<ActivityIndicator />}
                        style={{ width: Width*0.95, height: isSignUp ? Height*0.3 : Height*0.5 }}
                        resizeMode="contain"
                    />
                    <RegisterContainer isSignUp={isSignUp} style={showLoading ? {opacity: 0.8} : null}>
                        <Header> {isSignUp ? "Register" : "Login"} </Header>
                        <TextInputs>
                            {isSignUp ? (
                                <InputField>
                                    <Ionicons name="person-circle-outline" size={24} color="white"/>
                                    <Input
                                        placeholder="Name"
                                        value={formData.name}
                                        onChangeText={(e) => handelChange(e,"name")}
                                        blurOnSubmit={true}
                                        placeholderTextColor= "gray"
                                        autoCapitalize="words"
                                        maxLength={45}
                                        returnKeyType="next"
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                </InputField>
                            ) : null}
                            <InputField>
                                <MaterialCommunityIcons name="email-outline" size={24} color="white" />
                                <Input
                                    placeholder="Email"
                                    value={formData.email}
                                    onChangeText={(e) => handelChange(e,"email")}
                                    blurOnSubmit={true}
                                    placeholderTextColor="gray"
                                    keyboardType="email-address"
                                    maxLength={45}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </InputField>
                            <InputField>
                                <AntDesign name="lock" size={24} color="white" />
                                <Input
                                    placeholder="Password"
                                    value={formData.password}
                                    onChangeText={(e) => handelChange(e,"password")}
                                    blurOnSubmit={true}
                                    autoCompleteType="off"
                                    placeholderTextColor="gray"
                                    maxLength={15}
                                    secureTextEntry={!showPassword}
                                    returnKeyType="next"
                                    autoCapitalize="none"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                <Feather 
                                    name={showPassword ? "eye-off" : "eye"} 
                                    onPress={handelEyePress} 
                                    style={{display: showIcon ? "flex" : "none"}} 
                                    size={24} 
                                    color="white"
                                />
                            </InputField>
                            {isSignUp ? (
                                <InputField>
                                    <AntDesign name="lock" size={24} color="white"/>
                                    <Input
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChangeText={(e) => handelChange(e,"confirmPassword")}
                                        blurOnSubmit={true}
                                        placeholderTextColor="gray"
                                        autoCompleteType="off"
                                        maxLength={15}
                                        secureTextEntry={true}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        onSubmitEditing={Keyboard.dismiss}
                                    />
                                </InputField>
                            ) : null}
                        </TextInputs>
                        <Buttons>
                            <Button1 activeOpacity={0.8} onPress={handelSubmit}>
                                <ButtonText1> {isSignUp ? "Register" : "Login"} </ButtonText1>
                            </Button1>
                        </Buttons>
                        <Social>
                            <Facebook activeOpacity={0.8} onPress={handelSoon}>
                                <FontAwesome name="facebook" size={24} color="white"/>
                            </Facebook>
                            <Twitter activeOpacity={0.8} onPress={handelSoon}>
                                <AntDesign name="twitter" size={24} color="white"/>
                            </Twitter>
                            <Google activeOpacity={0.8} onPress={handelSoon}>
                                <AntDesign name="google" size={24} color="white"/>
                            </Google>
                        </Social>
                        <Footer>
                            Our <Link> privacy policy </Link> and <Link> terms & condition </Link>
                        </Footer>
                    </RegisterContainer>
                </Page>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

export default Auth;