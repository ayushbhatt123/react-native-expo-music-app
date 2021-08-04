import styled from "styled-components/native";
import { flex, FontText } from "../../Global_Values/Global_Theme";
import { Width, Height } from "../../Global_Values/Global_Variables";
import { container, nav, font, avatarView, } from "../../Global_Values/Component_Theme";

export const Container = styled(container)`
    height: ${props => props.isPlaying.length!==0 ? 
            Height*0.84 : Height*0.92}px;
`;

export const Nav = styled(nav)`
    padding-top: 15px;
`;

export const Font = styled(font)`
    font-size: 24px;
`;

export const AvatarView = styled(avatarView)``;

export const Grid = styled.View`
    width: ${Width}px;
    ${flex};
`;

export const View = styled.TouchableOpacity`
    width: ${Width*0.9}px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color: #7768D8;
    margin-top: ${Height*0.01}px;
`;

export const List = styled(View)`
    width: ${Width*0.8}px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: ${Height*0.01}px;
`;

export const Menu = styled.View`
    ${flex};
`;

export const Heading = styled(FontText)`
    font-size: ${Width*0.08}px;
    color: #FE3E57;
    margin-top: 10px;
`;

export const Text = styled(FontText)`
    font-size: 18px;
    margin-top: 10px;
`;

export const H4 = styled(FontText)`
    font-size: 25px;
    margin-top: 10%;
`;