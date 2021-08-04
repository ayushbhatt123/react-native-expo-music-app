import styled from "styled-components/native";
import { Width } from "../../Global_Values/Global_Variables";
import { flex, FontText } from "../../Global_Values/Global_Theme";
import { container, avatarView, nav } from "../../Global_Values/Component_Theme";

export const Container = styled(container)`
    padding: 15px 0px;
`;

export const Nav = styled(nav)``;

export const Font = styled(FontText)`
    font-size: 18px;
`;

export const Header = styled.View`
    width: ${Width}px;
    height: 20%;
    ${flex};
    padding: 0px 15px;
`;

export const Info = styled.View`
    justify-content: center;
    align-items: flex-start;
`;

export const Views = styled.View`
    width: ${Width}px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

export const Text = styled(FontText)`
    font-size: 20px;
    color: lightgray;
    margin-left: 15px;
`;

export const Span = styled.Text`
    font-size: 11px;
    color: lightgray;
    margin-left: 15px;
`;

export const Edits = styled.TouchableOpacity`
    width: ${Width*0.3}px;
    height: ${Width*0.3}px;
    ${flex};
    background-color: #F2CD00;
    border: 1px solid #F2CD00;
    border-radius: 999px;
`;

export const Edit = styled.TouchableOpacity`
    width: ${Width*0.6}px;
    ${flex};
    border: 1px solid #F2CD00;
    border-radius: 10px;
    padding: 10px 55px;
`;

export const EditText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #F2CD00;
`;

export const EditTexts = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: #000;
`;

export const Options = styled.View`
    height: 68%;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px;
`;

export const Data = styled.TouchableOpacity`
    width: ${Width}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
`;

export const DataText = styled(FontText)`
    font-size: 15px;
    color: lightgray;
`;

export const Logout = styled.TouchableOpacity`
    width: ${Width*0.7}px;
    height: 7%;
    ${flex};
    background-color: #FAD200;
    border-radius: 20px;
    padding: 15px 0px;
`;

export const Texts = styled(FontText)`
    font-size: 15px;
    color: black;
`;

export const ModalComponent = styled(Container)`
    justify-content: flex-start;
`;

export const AvatarView = styled(avatarView)`
    margin: 8% 0;
`;

export const Upload = styled.TouchableOpacity`
    width: ${Width}px;
    ${flex};
    margin-top: 4%;
`;

export const UploadText = styled(FontText)`
    font-size: 16px;
`;