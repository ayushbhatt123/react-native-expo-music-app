import styled from "styled-components/native";
import { Width } from "../../Global_Values/Global_Variables";
import { flex, FontText } from "../../Global_Values/Global_Theme";
import { container, nav, avatarView, } from "../../Global_Values/Component_Theme";

export const ModalComponent = styled(container)`
    padding: 15px 0px 10%;
`;

export const Nav = styled(nav)``;

export const Font = styled(FontText)`
    font-size: 18px;
`;

export const AvatarView = styled(avatarView)``;

export const Delete = styled.TouchableHighlight`
    width: ${Width*0.4}px;
    height: ${Width*0.4}px
    ${flex};
    border-radius: 100px;
    border: 2px solid red;
    margin-top: 8%;
`;

export const DeleteText = styled(FontText)`
    font-size: ${Width*0.1}px;
    color: red;
`;

export const Text = styled(FontText)`
    font-size: 18px;
    margin-top: 15px;
`;