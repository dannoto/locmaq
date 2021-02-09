import React, { useState, useEffect, useContext } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { HeaderBackButton } from '@react-navigation/stack';
import {useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListaProdutos from '../../components/ListaProdutos';

export default ({navigation, route}) => {

    const { key, catNome, catServico } = route.params; 
    const isFocused = useIsFocused();
    const { user } = useContext(AuthContext); 
    const keyProduto = key;

    const [equipamentos, setEquipamentos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Buscando Produtos
    useEffect(() => {
        if (isFocused) { getEquipamentos(), getServicos()}
    
        async function getEquipamentos() {
            await firebase.database().ref('equipamentos').on('value', (snapshot) => {
                setEquipamentos([]);
        
                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        condicao: childItem.val().condicao.nome,
                        categoria: childItem.val().categoria.nome,
                        subcategoria: childItem.val().subcategoria.nome,
                        fabricante: childItem.val().fabricante,
                        ano: childItem.val().ano,
                        modelo: childItem.val().modelo,
                        estado: childItem.val().estado.nome,
                        cidade: childItem.val().cidade.nome,
                        preco: childItem.val().preco,
                        precoHora: childItem.val().precoHora,
                        codigoProduto: childItem.val().codigoProduto,
                        imagem0:childItem.val().imagem0
                    };
        
                    setEquipamentos(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false)
            })
        } 

        async function getServicos() {
            await firebase.database().ref('servicos').on('value', (snapshot) => {
                setServicos([]);
    
                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        subcategoria: childItem.val().subcategoria.nome,
                        titulo: childItem.val().titulo,
                        condicao: childItem.val().condicao,
                        estado: childItem.val().estado.nome,
                        cidade: childItem.val().cidade.nome,
                        imagem0: childItem.val().imagem0
                    };
    
                    setServicos(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false)
            })
        }
         
    }, [isFocused]);

    return (

        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <View style={styles.header}>
                <HeaderBackButton onPress={() => navigation.goBack()}/>

                <EvilIcons
                    name='search'
                    size= {30}
                    color='#222'
                />

                <TextInput 
                    style={{width: '68%', color: '#222', fontSize: 18, marginLeft: 10}}
                    placeholder='O que você está procurando?'
                    placeholderTextColor= "#777"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                    keyboardType={'default'}
                    returnKeyType='search'
                    autofocus
                    selectTextOnFocus
                />  

                {search.length > 0 ? 
                    ( 
                        <TouchableOpacity onPress={() => {setSearch('')}}>
                            <EvilIcons  
                                name='close'
                                size= {30}
                                color='#222'
                            />
                        </TouchableOpacity>
                    ) :
                    (
                        null
                    )
                }        
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>             
                <View style={styles.areaTitulo}>
                    {loading ?
                        (
                            <ActivityIndicator style={{marginTop: 30}} size={"large"} color={"#222"}/>
                        ) :
                        (
                            <SafeAreaView>
                                {!equipamentos ? 
                                    (
                                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                                            <MaterialCommunityIcons
                                                name='folder-alert-outline'
                                                size= {90}
                                                color='#d2d2d2'
                                            />
                                            <Text style={{color: '#707070', fontSize: 17, marginTop: 10}}>NENHUM ANÚNCIO ENCONTRADO!</Text>
                                        </View>
                                    ) :
                                    (
                                        <View>
                                            <FlatList
                                                showsHorizontalScrollIndicator={false}
                                                showsVerticalScrollIndicator={false}
                                                data={equipamentos}
                                                renderItem={({item}) => (<ListaProdutos data={item}/>)}
                                                keyExtractor={item => item.key}
                                            />
                                        </View>
                                    )
                                }
                            </SafeAreaView>
                        )
                    }   
                </View>
            </ScrollView>
        </KeyboardAvoidingView>    
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        width: '100%',
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#222',
        shadowRadius: 2,
        elevation: 7
    },
    areaTitulo: {
        flex: 1,
        justifyContent: 'space-between'
    },
    titulo: {
        color: '#222',
        fontSize: 18,
        marginTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})