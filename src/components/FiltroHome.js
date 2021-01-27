import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FiltroHome({data}){

    const navigation = useNavigation();
    const modelo = data.modelo;
    const ano = data.ano;
    const modeloAno = modelo + ' / ' + ano

    function filterModelo(modelo) {
        if(modelo.length < 18) {
          return modelo;
        }
        return `${modelo.substring(0, 18)}...`;
    }

    function filterFabricante(fabricante) {
        if(fabricante.length < 15) {
          return fabricante;
        }
        return `${fabricante.substring(0, 15)}...`;
    }

    function filterPreco(preco) {
        if(preco.length < 20) {
          return preco;
        }
        return `${preco.substring(0, 20)}...`;
    }
    
    return(
        <TouchableOpacity style={styles.areaAnuncios} onPress={() => navigation.navigate('Detalhes',{key:data.key})}>
            
            <View style={styles.areaImg}>
                <ImageBackground style={styles.img} source={{uri: data.imagem0}}>
                    <View style={styles.condicao}>
                        <Text style={styles.txtCondicao}>{data.condicao}</Text>
                    </View>
                </ImageBackground>
            </View>
    
            <View>
                <Text style={styles.fabricante}>{filterFabricante(data.fabricante)}</Text>
                <Text style={styles.modelo}>{filterModelo(modeloAno)} </Text>

                {data.condicao == 'ALUGUEL' ?
                    (
                        <Text style={styles.preco}>{filterPreco('Diária ' + data.precoDiaria)}</Text>
                    ) :
                    (
                        <Text style={styles.preco}>{filterPreco(data.preco)}</Text>
                    )
                }
               
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
        width: 110,
        marginTop: 30
    },
    txtBtn: {
        backgroundColor: '#ffa500',
        borderRadius: 5,
        padding: 6,
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    fabricante: {
        color: '#222',
        fontSize: 17,
        marginLeft: 5,
        marginTop: 5,
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
        width: 186,
        height: 156,
        borderWidth: 3,
        borderColor: '#ffa500',
        marginRight: 10
    },
    img: {
        width: 180,
        height: 150,
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