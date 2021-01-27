import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import Anuncios from '../../components/Anuncios';
import firebase from '../../services/firebaseConnection';
import {useNavigation} from '@react-navigation/native';

export default () => {

const user = firebase.auth().currentUser;
const navigation = useNavigation();

const [equipamentos, setEquipamentos] = useState([]);
const [loading, setLoading] = useState(false);
const [modalvisible, setModalVisible] = useState(false);

useEffect(() => {
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
                    precoDiaria: childItem.val().precoDiaria,
                    codigoProduto: childItem.val().codigoProduto,
                    imagem0:childItem.val().imagem0,
                    imagem1:childItem.val().imagem1,
                    imagem2:childItem.val().imagem2,
                    imagem3:childItem.val().imagem3,
                    imagem4:childItem.val().imagem4,
                    imagem5:childItem.val().imagem5
                };

                setEquipamentos(oldArray => [...oldArray, data]);
            })
            setLoading(false)
        })
    }
    getEquipamentos();
}, []);

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

            <ScrollView style={modalvisible ? {backgroundColor: '#fff', opacity: 0.1} : ''}>
                <SafeAreaView style={styles.areaEquipamentos}>
                    {loading ?
                        (
                            <ActivityIndicator size={"large"} color={"#222"}/>
                        ) :
                        (
                            <FlatList
                                data={equipamentos}
                                renderItem={({item}) => (<Anuncios data={item} modalvisible={modalvisible} setModalVisible={setModalVisible}/>)}
                                keyExtractor={item => item.key}
                            />
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