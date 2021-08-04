import * as API from "../../Api/Api";
import { getPlaylist } from "./Playlist_Action";
import { AUTH, LOADING, TOAST } from "../Types/Types";

const loadingFalse = async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: false
    });
};

const notify = (title,type) => async(dispatch) =>{
    dispatch({
        type: TOAST,
        payload: {
            title: title,
            type: type
        }
    });
};
 
export const signIn = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signin(formData);
        dispatch({
            type: AUTH,
            payload: data,
        });
        dispatch(notify(`Welcome ${data?.result.name}`, "success"));
        router.navigate("TAB_NAVIGATION");
        dispatch(loadingFalse);
    } catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch(loadingFalse);
        dispatch(notify(err.response.data.message, "error"));
    }
};

export const signUp = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signup(formData);
        dispatch({
            type: AUTH,
            payload: data,
        });
        dispatch(getPlaylist(data?.result._id));
        dispatch(notify(`Welcome ${data?.result.name}`, "success"));
        router.navigate("TAB_NAVIGATION");
        dispatch(loadingFalse);
    } catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch(loadingFalse);
        dispatch(notify(err.response.data.message, "error"));
    }
};

export const updateProfiles = (id,formData) => async(dispatch) => {
    try {
        const { data } = await API.updateProfile(id,formData);
        dispatch({
            type: AUTH,
            payload: data,
        });
        dispatch(notify("Profile Updated Successfully", "success"));
    } catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch(notify("Error updating profile", "error"));
    }
};