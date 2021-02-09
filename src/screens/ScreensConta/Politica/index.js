import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../../services/firebaseConnection';

export default () => {

    const [dados, setDados] = useState('');

    // Buscando Dados
    useEffect(() => {
        async function getDados() {
            await firebase.database().ref('politica').on('value', (snapshot) => {
                setDados([]);

                let data = {
                    coletaDados: snapshot.val().coletaDados,
                    politicaPrivacidade: snapshot.val().politicaPrivacidade,
                    seguranca: snapshot.val().seguranca,
                    relacoesTerceiros: snapshot.val().relacoesTerceiros,
                    comunicacao: snapshot.val().comunicacao,
                    armazenamentoDados: snapshot.val().armazenamentoDados,
                    exclusaoDados: snapshot.val().exclusaoDados,
                    contato: snapshot.val().contato
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
                    <Text style={styles.resumo}>{dados.politicaPrivacidade}</Text>

                    <Text style={styles.titulo}>COLETA DE DADOS PESSOAIS</Text>
                    <Text style={styles.txt}>{dados.coletaDados}</Text>

                    <Text style={styles.titulo}>SEGURANÇA</Text>
                    <Text style={styles.txt}>{dados.seguranca}</Text>

                    <Text style={styles.titulo}>RELAÇÕES COM TERCEIROS</Text>
                    <Text style={styles.txt}>{dados.relacoesTerceiros}</Text>

                    <Text style={styles.titulo}>COMUNICAÇÃO</Text>
                    <Text style={styles.txt}>{dados.comunicacao}</Text>

                    <Text style={styles.titulo}>ARMAZENAMENTO DE DADOS</Text>
                    <Text style={styles.txt}>{dados.armazenamentoDados}</Text>

                    <Text style={styles.titulo}>EXCLUSÃO DE DADOS</Text>
                    <Text style={styles.txt}>{dados.exclusaoDados}</Text>

                    <Text style={styles.titulo}>CONTATO</Text>
                    <Text style={styles.txt}>{dados.contato}</Text>
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
    resumo: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'justify'
    },
    txt: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'justify'
    },
    titulo: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        marginBottom: 10,
        fontWeight: 'bold'
    }
})