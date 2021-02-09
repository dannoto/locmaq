import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import Anuncios from '../../components/Anuncios'
import firebase from '../../services/firebaseConnection';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default () => {

const user = firebase.auth().currentUser;
const navigation = useNavigation();
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
                    categoria: childItem.val().categoria.nome,
                    subcategoria: childItem.val().subcategoria.nome,
                    ano: childItem.val().ano,
                    modelo: childItem.val().modelo,
                    preco: childItem.val().preco,
                    precoHora: childItem.val().precoHora,
                    codigoProduto: childItem.val().codigoProduto,
                    imagem0:childItem.val().imagem0,
                    imagem1:childItem.val().imagem1
                };
    
                setEquipamentos(oldArray => [...oldArray, data].reverse());
            })
            setLoading(false)
        })
    } 
     
}, [isFocused]);

    return (
        <View style={styles.background} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <View style={styles.header}>
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
            </View>

            <View style={styles.container}>
                <SafeAreaView style={styles.areaEquipamentos}>
                    {loading ?
                        (
                            <ActivityIndicator style={{justifyContent: 'center', alignItems: 'center'}} size={"large"} color={"#222"}/>
                        ) :
                        (
                            <View>
                                {equipamentos == "" ? 
                                    (
                                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                                            <MaterialCommunityIcons
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
                                        extraData={equipamentos}
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
            </View>
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
        width: '100%',
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
        width: '50%',
        marginLeft: 20,
        marginTop: 10,
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold'
    },
    btnAnunciar: {
        width: '50%',
        backgroundColor: '#ffa500',
        width: '30%',
        padding: 10,
        borderRadius: 5,
    },
    txtBtnAnunciar: {
        width: '100%',
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
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15
    }
})