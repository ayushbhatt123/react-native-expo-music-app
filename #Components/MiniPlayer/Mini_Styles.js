import styled from "styled-components/native";
import { Width } from "../../Global_Values/Global_Variables";
import { flex, FontText } from "../../Global_Values/Global_Theme";

export const Container = styled.TouchableOpacity`
    width: ${Width}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #222222;
    padding-right: 20px;
`;

export const Header = styled.View`
    ${flex};
    flex-direction: row;
`;

export const View = styled.View`
    justify-content: center;
    align-items: flex-start;
    margin-left: 6px;
`;

export const Text = styled(FontText)`
    width: ${Width*0.6}px;
    font-size: 18px;
`;

export const Span = styled(FontText)`
    width: ${Width*0.6}px;
    font-size: 13px;
    color: lightgray;
`;

export const Play = styled.TouchableOpacity`
    ${flex};
`;