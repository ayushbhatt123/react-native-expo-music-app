import React from "react";

import { Avatar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { Icon } from '../../Global_Values/Component_Theme';
import { Width } from "../../Global_Values/Global_Variables";
import { deletesPlaylist } from "../../Redux/Action/Playlist_Action";
import { ModalComponent, Nav, Font, AvatarView, Delete, Text, DeleteText } from "./Playlist_Style2";

import { Modal } from "react-native";
import { useDispatch } from "react-redux";

const PlaylistOption = (props) => {

    const dispatch = useDispatch();

    //call delete function from redux action
    const deleteItem = () => {
        dispatch(deletesPlaylist(props.user?.result._id, {oldIdx:props.data.oldIdx}));
        props.close();
    };

    return (
        <Modal animationType="slide" visible={props.isVisible} onRequestClose={props.close}>
            <ModalComponent>
                <Nav> 
                    <AntDesign name="close" size={24} color="white" onPress={props.close} style={Icon.back}/>
                    <Font> Remove from playlist </Font>
                    <Font/>
                </Nav>
                <AvatarView>
                    <Avatar size={Width*0.8} rounded
                        source={{
                            uri: props.data.artwork,
                        }}
                    />
                    <Text> {props.data.title} </Text>
                </AvatarView>
                <Delete activeOpacity={0.8} onPress={deleteItem}>
                    <DeleteText> 
                        Remove
                    </DeleteText>
                </Delete>
            </ModalComponent>
        </Modal>
    );
};

export default PlaylistOption;