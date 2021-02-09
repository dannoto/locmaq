import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../services/firebaseConnection';

export default () => {
    const navigation = useNavigation();

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buscando Categorias
    useEffect(() => {
        async function getCategories() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategorias([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: childItem.val().categoria
                    };

                    if (data.nome !== "") {
                        setCategorias(oldArray => [...oldArray, data]);
                    } 
                })
                setLoading(false)
            })
        }

        getCategories();
    }, []);



    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <Text style={styles.titulo}>SELECIONE A CATEGORIA</Text>

                    {loading ?
                        (
                            <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#fff"}/>
                        ) :
                        (
                            <FlatList
                                data={categorias.sort((a,b) => a.nome.localeCompare(b.nome))}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Subcategorias', {catId: item.key})}>
                                        <Text style={styles.txtBtn}>{item.nome}</Text>
                                    </TouchableOpacity>
                                )}
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
        backgroundColor: '#ffa500'
    },
    container: {
        flex: 1,
        width: '100%'
    },
    area: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    titulo: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btn: {
        backgroundColor: 'transparent',
        marginTop: 20,
    },
    txtBtn:{
        width: '100%',
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#fff',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    }
})