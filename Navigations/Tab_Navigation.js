import React, { useEffect } from "react";

import MyTabBar from "./MyTabBar";
import Toast from "../Toast/Toast";
import Menu from "../#Components/Menu/Menu";
import About from "../#Components/About/About";
import Playlist from "../#Components/Playlist/Playlist";
import DeviceData from "../#Components/DeviceData/DeviceData";
import { NETWORK } from "../Redux/Types/Types";

import * as Network from "expo-network";
import { useDispatch, useSelector } from 'react-redux';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
  
const TabNavigation = () => {

    const dispatch = useDispatch();
    const data = useSelector(state => state.ToastReducer);

    const network = async() => {
        return await Network.getNetworkStateAsync().then(res => res);
    };

    useEffect(() => {
        network().then(res => (
            dispatch({
                type: NETWORK,
                payload: res.isConnected
            })
        ));
    }, [Network, network, dispatch]);

    return (<>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name="MENU" component={Menu} />
            <Tab.Screen name="DEVICE MUSIC" component={DeviceData} />
            <Tab.Screen name="PLAYLIST" component={Playlist} />
            <Tab.Screen name="INFO" component={About} />
        </Tab.Navigator>
        <Toast type={data.type} title={data.title}/>
    </>);
};

export default TabNavigation;