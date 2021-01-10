import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../services/firebaseConnection';

export default ({route}) => {

    const navigation = useNavigation();
    const { catId } = route.params;

    const [subcategorias, setSubCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subcategoriasfiltradas, setSubCategoriasFiltradas] = useState([]); 

    // Buscando Subcategorias
    useEffect(() => {
        async function getSubcategories() {
            await firebase.database().ref('subcategorias').on('value', (snapshot) => {
                setSubCategorias([]);
                setSubCategoriasFiltradas([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        categoria: childItem.val().categoria
                    };

                    setSubCategorias(oldArray => [...oldArray, data]);
                    PegaSubcategorias(data);
                })

                setLoading(false) 
            })
        }

        getSubcategories();
       
    }, []);

    async function PegaSubcategorias(data) {

        

        if (data.categoria == catId) {           
            // catfiltradas.push({name:data.name,key:data.key});
            let catfiltradas = {
                key: data.key,
                nome: data.nome,
                categoria: data.categoria
            };

            setSubCategoriasFiltradas(oldArray => [...oldArray, catfiltradas].sort());
        } else {
           
        }
       
        console.log(catfiltradas);

    }

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <Text style={styles.titulo}>SELECIONE O EQUIPAMENTO</Text>

                    {loading ?
                        (
                            <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#fff"}/>
                        ) :
                        (
                            <FlatList
                                data={subcategoriasfiltradas.sort((a,b) => a.nome.localeCompare(b.nome))}
                                renderItem={({item}) => (
                                   
                                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Form' + item.categoria.replace("-",""),{titulo:item.nome, subnome:item.nome,subkey:item.key, catkey:item.categoria})}>
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
        marginBottom: 30,
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
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold',
    },
    txtBtn:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})