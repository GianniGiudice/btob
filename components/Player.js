import { StyleSheet, Text } from "react-native";
import React from "react";

const Player = ({ name }) => {
    return (
        <Text style={ styles.player }>{name}</Text>
    );
};

const styles = StyleSheet.create({
    player: {
        color: '#fff',
        backgroundColor: '#f2a951',
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        marginBottom: 5,
        marginLeft: 2.5,
        marginRight: 2.5
    }
});

export { Player };