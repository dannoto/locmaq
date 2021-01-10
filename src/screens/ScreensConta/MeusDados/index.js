import React, { useState, useEffect, useRef, isValidElement } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../../services/firebaseConnection';
// import ImagePicker from 'react-native-image-picker';
// import RNFetchBlob from 'react-native-fetch-blob';

// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = RNFetchBlob.polyfill.Blob;


// firebase.storage().ref().child('imagens/imagem.jpg')

export default () => {
    return (
        <View style={styles.container}>
            <Text>MeusDados</Text>
            <TouchableOpacity>
                <Text>CARREGAR FOTO</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})