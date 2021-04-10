import React, {useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/FontAwesome5";
import { StyleSheet, Text, View, Image, TextInput, FlatList, Button, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Player } from "../components/Player";

const HomeScreen = ({ navigation }) => {
    const [players, setPlayers] = useState([]);
    const [name, setName] = useState('');
    const [id, setId] = useState(1);

    const { container, top, logo, middle, bottom, input, addButton, buttonText, invalidBtn, start } = styles;

    useEffect(() => {
        let p = [];
        if (navigation.getParam('players')) {
            p = navigation.getParam('players');
        }
        setPlayers(p);
    }, []);

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

    const removePlayer = (name) => {
        const playersCpy = [...players];

        playersCpy.splice(
            playersCpy.find(p => p.name === name),
            1
        );
        setPlayers(playersCpy);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "if2a951os" ? "padding" : "height"}
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
                        renderItem={({item}) => <Player key={item.id} name={item.name} removePlayer={removePlayer} />}
                        numColumns={3}
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
                    <TouchableOpacity onPress={() => navigation.navigate('GameChoice', {players: players})}>
                         <Text style={ [ start, players.length < 2 ? invalidBtn : '' ] }><Icon name="glass-cheers" size={24} color="#fff" /> C'est parti !</Text>
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
        alignItems: 'center',
        paddingTop: 20
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
        backgroundColor: 'grey',
        borderWidth: 0
    },
    start: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#f2a951',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
        backgroundColor: '#f2a951'
    }
});

export default HomeScreen;