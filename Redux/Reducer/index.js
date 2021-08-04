import { combineReducers } from "redux";

import AuthStatus from "./Auth_Status";
import AuthReducer from "./Auth_Reducer";
import PlayReducer from "./Play_Reducer";
import LikeReducer from "./Like_Reducer";
import ToastReducer from "./Toast_Reducer";
import MusicsReducer from "./Musics_Reducer";
import LoadingReducer from "./Loading_Reducer";
import NetworkReducer from "./Network_Reducer";
import PlaylistReducer from "./Playlist_Reducer";
import DeviceMediaReducer from "./DeviceMedia_Reducer";

const rootReducer = combineReducers({
    AuthReducer,  
    AuthStatus,  
    PlayReducer,
    PlaylistReducer,
    MusicsReducer,
    DeviceMediaReducer,
    LoadingReducer,
    LikeReducer,
    NetworkReducer,
    ToastReducer
});

export default rootReducer;