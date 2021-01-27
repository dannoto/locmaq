import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../services/firebaseConnection';

export default () => {
    const navigation = useNavigation();

    const [categoria, setCategoria] = useState([]);
    const [loading, setLoading] = useState(true);

    // Buscando Categorias
    useEffect(() => {
        async function getCategories() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategoria([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        servico: childItem.val().servico
                    };

                    if (data.servico !== "") {
                        setCategoria(oldArray => [...oldArray, data]);
                    } 
                })
                
                setLoading(false)
            })
        }

        getCategories();
    }, []);

    console.log(categoria)

    return (
        <ScrollView style={styles.background}>
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
                                data={categoria}
                                renderItem={({item}) => (
                                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SubcategoriasServicos', {catId: item.key})}>
                                        <Text style={styles.txtBtn}>{item.servico}</Text>
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
        flex: 1
    },
    area: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btn: {
        width: '100%',
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#fff',
        paddingHorizontal: 10
    },
    txtBtn:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})