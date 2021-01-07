import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Anuncios from '../../components/Anuncios';
import firebase from '../../services/firebaseConnection';
import {useNavigation} from '@react-navigation/native';

export default () => {

const navigation = useNavigation();

const [categorias, setCategorias] = useState([]);
const [loadingCat, setLoadingCat] = useState(true);

// Buscando Categorias
useEffect(() => {
    async function getCategories() {
        await firebase.database().ref('categorias').on('value', (snapshot) => {
            setCategorias([]);

            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    nome: childItem.val().categoria,
                    imagem: childItem.val().imagem
                };

                setCategorias(oldArray => [...oldArray, data].sort());
            })

            setLoadingCat(false)
        })
    }

    getCategories();
}, []);

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.areaBtnAnunciar}>
                    <Text style={styles.tituloAnuncios}>MEUS ANÚNCIOS</Text>
                    <TouchableOpacity style={styles.btnAnunciar} onPress={() => navigation.navigate ('Anunciar')}>
                        <Text style={styles.txtBtnAnunciar}>ANUNCIAR</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.areaBtnFiltro}>
                    <TouchableOpacity style={styles.btnAnuncios}>
                        <Text style={styles.txtBtnAnuncios}>EQUIPAMENTOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnAnuncios}>
                        <Text style={styles.txtBtnAnuncios}>SERVIÇOS</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.areaCategorias}>
                    {loadingCat ?
                        (
                            <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#222"}/>
                        ) :
                        (
                            <FlatList
                                data={categorias}
                                renderItem={({item}) => (<Anuncios data={item}/>)}
                                keyExtractor={item => item.key}
                            />
                        )
                    }
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex:1
    },
    areaBtnAnunciar: {
        justifyContent: 'space-between',
        marginRight: 20,
        marginTop: 20,
        flexDirection: 'row',
    },
    tituloAnuncios: {
        marginLeft: 20,
        marginTop: 10,
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnAnunciar: {
        backgroundColor: '#ffa500',
        width: '30%',
        padding: 10,
        borderRadius: 5,
    },
    txtBtnAnunciar: {
        color: '#fff', 
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    areaBtnFiltro: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtBtnAnuncios: {
        color: '#222',
        fontSize: 19,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10
    },
})