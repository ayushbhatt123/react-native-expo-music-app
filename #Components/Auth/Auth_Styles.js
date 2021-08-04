import styled from "styled-components/native";
import { container } from "../../Global_Values/Global_Theme";

export const RegisterContainer = styled(container)`
    height: ${props => props.isSignUp ? "70%" : "50%"};
`;