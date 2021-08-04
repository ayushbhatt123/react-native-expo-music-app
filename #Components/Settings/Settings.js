import React, { useState, useEffect } from "react";

import { Container, Header, Views, Text, Span, Edit, Edits, EditTexts, Font,
    Options, Data, Logout, Texts, Nav, EditText, DataText, Info } from "./Settings_Style";

import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from '../../Global_Values/Component_Theme';

import { Datas } from "./Settings_Data";
import EditProfile from "./Edit_Profile";
import { LOGOUT } from "../../Redux/Types/Types";
import { users, openUrl } from "../../Global_Values/Global_Functions";

import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';

const Settings = ({navigation}) => {

    const [user, setUser] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const state = useSelector(state => state.AuthReducer);

    const dispatch = useDispatch();

    //navigate based on props
    const handelNavigation = (val) => {
        navigation.navigate(`${val}`);
    };

    //logout user
    const handelLogout = () => {
        dispatch({
            type: LOGOUT,
        });
        handelNavigation("MENU");
    };

    //execute when client press list from setting menu
    const handelPress = (val) => {
        if(val.type === "function") {
            val.URL();
            return;
        }
        
        if(val.type === "router") {
            handelNavigation(val.URL);
            return;
        }

        if(val.type === "url") {
            openUrl(val.URL);
            return;
        }

        return;
    };

    //manage modal of edit profile
    const handelModal = () => {
        if(user!==null) {
            setModalVisible(pre => !pre);
        } else {
            handelNavigation("WELCOME");
        }
    };

    //call users to update it
    useEffect(() => {
        users().then(res => setUser(res));;
    }, [state,modalVisible]);

    //call users when component renders
    useEffect(() => {
        users().then(res => setUser(res));
    }, []);

    return (
        <SafeAreaView>
            <Container>
                <Nav> 
                    <AntDesign name="left" size={16} color="white" onPress={() => navigation.goBack()} style={Icon.back}/>
                    <Font> Settings </Font>
                    <AntDesign name="left" size={16} color="transparent" style={Icon.back}/>
                </Nav>
                <Header>
                    {user!==null ? (<>
                        <Views>
                            <Avatar size={70}
                                rounded
                                source={{
                                    uri:
                                    'https://res.cloudinary.com/ayushbhatt/image/upload/v1624415007/Avatar/jgpinmwtnr0omhn2dspx.jpg',
                                }}
                            />
                            <Info>
                                <Text numberOfLines={1}> {user?.result.name} </Text>
                                <Span> {user?.result.userName} </Span> 
                            </Info>
                        </Views>
                        <Edit activeOpacity={0.8} onPress={handelModal}>
                            <EditText> Edit Profile </EditText>
                        </Edit>
                    </>) : (
                        <Edits activeOpacity={0.8} onPress={handelModal}>
                            <EditTexts> Login OR Sign Up </EditTexts>
                        </Edits>
                    )}
                </Header>
                <Options>
                    {Datas.map(ar => (
                        <Data key={ar.id} onPress={() => handelPress(ar)} activeOpacity={0.8}>
                            <DataText> {ar.title} </DataText>
                            <AntDesign name="right" size={15} color="gray" style={Icon.icon}/>
                        </Data>
                    ))}
                </Options>
                {user!==null ? (
                    <Logout activeOpacity={0.8} onPress={handelLogout}>
                        <Texts> LOG OUT </Texts>
                    </Logout>
                ) : null}
            </Container>
            <EditProfile isVisible={modalVisible} close={handelModal} user={user}/>
        </SafeAreaView>
    );
};

export default Settings;