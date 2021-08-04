import * as API from "../../Api/Api";
import MusicData from "../../#Components/Menu/Music";
import { CREATE, FETCH_ALL, LIKES, TOAST } from "../Types/Types";

const notify = (title,type) => async(dispatch) => {
    dispatch({
        type: TOAST,
        payload: {
            title: title,
            type: type
        }
    });
};

export const createMusics = (music) => async(dispatch) => {
    try{
        const { data } = await API.createMusic(music);
        dispatch({
            type: CREATE,
            payload: data
        });
    }catch(err) {
        console.log(err);
    }
};

export const getMusics = () => async(dispatch) => {
    try{
        const { data } = await API.getMusic();
        dispatch({
            type: FETCH_ALL,
            payload: data
        });
    } catch(err) {
        console.log(err);
        dispatch({
            type: FETCH_ALL,
            payload: MusicData
        });
    }
};

export const likeMusic = (id,data) => async(dispatch) => {
    try {
        const { datas } = await API.likeMusic(id,data);
        dispatch({
            type: LIKES,
            payload: {mainId: id, idx: data.idx}
        });
        dispatch(notify("Thanks for feedback", "success"));
    } catch(err) {
        console.log(err);
        dispatch(notify(err.response.data.message, "error"));
    }
};