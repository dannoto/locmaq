import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import firebase from '../../services/firebaseConnection';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Categories from '../../components/Categories';

export default () => {

    const [categoriasBusca, setCategoriasBusca] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCat, setLoadingCat] = useState(true);
    const [emptyList, setEmptyList] = useState(false);
    const [list, setList] = useState([]);

    // Buscando Categorias
    useEffect(() => {
        async function getCategorias() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategoriasBusca([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: childItem.val().categoria,
                        servico: childItem.val().servico,
                        imagem: childItem.val().imagem
                    };

                    setCategoriasBusca(oldArray => [...oldArray, data]);
                })

                setLoadingCat(false)
            })
        }

        getCategorias();
    }, []);

    return (
        <View style={styles.background}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled>               

                    <View style={styles.areaCategorias}>
                        <Text style={styles.tituloCat}>SELECIONE A CATEGORIA</Text>
                        {loadingCat ?
                            (
                                <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#222"}/>
                            ) :
                            (
                                <FlatList
                                    data={categoriasBusca.sort((a,b) => a.nome.localeCompare(b.nome))}
                                    renderItem={({item}) => (<Categories data={item}/>)}
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
        flex: 1,
    },
    header: {
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
    areaCategorias: {
        flex: 1,
        justifyContent: 'center'
    },
    tituloCat: {
        color: '#222',
        fontSize: 16,
        marginTop: 20,
        paddingBottom: 20,
        paddingLeft: 20, 
        borderBottomWidth: 2,
        borderColor: '#ddd'
    }
})