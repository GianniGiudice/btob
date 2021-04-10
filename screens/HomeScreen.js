import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Button, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Player } from "../components/Player";

const HomeScreen = () => {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState(1);

    const { container, top, logo, middle, bottom, input, addButton, buttonText, invalidBtn } = styles;

    const addPlayer = () => {
        let nameLength = name.length;
        let playersNb = players.length;
        if (nameLength > 0 && playersNb < 10) {
            let player = {key: id.toString(), name: name};
            let currPlayers = players;
            currPlayers.push(player);
            setPlayers(currPlayers);
            setId(id + 1);
            setName('');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView style={ container }>
                <View style={ top }>
                    <Image source={require('../assets/img/logo.png')} style={ logo } />
                </View>
                <View style={ middle }>
                    <FlatList
                        key={'_'}
                        data={players}
                        renderItem={({item}) => <Player name={item.name}/>}
                        numColumns={2}
                    />
                </View>
                <View style={ bottom }>
                    <View style={{ flexDirection: 'row', height: 40 }}>
                        <TextInput
                            style={ input }
                            placeholder="Nom du joueur"
                            onChangeText={ name => setName(name) }
                            defaultValue={ name }
                            maxLength={15}
                        />
                        <TouchableOpacity onPress={addPlayer} style={[ addButton, (name.length < 1 || players.length > 9) ? invalidBtn : "" ]}>
                            <Text style={ buttonText }>+</Text>
                        </TouchableOpacity>
                    </View>
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
    top: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    logo: {
        width: 315,
        height: 315,
        marginBottom: 10
    },
    middle: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        width: '70%',
        marginRight: 10
    },
    addButton: {
        backgroundColor: "#f2a951" ,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 28
    },
    invalidBtn: {
        backgroundColor: 'grey'
    }
});

export default HomeScreen;