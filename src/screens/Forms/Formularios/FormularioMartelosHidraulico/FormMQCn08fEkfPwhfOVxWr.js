import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';

//Formulário Martelos Hidraúlico
export default () => {

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>PREENCHA OS CAMPOS ABAIXO</Text>

                <TouchableOpacity style={styles.btnCadastrar} >
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
btnCadastrar: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
},
txtBtn: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold'
}
})