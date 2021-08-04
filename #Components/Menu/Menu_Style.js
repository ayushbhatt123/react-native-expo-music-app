import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import { flex, FontText } from "../../Global_Values/Global_Theme";
import { Width, Height } from "../../Global_Values/Global_Variables";
import { container, nav, font, buttons } from "../../Global_Values/Component_Theme";

export const Container = styled(container)`
    height: ${props => props.isPlaying.length!==0 ? 
            Height*0.84 : Height*0.92}px;
`;

export const Nav = styled(nav)` 
    width: ${Width}px;
    height: ${Height*0.05}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
`;

export const Component = styled.View`
    width: ${Width}px;
    min-height: ${Height*0.95}px;
    justify-content: space-between;
    align-items: center;
`;

export const Font = styled(font)``;

export const Lists = styled.View`
    width: ${Width}px;
    ${flex};
    background-color: black;
`;

export const Slider = styled.View`
    width: ${Width}px;
    justify-content: center;
    align-items: flex-start;
    border-radius: 15px;
    background-color: black;
    margin-top: 25px;
`;

export const Slides = styled(Slider)`
`;

export const View = styled.TouchableOpacity`
    ${flex};
    margin: 0px 10px;
`;

export const Title = styled(FontText)`
    font-size: 15px;
    margin-bottom: 5px;
`;

export const Text = styled(FontText)`
    width: ${Width*0.4}px;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: lightgray;
`;

export const Styles = StyleSheet.create({
    component: {
        width: Width*0.9,
        height: Height*0.25,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "lightgray",
        padding: 0
    }
});

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #DE5246;
    padding: 5px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const HeadText = styled(FontText)`
    font-size: 25px;
    color: black;
`;

export const ConfirmText = styled(FontText)`
    font-size: 18px;
    color: black;
`;

export const Buttons = styled(buttons)``;

export const Button1 = styled.TouchableOpacity`
    width: 35%;
    ${flex};
    background-color: #FFC800;
    border-radius: 10px;
    padding: 15px 0px;
    margin-bottom: 8px;
`;

export const Button2 = styled(Button1)`
    background-color: black;
`;

export const ButtonText = styled(FontText)`
    color: black;
    font-size: 18px;
`;

export const ButtonText2 = styled(ButtonText)`
    color: white;
`;