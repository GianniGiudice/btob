import {StyleSheet, Text, TouchableOpacity} from "react-native";
import React from "react";

const Player = ({ name, removePlayer }) => {
    return (
        <TouchableOpacity onPress={ () => removePlayer(name) }>
            <Text style={ styles.player }>{name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    player: {
        color: '#fff',
        backgroundColor: '#f2a951',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 10,
        marginBottom: 5,
        marginLeft: 2.5,
        marginRight: 2.5
    }
});

export { Player };