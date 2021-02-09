import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../../services/firebaseConnection';

export default () => {

    const [dados, setDados] = useState('');

    // Buscando Dados
    useEffect(() => {
        async function getDados() {
            await firebase.database().ref('termos').on('value', (snapshot) => {
                setDados([]);

                let data = {
                    termosUso: snapshot.val().termosUso
                };

                setDados(data)
            })
        }

        getDados();
    }, []);

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <Text style={styles.titulo}>REEMBOLSO</Text>
                    <Text style={styles.txt}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
                </View>             
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#ffa500'
    },
    container: {
        flex: 1,
    },
    area: {
        justifyContent: 'center',
        padding: 20
    },
    txt: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase',
        marginBottom: 20,
        textAlign: 'justify'
    },
    titulo: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold'
    }
})