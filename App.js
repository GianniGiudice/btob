import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen";
import {createSwitchNavigator, createAppContainer} from "react-navigation";
import GameChoiceScreen from "./screens/GameChoiceScreen";

const App = createSwitchNavigator(
    {
        Home: HomeScreen,
        GameChoice: GameChoiceScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(App);