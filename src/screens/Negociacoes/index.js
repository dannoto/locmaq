import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import firebase from '../../services/firebaseConnection';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import ListaConversas from '../../components/ListaConversas';

export default () => {

const user = firebase.auth().currentUser;
const navigation = useNavigation();

const [chats, setChats] = useState([]);
const [loading, setLoading] = useState(false);
const [loadingLista, setLoadingLista] = useState(false);

useEffect(() => {
    async function getChatList() {
        await firebase.database().ref('equipamentos').orderByChild('usuario/key').equalTo(user.uid).on('value', (snapshot) => {
            setChats([]);

            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    condicao: childItem.val().condicao.nome,
                    subcategoria: childItem.val().subcategoria.nome,
                    ano: childItem.val().ano.ano,
                    modelo: childItem.val().modelo,
                    // imagem: childItem.val().imagensURL,
                };

                setChats(oldArray => [...oldArray, data]);
            })
            setLoading(false)
        })
    }
    getChatList();
}, []);

    return (
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.header}>
                    <Text style={styles.titulo}>NEGOCIAÇÕES</Text>

                    <TouchableOpacity>
                        <EvilIcons
                            name='search'
                            size= {30}
                            color="#222"
                        />
                    </TouchableOpacity>
                    
                </View>
                
                {/* <View style={styles.busca}>
                    <TextInput 
                        style={{width: '78%', color: '#222', fontSize: 18, marginLeft: 10}}
                        placeholder="Pesquisar..."
                        placeholderTextColor= "#777"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        keyboardType={'default'}
                        returnKeyType="search"
                        autofocus
                        selectTextOnFocus
                    />  

                    {search.length > 0 ? 
                        ( 
                            <TouchableOpacity onPress={() => {setSearch('')}}>
                                <EvilIcons  
                                    name='close'
                                    size= {30}
                                    color="#222"
                                />
                            </TouchableOpacity>
                        ) :
                        (
                            null
                        )
                    }     
                
                </View> */}
            </SafeAreaView>

            <ScrollView>
                <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled> 
                    <View style={styles.areaEquipamentos}>
                        {loadingLista ?
                            (
                                <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#222"}/>
                            ) :
                            (
                                <FlatList
                                    data={chats}
                                    renderItem={({item}) => (<ListaConversas data={item}/>)}
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
    header: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#222',
        shadowRadius: 2,
        elevation: 7
    },
    busca: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#222',
        shadowRadius: 2,
        elevation: 7
    },
    titulo: {
        marginLeft: 10,
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold'
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