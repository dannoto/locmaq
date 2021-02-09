import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import firebase from '../../../services/firebaseConnection';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListaFavoritos from '../../../components/ListaFavoritos';

export default ({navigation}) => {

    const user = firebase.auth().currentUser;
    const navegacao = useNavigation();
    const isFocused = useIsFocused();

    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isFocused) {getFavoritos()}

        async function getFavoritos() {
            await firebase.database().ref('users').child(user.uid).child('favoritos').on('value', (snapshot) => {
                setFavoritos([]);
        
                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        condicao: childItem.val().condicao,
                        subcategoria: childItem.val().subcategoria,
                        ano: childItem.val().ano,
                        modelo: childItem.val().modelo,
                        titulo: childItem.val().titulo,
                        preco: childItem.val().preco,
                        precoHora: childItem.val().precoHora,
                        keyProduto: childItem.val().keyProduto,
                        imagem0:childItem.val().imagem0
                    };
        
                    setFavoritos(oldArray => [...oldArray, data]);
                })
                setLoading(false)
            })
        } 
    }, [isFocused]);

    return (
        <View style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.areaEquipamentos}>
                    {loading ?
                        (
                            <ActivityIndicator style={{marginTop: 30}} size={"large"} color={"#222"}/>
                        ) :
                        (
                            <View>
                                {favoritos == "" ? 
                                    (
                                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                                            <MaterialCommunityIcons
                                                name='folder-alert-outline'
                                                size= {90}
                                                color='#d2d2d2'
                                            />
                                            <Text style={{color: '#707070', fontSize: 17, marginTop: 10}}>VOCÊ NÃO POSSUI ANÚNCIOS FAVORITOS!</Text>
                                        </View>
                                    ) :
                                    (
                                        <FlatList
                                        data={favoritos}
                                        renderItem={({item}) => (<ListaFavoritos data={item}/>)}
                                        keyExtractor={item => item.key}
                                        showsVerticalScrollIndicator={false}
                                    /> 
                                    )
                                }
                            </View>
                        )
                    }
                </SafeAreaView>
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
    areaBtnFiltro: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtBtnAnuncios: {
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15
    }
})