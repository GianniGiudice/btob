import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import {StatusBar} from "expo-status-bar";
import Icon from "react-native-vector-icons/FontAwesome5";

const GameChoiceScreen = ({ navigation }) => {
    const [category, setCategory] = useState(1);
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

                <View style={ styles.categories }>
                    <TouchableOpacity onPress={() => setCategory(1)}>
                        <Text style={ [ styles.category, (category === 1) ? styles.activeCategory : '' ] }>
                            <Icon name="glass-martini" size={16} color="#fff" /> Soft
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setCategory(2)}>
                        <Text style={ [ styles.category, (category === 2) ? styles.activeCategory : '' ] }>
                            <Icon name="glass-cheers" size={16} color="#fff" /> Intermédiaire
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setCategory(3)}>
                        <Text style={ [ styles.category, (category === 3) ? styles.activeCategory : '' ] }>
                            <Icon name="hotjar" size={16} color="#fff" /> Hot
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={ styles.start } onPress={() => navigation.navigate('PreGame', { players: players, category: category })}>
                    <Text style={ styles.btnText }>Lancer le jeu</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={ styles.nbPlayers }>Joueurs : {players.length} / 10</Text>
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
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
        zIndex : 2
    },
    category: {
        padding: 10,
        color: '#fff',
        borderWidth: 1,
        borderColor: '#f2a951',
        fontWeight: 'bold',
        borderRadius: 10,
        zIndex: 1
    },
    activeCategory: {
        backgroundColor: '#f2a951'
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
    },
    nbPlayers: {
        color: '#fff',
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 20
    }
});

export default GameChoiceScreen;