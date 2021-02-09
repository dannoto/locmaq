import React, {useEffect, useState, useCallback} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import Anuncios from '../../../components/Anuncios';
import firebase from '../../../services/firebaseConnection';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default ({navigation}) => {

const user = firebase.auth().currentUser;
const navegacao = useNavigation();
const isFocused = useIsFocused();

const [equipamentos, setEquipamentos] = useState([]);
const [loading, setLoading] = useState(false);


useEffect(() => {
    if (isFocused) { getEquipamentos()}

    async function getEquipamentos() {
        await firebase.database().ref('equipamentos').orderByChild('usuario/key').equalTo(user.uid).on('value', (snapshot) => {
            setEquipamentos([]);
    
            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    condicao: childItem.val().condicao.nome,
                    subcategoria: childItem.val().subcategoria.nome,
                    ano: childItem.val().ano,
                    modelo: childItem.val().modelo,
                    preco: childItem.val().preco,
                    precoHora: childItem.val().precoHora,
                    codigoProduto: childItem.val().codigoProduto,
                    imagem0:childItem.val().imagem0,
                    imagem1:childItem.val().imagem1,
                    imagem2:childItem.val().imagem2,
                    imagem3:childItem.val().imagem3,
                    imagem4:childItem.val().imagem4,
                    imagem5:childItem.val().imagem5
                };
    
                setEquipamentos(oldArray => [...oldArray, data].reverse());
            })
            setLoading(false)
        })
    } 
}, [isFocused]);

    return (
        <View style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
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

            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.areaEquipamentos}>
                    {loading ?
                        (
                            <ActivityIndicator style={{marginTop: 30}} size={"large"} color={"#222"}/>
                        ) :
                        (
                            <View>
                                {equipamentos == "" ? 
                                    (
                                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                                            <MaterialCommunityIcons
                                                // style={styles.icon}
                                                name='folder-alert-outline'
                                                size= {90}
                                                color='#d2d2d2'
                                            />
                                            <Text style={{color: '#707070', fontSize: 17, marginTop: 10}}>NENHUM ANÚNCIO CADASTRADO!</Text>
                                        </View>
                                    ) :
                                    (
                                        <FlatList
                                        data={equipamentos}
                                        renderItem={({item}) => (<Anuncios data={item}/>)}
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