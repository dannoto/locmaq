import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firebase from '../../../services/firebaseConnection';
import {useNavigation} from '@react-navigation/native';

import Anuncios from '../../../components/Anuncios';

export default () => {

const user = firebase.auth().currentUser;
const navigation = useNavigation();

const [equipamentos, setEquipamentos] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
    async function getEquipamentos() {
        await firebase.database().ref('equipamentos').orderByChild('usuario/key').equalTo(user.uid).on('value', (snapshot) => {
            setEquipamentos([]);

            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    condicao: childItem.val().condicao.nome,
                    subcategoria: childItem.val().subcategoria.nome,
                    ano: childItem.val().ano.ano,
                    modelo: childItem.val().modelo,
                    // imagem: childItem.val().imagensURL,
                };

                setEquipamentos(oldArray => [...oldArray, data]);
            })
            setLoading(false)
        })
    }
    getEquipamentos();
}, []);

    return (
        <View style={styles.background}>
            <View>
                <View style={styles.areaBtnFiltro}>
                    <TouchableOpacity style={styles.btnAnuncios}>
                        <Text style={styles.txtBtnAnuncios}>EQUIPAMENTOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnAnuncios}>
                        <Text style={styles.txtBtnAnuncios}>SERVIÇOS</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>
                <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled> 
                
                    

                    <View style={styles.areaEquipamentos}>
                        {loading ?
                            (
                                <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#222"}/>
                            ) :
                            (
                                <FlatList
                                    data={equipamentos}
                                    renderItem={({item}) => (<Anuncios data={item}/>)}
                                    keyExtractor={item => item.key}
                                />
                            )
                        }
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
        
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
    header:{
        backgroundColor: '#fff',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#222',
        shadowRadius: 2,
        elevation: 7
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
        marginTop: 30,
        marginBottom: 15
    },
    areaEquipamentos: {

    }
})