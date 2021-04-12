import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/HomeScreen";
import {createSwitchNavigator, createAppContainer} from "react-navigation";
import GameChoiceScreen from "./screens/GameChoiceScreen";
import PreGameScreen from "./screens/PreGameScreen";
import GameScreen from "./screens/GameScreen";

const App = createSwitchNavigator(
    {
        Home: HomeScreen,
        GameChoice: GameChoiceScreen,
        PreGame: PreGameScreen,
        Game: GameScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(App);