import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome5";

const GameChoiceScreen = ({ navigation }) => {

    const players = navigation.getParam('players');

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home', {players: players})}>
                    <Text style={ styles.back }><Icon name="arrow-left" size={24} color="#f2a951" /></Text>
                </TouchableOpacity>
            </View>
            <View style={ styles.game }>
                <Text style={ styles.title }><Icon name="user-friends" size={24} color="#f2a951" /> Dos à Dos</Text>
                <Text style={ styles.description }>Deux joueurs sont sélectionnés. Ils se positionnent dos à dos et doivent répondre à une série de questions.</Text>
                <Text style={ styles.description }>A chaque question, ils doivent soit se désigner, soit désigner l'autre personne.</Text>
                <Text style={ styles.description }>S'ils ne désignent pas la même personne, ils boivent. Sinon, tous les autres joueurs boivent.</Text>

                <TouchableOpacity style={ styles.start } onPress={() => navigation.navigate('Home')}>
                    <Text style={ styles.btnText }>Lancer le jeu</Text>
                </TouchableOpacity>
            </View>
            <StatusBar hidden/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272c33'
    },
    back: {
        color: '#fff',
        paddingTop: 20,
        paddingLeft: 20
    },
    game: {
        paddingTop: 50,
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    description: {
        color: '#fff',
        marginTop: 10,
        fontSize: 16
    },
    start: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#f2a951',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        backgroundColor: '#f2a951'
    },
    btnText: {
        fontSize: 24,
        color: '#272c33',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default GameChoiceScreen;