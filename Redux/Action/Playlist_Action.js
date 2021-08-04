import * as API from "../../Api/Api";
import { CREATE_PLAYLIST, FETCH_PLAYLIST, DELETE_PLAYLIST, TOAST } from "../Types/Types";

const notify = (title,type) => async(dispatch) => {
    dispatch({
        type: TOAST,
        payload: {
            title: title,
            type: type
        }
    });
};

export const getPlaylist = (id) => async(dispatch) => {
    try{
        const { data } = await API.fetchPlaylist(id);
        dispatch({
            type: FETCH_PLAYLIST,
            payload: data
        });
    }catch(err) {
        console.log(err);
    }
};

export const createPlaylist = (id, datas) => async(dispatch) => {
    try{
        const { data } = await API.createPlaylist(id, datas);
        dispatch({
            type: CREATE_PLAYLIST,
            payload: datas
        });
        dispatch(notify("Added to Playlist", "success"));
    }catch(err) {
        console.log(err);
        dispatch(notify(err.response.data.message, "error"));
    }
};

export const deletesPlaylist = (id,music) => async(dispatch) => {
    try{
        const { datas } = await API.deletePlaylist(id,music);
        dispatch({
            type: DELETE_PLAYLIST,
            payload: music
        });
        dispatch(notify("Removed from playlist", "success"));
    }catch(err) {
        console.log(err);
    }
};