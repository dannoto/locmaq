import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
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
                        servico: childItem.val().servico
                    };
                    
                    if(data.nome !== "Outros") {
                        setSubCategorias(oldArray => [...oldArray, data]);
                    }
                
                    PegaSubcategorias(data);
                })
                setLoading(false) 
            })
        }
        getSubcategories();
       
    }, []);

    async function PegaSubcategorias(data) {
        if (data.servico == catId) {           
            let catfiltradas = {
                key: data.key,
                nome: data.nome,
                servico: data.servico
            };

            if(catfiltradas.nome !== "Outros") {
                setSubCategoriasFiltradas(oldArray => [...oldArray, catfiltradas]);
            }
        } else {    
        }
    }

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <Text style={styles.titulo}>SELECIONE O SERVIÇO</Text>

                    {loading ?
                        (
                            <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#fff"}/>
                        ) :
                        (
                            <View style={{flex: 1}}>
                                <FlatList
                                    data={subcategoriasfiltradas.sort((a,b) => a.nome.localeCompare(b.nome))}
                                    renderItem={({item}) => (
                                    
                                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FormularioServicos', {subnome:item.nome, subkey:item.key, catkey:item.servico})}>
                                            <Text style={styles.txtBtn}>{item.nome}</Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item => item.key}
                                />

                                <View>
                                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('FormularioServicos', {subnome:"Outros", subkey:"-MS2t-tJwb5KYXIRETQK", catkey:"-MS2rbqavp5zN_3QZsSK"})}>
                                        <Text style={styles.txtBtn}>OUTROS</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
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
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 30,
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