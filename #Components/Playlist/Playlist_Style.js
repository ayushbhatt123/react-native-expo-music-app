import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { flex, FontText } from "../../Global_Values/Global_Theme";
import { Width, Height } from "../../Global_Values/Global_Variables";
import { container, nav, backIcon, linGra } from "../../Global_Values/Component_Theme";

export const Container = styled(container)`
    height: ${props => props.isPlaying.length!==0 ? 
            Height*0.84 : Height*0.92}px;
    padding-top: 15px;
`;

export const View = styled.View`
    flex-direction: row;
    ${flex};
`;

export const Nav = styled(nav)`
    padding: 10px 15px;
`;

export const Font = styled(FontText)`
    font-size: 20px;
`;

export const BackIcon = styled(backIcon)``;

export const Text = styled(FontText)`
    font-size: 15px;
    margin-left: 5px;
`;

export const MusicList = styled.View`
    justify-content: flex-start;
    align-items: center;
    margin-top: 15px;
`;

export const Music = styled.TouchableOpacity`
    width: ${Width-15}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    background-color: ${props => props.currMusic ? "transparent" : "#1D1F34"};
    margin-top: 8px;
    padding: 8px 10px;
`;

export const MusicText = styled(FontText)`
    font-size: 15px;
`;

export const Div = styled.View`
    width: ${Width*0.55}px;
    justify-content: center;
    align-items: flex-start;
    padding-left: 5px;
`;

export const More = styled.View`
    ${flex};
`;

export const Span = styled(FontText)`
    font-size: 15px;
    color: lightgray;
`;

export const Filters = styled.View`
    width: ${Width}px;
    height: ${Height*0.3}px;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #1F1F1F;
    padding: 15px;
`;

export const List = styled.TouchableOpacity`
    width: ${Width-30}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #1F1F1F;
`;

export const H4 = styled(FontText)`
    width: ${Width}px;
    ${flex};
    font-size: 25px;
    padding: 0;
    color: red;
    margin-bottom: 10px;
`;

export const ListItem = styled(FontText)`
    font-size: 18px;
    color: lightgray;
    padding: 5px;
`;

export const Styles = StyleSheet.create({
    linearGradient: {
        width: Width*0.75,
        ...linGra,
    },
});