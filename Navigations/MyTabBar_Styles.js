import styled from "styled-components/native";
import { Width, Height } from "../Global_Values/Global_Variables";
import { flex, FontText } from "../Global_Values/Global_Theme";

export const Container = styled.View`
    width: ${Width}px;
    ${flex};
    background-color: #222222;
`;

export const Tab = styled.View`
    width: ${Width}px;
    height: ${Height*0.08}px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const View = styled.TouchableOpacity`
    ${flex};
`;

export const Text = styled.Text`
    font-size: 12px;
    color: ${props => props.isFocused ? "#F9BA00" : "white"}
`;