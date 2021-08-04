import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { flex, FontText } from "./Global_Theme";
import { Width, Height } from "./Global_Variables";

export const container = styled.View`
    width: ${Width}px;
    height: ${Height}px;
    justify-content: space-between;
    align-items: center;
    background-color: black;
`;

export const nav = styled.View` 
    width: ${Width}px;
    height: ${Height*0.05}px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const font = styled(FontText)`
    font-size: 25px;
`;

export const backIcon = styled.TouchableOpacity`
    flex-direction: row;
    ${flex};
    background-color: #292B30;
    border-radius: 10px;
    padding: 10px 15px;
`;

export const musicList = styled.View`
    width: ${Width}px;
    height: ${Height}px;
    justify-content: flex-start;
    align-items: center;
`;

export const buttons = styled.View`
    width: ${Width}px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`;

export const avatarView = styled.View`
    width: ${Width}px;
    ${flex};
    margin-top: 8%;
`;

export const linGra = {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 999,
};

export const Icon = StyleSheet.create({
    icon: {
        padding: 4,
    },
    back: {
        padding: 15,
    }
});