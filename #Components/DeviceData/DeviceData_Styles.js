import styled from "styled-components/native";
import { FontText } from "../../Global_Values/Global_Theme";
import { Width, Height } from "../../Global_Values/Global_Variables";
import { nav, font, backIcon, musicList } from "../../Global_Values/Component_Theme";

export const Nav = styled(nav)``;
export const Font = styled(font)``;
export const BackIcon = styled(backIcon)``;

export const Text = styled(FontText)`
    font-size: 15px;
    margin-left: 5px;
`;

export const MusicList = styled(musicList)`
    min-height: 85%;
    height: ${props => props.isPlaying.length!==0 ? 
            Height*0.75 : Height*0.84}px;
`;

export const MusicText = styled(FontText)`
    width: ${props => props.currMusic ? Width*0.5 : Width*0.6}px;
    font-size: 14px;
`;

export const Div = styled.View`
    width: ${Width*0.65}px;
    justify-content: center;
    align-items: flex-start;
`;

export const Span = styled(FontText)`
    font-size: 15px;
    color: gray;
`;