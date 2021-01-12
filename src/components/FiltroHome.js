import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FiltroHome({data}){

    const navigation = useNavigation();

    function filterNome(nome) {
        if(nome.length < 18) {
          return nome;
        }
        return `${nome.substring(0, 15)}...`;
    }
    
    return(
        <TouchableOpacity style={styles.areaAnuncios} onPress={() => navigation.navigate('Detalhes',{key:data.key}) }>
            
            <View style={styles.areaImg}>
                <ImageBackground style={styles.img} source={{uri: data.imagem}}>
                        <View style={styles.condicao}>
                            <Text style={styles.txtCondicao}>ALUGUEL</Text>
                        </View>
                </ImageBackground>
            </View>
    
            <View>
                <Text style={styles.subcategoria}>{filterNome('SUBCATEGORIA')}</Text>
                <Text style={styles.modelo}>MODELO / ANO</Text>
                <Text style={styles.preco}>PREÇO</Text>

                <View style={styles.areaBtn}>
                    <Text style={styles.txtBtn}>SAIBA MAIS</Text>
                </View>
                   
            </View>
                
        </TouchableOpacity>
        
      );
}

const styles = StyleSheet.create ({
    areaAnuncios: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderColor: '#ddd',
        padding: 10
    },
    areaBtn: {
        width: 110
    },
    txtBtn: {
        backgroundColor: '#ffa500',
        borderRadius: 5,
        padding: 6,
        marginTop: 30,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subcategoria: {
        color: '#222',
        fontSize: 17,
        marginLeft: 5,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    modelo: {
        color: '#222',
        fontSize: 16,
        marginLeft: 5,
        marginTop: 5,
        textTransform: 'uppercase'
    },
    preco: {
        color: '#ffa500',
        fontSize: 16,
        marginLeft: 5,
        marginTop: 5,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    areaImg: {
        width: 184,
        height: 144,
        borderWidth: 2,
        borderColor: '#ffa500',
        borderRadius: 10,
        marginRight: 10
    },
    img: {
        width: 180,
        height: 140,
        resizeMode: 'cover'
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
  })