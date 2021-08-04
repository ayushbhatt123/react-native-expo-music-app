import React from "react";

import Store from "../Redux/Store";
import Auth from "../#Components/Auth/Auth";
import TabNavigation from "./Tab_Navigation";
import Music from "../#Components/Music/Music";
import About from "../#Components/About/About";
import Welcome from "../#Components/Welcome/Welcome";
import Settings from "../#Components/Settings/Settings";

import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const Index = () => {

    return (
        <NavigationContainer>
            <Provider store={Store}>
                <Stack.Navigator
                    initialRouteName="TAB_NAVIGATION"
                    screenOptions={{headerShown: false}}
                >
                    <Stack.Screen name="TAB_NAVIGATION" component={TabNavigation}/>
                    <Stack.Screen name="WELCOME" component={Welcome}/>
                    <Stack.Screen name="AUTH" component={Auth}/>
                    <Stack.Screen name="SETTINGS" component={Settings}/>
                    <Stack.Screen name="MUSIC" component={Music}/>
                    <Stack.Screen name="ABOUT" component={About}/>
                </Stack.Navigator>
            </Provider>
        </NavigationContainer>
    );
};


export default Index;