import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView,  TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { AuthContext } from '../../../contexts/auth';

export default function Suporte() {

    const { mensagemSuporte, user } = useContext(AuthContext);
    const usuario = {key: user.uid, nome: user.nome, email: user.email};
    const errors = {};

    console.log(usuario)

    const [assunto, setAssunto] = useState('');
    const [assuntoOption, setAssuntoOption] = useState([  
        {key: 0, nome: 'SELECIONAR'},
        {key: 1, nome: 'DÚVIDA'},
        {key: 2, nome: 'RECLAMAÇÃO'},
        {key: 2, nome: 'SUGESTÃO'}
    ]);
    const [mensagem, setMensagem] = useState('');

    let assuntoItem = assuntoOption.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    function SelectPadraoAssunto(v,i) {
        if (v.key !== 0) {
           setAssunto(v);
        }  
    }

    function handleEnviar(){
        if (assunto.length < 1) {            
            errors.assunto = Alert.alert('Opps!', 'Informe o Assunto.')
        }  
        else if (mensagem.length < 1) {            
            errors.mensagem = Alert.alert('Opps!', 'Digite uma mensagem antes de prosseguir.')
        } 
        else {
            mensagemSuporte(assunto, mensagem, usuario)
            Alert.alert("","ENVIADO COM SUCESSO!")
            setAssunto('')
            setMensagem('')
        }  
    }

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.tituloInput}>ASSUNTO</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={assunto}
                    onValueChange={(itemValue, itemIndex) => SelectPadraoAssunto(itemValue)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {assuntoItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>MENSAGEM</Text>
                <View style={styles.txtArea}>
                    <TextInput
                        style={styles.input}
                        multiline = {true}
                        numberOfLines = {10}
                        textAlignVertical = 'top'
                        placeholder=""
                        value={mensagem}
                        onChangeText={(text) => setMensagem(text)}
                        keyboardType={'default'}
                        maxLength={3000}
                    />
                </View>

                <TouchableOpacity style={styles.btnAnunciar} onPress={handleEnviar}>
                    <Text style={styles.txtBtn}>ENVIAR</Text>
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
    btnAnunciar: {
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
    input: {
        width: '100%',
        fontSize: 20,
        color: '#fff'
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
    picker: {
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 10
    }
})