import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, Image} from 'react-native';
import firebase from '../../services/firebaseConnection';
import Swiper from 'react-native-swiper';

export default () => {

    // const {produtoKey, setProdutoKey} = route.params; 
    // const [produtoDados, setProdutoDados] = useState([]);
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingCat, setLoadingCat] = useState(true);
    const [emptyList, setEmptyList] = useState(false);
    const [list, setList] = useState([]);

    // // Buscando Equipamentos
   
    // useEffect(() => {
    //     async function getProduto() {
    //         await firebase.database().ref('equipamentos').on('value', (snapshot) => {
    //             setProdutoDados([]);

    //             snapshot.forEach((childItem) => {
    //                 let data = {
    //                     key: childItem.key,
    //                     nome: childItem.val().categoria,
    //                     imagem: childItem.val().imagem
    //                 };

    //                 setProdutoDados(oldArray => [...oldArray, data]);
    //             })

    //             setLoadingCat(false)
    //         })
    //     }

    //     getProduto();
    // }, []);


    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>       

                <Swiper
                style={styles.wrapper}
                dotStyle={{
                    backgroundColor: '#000',
                    borderColor: '#000',
                    width: 10,
                    height: 10,
                    borderRadius: 10
                }}
                activeDotColor='#fff'
                activeDotStyle={{
                    borderColor: '#000',
                    borderWidth: 1,
                    width: 10,
                    height: 10,
                    borderRadius: 10
                }}
                >
                    <View style={styles.slide}>

                    <Image style={styles.img} source={require('../../assets/caminhao.jpg')}/>
                    

                    </View>
                </Swiper>     
            
            </KeyboardAvoidingView>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create ({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    img: {
        width: '100%',
        height: 400
    }
})