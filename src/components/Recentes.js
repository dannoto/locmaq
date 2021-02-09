import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function Recentes({data}){

    const navigation = useNavigation();
    const fabricante = data.fabricante;
    const modelo = data.modelo;
    const titulo =  fabricante +' - '+ modelo;

    function filterTitulo(titulo) {
        if(titulo.length < 15) {
          return titulo;
        }
        return `${titulo.substring(0, 15)}...`;
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('DetalhesEquipamentos',{key:data.key}) } style={styles.areabtn}> 

                <View style={styles.areaImg}>
                    <ImageBackground style={styles.img} source={{uri: data.imagem0}}>
                        <View style={styles.condicao}>
                            <Text style={styles.txtCondicao}>{data.condicao}</Text>
                        </View>
                    </ImageBackground>
                </View>
            
                <Text style={styles.txtProd}>{filterTitulo(titulo)}</Text>
                
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        marginHorizontal: 10
    },
    condicao: {
        flexDirection: 'row-reverse'
    },
    txtCondicao: {
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#ffa500',
        padding: 4, 
        marginTop: 5,
       marginRight: 5
    },
    areaImg: {
        width: 176,
        height: 146,
        borderWidth: 3,
        borderColor: '#ffa500'
    },
    img: {
        width: 170,
        height: 140,
        resizeMode: 'cover'
    },
    txtProd: {
        fontSize: 16,
        textAlign: 'center',
        color: '#222',
        marginTop: 10,
        height: 40,
        textTransform: 'uppercase'
    }
})