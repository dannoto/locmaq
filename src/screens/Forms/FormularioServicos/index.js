import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

//Formulário Britadores
export default function FormBritador({ navigation, route }) {

    const {subnome, subkey, catkey} = route.params;
    navigation.setOptions({headerTitle: subnome.toUpperCase()});
    const navegacao = useNavigation();
    const categoria = {key:catkey, nome:'Serviços'};
    const subcategoria = {key:subkey, nome:subnome};
    const errors = {};

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    //Filtro Descrição
    function infoPrevent(text){
        if (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
            return false
        } 
        else {
            return true
        }     
    }

    function handleValidacao(){
        if (subcategoria.nome == "Outros") {  
            if (titulo.length < 1) {
                errors.titulo = Alert.alert('Opps!', 'Informe a Condição.')
            }
        }
        else if (infoPrevent(descricao) == false) {           
            errors.descricao = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        }  
        else {
            navegacao.navigate('SegundoFormBritador', 
            { 
                condicao: condicao,
                fabricante: fabricante,  
                modelo: modelo, 
                ano: ano,
                caracteristica: caracteristica, 
                capacidade: capacidade,
                peso: peso, 
                potencia: potencia,
                seguro: seguro, 
                infoAdicionais: infoAdicionais,
                categoria: categoria,
                subcategoria: subcategoria
            })
        }
    }

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>PREENCHA OS CAMPOS ABAIXO</Text>

                {subcategoria.nome == "Outros" ?
                    (
                        <View>
                            <Text style={styles.tituloInput}>TÍTULO</Text>
                            <View style={styles.areaInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    value={titulo}
                                    onChangeText={(text) => setTitulo(text)}
                                    keyboardType={'default'}
                                    maxLength={20}
                                />
                            </View>
                        </View>
                    ) :
                    (
                        false
                    )
                }

                <Text style={styles.tituloInput}>DESCRIÇÃO DO SERVIÇO</Text>
                <View style={styles.txtArea}>
                    <TextInput
                        style={styles.input}
                        multiline = {true}
                        numberOfLines = {1}
                        placeholder=""
                        value={descricao}
                        onChangeText={(text) => setDescricao(text)}
                        keyboardType={'default'}
                        maxLength={300}
                    />
                </View>
                <Text style={styles.atencao}>Atenção: Informações de contato só poderão ser passadas durante a negociação.</Text>

                <TouchableOpacity style={styles.btnProximo} onPress={handleValidacao}>
                    <Text style={styles.txtBtn}>ANUNCIAR</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background: {
        backgroundColor: '#ffa500',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btnProximo: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    txtBtn: {
        fontSize: 22,
        color: '#222',
        fontWeight: 'bold'
    },
    tituloInput: {
        fontSize: 20,
        color: '#fff',
        marginTop: 20,
        fontWeight: 'bold'
    },
    areaInput: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        marginTop: 10,
        paddingLeft: 5,
        paddingRight: 5,
        borderWidth: 2,
        borderColor: '#fff'
    },
    txtArea: {
        width: '100%',
        height: 260,
        backgroundColor: 'transparent',
        marginTop: 10,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: '#fff'
    },
    input: {
        width: '100%',
        fontSize: 20,
        color: '#fff'
    }, 
    tituloInfo: {
        fontSize: 20,
        color: '#fff',
        marginTop: 60,
        fontWeight: 'bold'
    },
    atencao: {
        fontSize: 18,
        color: '#222',
        marginTop: 5,
        textAlign: 'justify'
    }
})