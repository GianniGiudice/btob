import React, {useEffect, useState} from 'react';
import { StatusBar } from "expo-status-bar";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    SafeAreaView, StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import {Player} from "../components/Player";
import Icon from "react-native-vector-icons/FontAwesome5";

const PreGameScreen = ({ navigation }) => {
    const players = navigation.getParam('players');
    const category = navigation.getParam('category');
    const [duo, setDuo] = useState([]);

    const randomItem = () => {
        return Math.floor(Math.random() * players.length);
    };

    const duoSelection = () => {
        let first = players[randomItem()];
        let second = {};
        do {
            second = players[randomItem()];
        } while (second.name === first.name);
        setDuo([first.name, second.name]);
    };

    useEffect(() => {
        duoSelection();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "if2a951os" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView style={ styles.container }>
                <View style={ styles.main }>
                    <Text style={ styles.intro }>
                        Au tour de...
                    </Text>
                    <Text style={ styles.duo }>{duo[0]} et {duo[1]}</Text>
                    <TouchableOpacity onPress={duoSelection}>
                        <Text style={ styles.refresh }>
                            <Icon name="sync-alt" size={28} color="#f2a951" /> Changer
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={ styles.bottom }>
                    <TouchableOpacity onPress={() => navigation.navigate('Game', { players: players, category: category, duo: duo })}>
                        <Text style={ styles.begin }>
                            Commencer !
                        </Text>
                    </TouchableOpacity>
                </View>
                <StatusBar hidden  />
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#272c33',
        alignItems: 'center',
        flexDirection: 'column'
    },
    main: {
        flex: 3,
        justifyContent: 'center'
    },
    intro: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 20
    },
    duo: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    refresh: {
        marginTop: 20,
        textAlign: 'center',
        color: '#f2a951',
        fontSize: 28
    },
    bottom: {
        flex: 1
    },
    begin: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        backgroundColor: '#f2a951',
        padding: 10,
        borderRadius: 10
    }
});

export default PreGameScreen;