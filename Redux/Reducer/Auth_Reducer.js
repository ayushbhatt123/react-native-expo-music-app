import { AUTH, LOGOUT } from "../Types/Types";
import * as SecureStore from 'expo-secure-store';
import Constants from "expo-constants";

const AuthReducer = async(state = {authData:null},action) => {
    switch(action.type) {

        case AUTH:
            await SecureStore.setItemAsync(Constants.manifest.extra.KEY, JSON.stringify({...action.payload}));
            return {...state, authData: action.payload};

        case LOGOUT:
            await SecureStore.deleteItemAsync(Constants.manifest.extra.KEY);
            return {...state, authData:null};

        default: return state;
    }
};

export default AuthReducer;