import styled from "styled-components/native";
import { Width } from "../Global_Values/Global_Variables";
import { flex, FontText } from "../Global_Values/Global_Theme";

export const View = styled.View`
    width: ${Width}px;
    ${flex};
    margin-bottom: auto;
    margin-top: 5%;
`;

export const ModalComponent = styled.View`
    max-width: ${Width*0.8}px;
    height: 55px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => {
        switch(props.type) {
            case "success": return "#DCFCE7";
            case "error": return "#FDE2E2";
            case "info": return "#E0F2FE";
            case "warning": return "#FFEDD5";
            default: return "#000";
        }
    }}
    border-radius: 10px;
    padding: 10px;
`;

export const ModalText = styled(FontText)`
    max-width: ${Width*0.8}px;
    font-size: 16px;
    color: black;
    margin-left: 4px;
`;