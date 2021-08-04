import Constants from "expo-constants";
import * as SecureStore from 'expo-secure-store';
import { Linking, ToastAndroid, Share, BackHandler } from "react-native"

//navigate to main menu
export const backHandlers = (navigation) => {
    const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
            navigation.navigate("MENU");
            return true;
        }
    );
  
    return () => backHandler.remove();
};

export const onShare = async () => {
    try {
        await Share.share({
            message: "App link here",
        });
    } catch (err) {
        console.log(`Failed to share app: ${err}`);
    }
};

//get users info from encrypted secure store
export const users = async() => {
    try {
        const USER = await SecureStore.getItemAsync(Constants.manifest.extra.KEY);
        return JSON.parse(USER);
    } catch(err) {
        console.log(`Error at secure storage ${err}`)
    }
};

//open url in browser
export const openUrl = (URL) => {
    Linking.openURL(URL)
        .catch(err) (
            nativeToast("Error opening link")
    );
};

//toast notification
export const nativeToast = (message) => {
    return ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.TOP
    );
};

//toast notification
export const comingSoon = () => {
    return ToastAndroid.showWithGravity(
        "Coming Soon...",
        ToastAndroid.LONG,
        ToastAndroid.TOP
    );
};

//convert time to proper format
export const convertTime = (minutes) => {
    if(minutes) {
        const hrs = minutes / 60;
        const minute = hrs.toString().split(".")[0];
        const percent = parseInt(hrs.toString().split(".")[1].slice(0,2));
        const sec = Math.ceil((60*percent)/100);

        if(parseInt(minute) < 10 && sec < 10) {
            return `0${minute}:0${sec}`;
        }

        if(sec === 60) {
            return `${minute+1}:00`;
        }

        if(parseInt(minute) < 10) {
            return `0${minute}:${sec}`;
        }

        if(sec < 10) {
            return `${minute}:0${sec}`;
        }

        return `${minute}:${sec}`;
    }
};