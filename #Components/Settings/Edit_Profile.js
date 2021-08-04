import React, { useState } from "react";

import { Avatar } from 'react-native-elements';
import { Icon } from "../../Global_Values/Component_Theme";
import { Width } from "../../Global_Values/Global_Variables";
import { InputField, Input } from "../../Global_Values/Global_Theme";
import { Nav, Font, AvatarView, ModalComponent } from "./Settings_Style";
import { AntDesign ,MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';

import { TOAST } from "../../Redux/Types/Types";

import { Modal } from "react-native";
import { useDispatch } from 'react-redux';
import { updateProfiles } from "../../Redux/Action/Auth_Action";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const EditProfile = (props) => {

    const initialState = {
        name: props.user?.result.name,
        password: "",
        confirmPassword: "",
    };

    const [showIcon, setShowIcon] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();

    //show password
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

    const sendToast = (title,type) => {
        dispatch({
            type: TOAST,
            payload: {
                title: title,
                type: type
            }
        });
    };

    //function to executes when user press submit btn
    const handelSubmit = () => {

        if(formData.name.length==0) {
            sendToast("Name cannot be empty", "warning");
        } 
        else if(formData.password !== formData.confirmPassword) {
            sendToast("Password Mismatch", "warning");
        }
        else {
            dispatch(updateProfiles(props.user?.result._id,formData));
            setFormData(initialState);
            props.close();
        }
    };

    return (
        <Modal animationType="slide" visible={props.isVisible} onRequestClose={props.close}>
            <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                extraHeight={15}
                extraScrollHeight={15}
            >
                <ModalComponent>
                    <Nav> 
                        <AntDesign name="close" size={24} color="white" onPress={props.close} style={Icon.back}/>
                        <Font> Edit Profile </Font>
                        <MaterialIcons name="done" size={24} color="white" onPress={handelSubmit} style={Icon.back}/>
                    </Nav>
                    <AvatarView>
                        <Avatar size={Width*0.5} rounded
                            source={{
                                uri: 'https:res.cloudinary.com/ayushbhatt/image/upload/v1624415007/Avatar/jgpinmwtnr0omhn2dspx.jpg',
                            }}
                        />
                    </AvatarView>
                    <InputField>
                        <Ionicons name="person-circle-outline" size={24} color="white"/>
                        <Input
                            placeholder="Edit Name"
                            placeholderTextColor="gray"
                            defaultValue={props.name}
                            value={formData.name}
                            onChangeText={(e) => handelChange(e,"name")}
                            blurOnSubmit={true}
                            autoCapitalize="words"
                            maxLength={45}
                            returnKeyType="next"
                        />
                    </InputField>
                    <InputField>
                        <AntDesign name="lock" size={24} color="white" />
                        <Input
                            placeholder="Change Password"
                            defaultValue={props.name}
                            value={formData.password}
                            onChangeText={(e) => handelChange(e,"password")}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            placeholderTextColor="gray"
                            blurOnSubmit={true}
                            maxLength={15}
                            returnKeyType="next"
                        />
                        <Feather 
                            name={showPassword ? "eye-off" : "eye"} 
                            onPress={handelEyePress} 
                            style={{display: showIcon ? "flex" : "none"}} 
                            size={24} 
                            color="white"
                        />
                    </InputField>
                    <InputField>
                        <AntDesign name="lock" size={24} color="white" />
                        <Input
                            placeholder="Confirm password"
                            defaultValue={props.name}
                            value={formData.confirmPassword}
                            onChangeText={(e) => handelChange(e,"confirmPassword")}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            placeholderTextColor="gray"
                            blurOnSubmit={true}
                            maxLength={15}
                            returnKeyType="send"
                        />
                    </InputField>
                </ModalComponent>
            </KeyboardAwareScrollView>
        </Modal>
    );
};

export default EditProfile;