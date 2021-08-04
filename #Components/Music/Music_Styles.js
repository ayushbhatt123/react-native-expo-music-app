import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { flex, FontText } from "../../Global_Values/Global_Theme";
import { Width, Height } from "../../Global_Values/Global_Variables";
import { container, nav, font, buttons, linGra } from "../../Global_Values/Component_Theme";

export const Container = styled(container)`
    padding: 15px 0px 5px;
`;

export const Nav = styled(nav)` 
    padding: 0px 10px;
    margin-bottom: 5px;
`;

export const Font = styled(font)`
    width: ${Width*0.6}px;
    ${flex};
`;

export const Header = styled.View`
    width: ${Width}px;
    height: ${Height*0.68}px;
    justify-content: space-between;
    align-items: center;
`;

export const Menu = styled(Header)`
    height: ${Height*0.28}px;
`;

export const Buttons = styled(buttons)`
    justify-content: space-between;
    padding: 0px ${Width*0.12}px;
`;

export const Add = styled.TouchableOpacity``;

export const Main = styled.View`
    width: ${Width}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: ${props => props.likeStatus ? "flex-end":"center"};
    padding: 0px 10px;
`;

export const Like = styled.TouchableOpacity`
    ${flex};
    flex-direction: row;
`;

export const View = styled(Buttons)`
    justify-content: space-between;
    padding: 0px 10px;
`;

export const Text = styled(FontText)`
    font-size: 14px;
    color: lightgray;
`;

export const Styles = StyleSheet.create({
    linearGradient: {
        height: Height*0.006,
        ...linGra,
    },
});