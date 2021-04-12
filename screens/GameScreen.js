import React, {useEffect, useState} from 'react';
import {StatusBar} from "expo-status-bar";
import {
    KeyboardAvoidingView,
    SafeAreaView, StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import {questionsData} from "../data/questions";

const GameScreen = ({navigation}) => {
    const players = navigation.getParam('players');
    const category = navigation.getParam('category');
    const duo = navigation.getParam('duo');
    const [questions, setQuestions] = useState([]);
    const [curr, setCurr] = useState(0);
    const [duoPoints, setDuoPoints] = useState(0);
    const [groupPoints, setGroupPoints] = useState(0);
    const [sips, setSips] = useState(2);
    const data = questionsData;

    const deviceWidth = Dimensions.get('window').width;
    const nbQuestions = 20;
    const minSips = 2;
    const maxSips = 10;

    const getRandomQuestions = (arr, nb) => {
        let result = new Array(nb);
        let len = arr.length;
        let taken = new Array(len);
        while (nb--) {
            let x = Math.floor(Math.random() * len);
            result[nb] = arr[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    };

    const loadQuestions = () => {
        // Soft
        if (category === 1) {
            setQuestions(getRandomQuestions(data.soft, nbQuestions));
        }
        // Intermédiaire
        else if (category === 2) {
            let soft = getRandomQuestions(data.soft, nbQuestions / 2);
            let hot = getRandomQuestions(data.hot, nbQuestions / 2);
            let arr = soft.concat(hot);
            setQuestions(getRandomQuestions(arr, nbQuestions));
        }
        // Hot
        else {
            setQuestions(getRandomQuestions(data.hot, nbQuestions));
        }
    };

    const nextQuestion = () => {
        if (curr < nbQuestions) {
            setCurr(curr + 1);
        }
        setSips(Math.ceil(Math.random() * (maxSips - minSips) + minSips));
    };

    const duoLoss = () => {
        nextQuestion();
        setGroupPoints(groupPoints + 1);
    };

    const groupLoss = () => {
        nextQuestion();
        setDuoPoints(duoPoints + 1);
    };

    useEffect(() => {
        loadQuestions();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "if2a951os" ? "padding" : "height"}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.top}>
                    { curr < nbQuestions ? (
                        <View>
                            <Text style={styles.count}>{ curr < nbQuestions ? curr + 1 : nbQuestions } / {nbQuestions}</Text>
                            <Text style={styles.duo}>{duo[0]} et {duo[1]}</Text>
                            <Text style={styles.question}>{ questions[curr] }</Text>
                            <Text style={styles.sips}>Pour {sips} gorgées</Text>
                        </View>
                        ) : (
                            <View>
                                <Text style={styles.result}>
                                    {duoPoints === groupPoints ? 'Egalité' : (duoPoints > groupPoints) ? `Victoire de ${duo[0]} et ${duo[1]}`  : 'Victoire de la Table !' }
                                </Text>
                                <Text style={styles.points}>
                                    - Duo : {duoPoints} points
                                </Text>
                                <Text style={styles.points}>
                                    - Table : {groupPoints} points
                                </Text>
                            </View>
                                ) }
                </View>
                <View style={styles.bottom}>
                    { curr < nbQuestions ? (
                        <View style={[styles.buttons, {width: deviceWidth}]}>
                            <TouchableOpacity onPress={duoLoss}>
                                <Text style={[styles.btn, {marginLeft: 20}]}>Le duo boit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={groupLoss}>
                                <Text style={[styles.btn, {marginRight: 20}]}>La table boit</Text>
                            </TouchableOpacity>
                        </View>
                    ):(
                        <TouchableOpacity onPress={() => navigation.navigate('GameChoice', {players: players})}>
                            <Text style={[styles.btn, {textAlign: 'center', margin: 20}]}>REJOUER</Text>
                        </TouchableOpacity>
                    ) }
                </View>
                <StatusBar hidden/>
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
        flex: 3,
        paddingTop: 50
    },
    count: {
        color: '#fff',
        marginLeft: 10,
        marginBottom: 30
    },
    duo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 20,
        color: '#f2a951',
        fontWeight: 'bold'
    },
    question: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 38,
        padding: 10,
        textAlign: 'center'
    },
    sips: {
        textAlign: 'center',
        color: '#f2a951',
        fontSize: 22,
        marginTop: 20
    },
    bottom: {
        flex: 1,
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn: {
        backgroundColor: '#f2a951',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        borderRadius: 10,
        padding: 10
    },
    result: {
        paddingLeft: 20,
        paddingRight: 20,
        color: '#f2a951',
        fontSize: 38,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    points: {
        paddingLeft: 20,
        color: '#fff',
        fontSize: 18
    }
});

export default GameScreen;