import styled from "styled-components/native";
import { Width, Height } from "./Global_Variables";

export const flex = {
    "justify-content": "center",
    "align-items": "center",
};

export const FontText = styled.Text`
    ${flex};
    font-weight: bold;
    letter-spacing: 0.5px;
    color: white;
`;

export const Page = styled.View`
    width: ${Width}px;
    height: ${Height}px;
    ${flex};
    background-color: #FFC800;
`;

export const container = styled.View`
    width: ${Width}px;
    justify-content: space-around;
    align-items: center;  
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    background-color: #000000;
`;

export const Header = styled(FontText)`
    max-width: ${Width*0.75}px;
    font-size: ${Width*0.09}px;
`;

export const TextInputs = styled.View`
    width: ${Width}px;
    ${flex};
`;

export const InputField = styled.View`
    width: ${Width*0.8}px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid white;
    border-radius: 20px;
    padding: 10px;
    margin-top: 15px;
`;

export const Input = styled.TextInput`
    width: 80%;
    ${flex};
    font-size: 16px;
    letter-spacing: 0.5px;
    color: white;
    margin-left: 10px;
`;

export const Buttons = styled.View`
    width: ${Width}px;
    ${flex};
`;

export const Button1 = styled.TouchableOpacity`
    width: ${Width*0.75}px;
    ${flex};
    border-radius: 20px;
    background-color: #FFC800;
    color: black;
    padding: 15px 25px;
`;

export const Button2 = styled(Button1)`
    background-color: black;
    color: white;
    font-weight: bold;
    border: 1px solid white;
    padding: 10px 25px;
    margin-top: 20px;
`;

export const ButtonText1 = styled(FontText)`
    font-size: 16.5px;
    letter-spacing: 1px;
    color: black;
`;

export const ButtonText2 = styled(ButtonText1)`
    color: white;
`;

export const Social = styled.View`
    width: ${Width*0.78}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Facebook = styled.TouchableOpacity`
    ${flex};
    border-radius: 50px;
    background-color: #4D68AC;
    padding: 10px 35px;
`;

export const Twitter = styled(Facebook)`
    background-color: #3E9CEC;
`;

export const Google = styled(Facebook)`
    background-color: #DE5246;
`;

export const Footer = styled.Text`
    ${flex};
    color: lightgray;
`;

export const Link = styled.Text`
    color: #FFC800;
`;