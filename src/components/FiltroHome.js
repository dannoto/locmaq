import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FiltroHome({data}){

    const navigation = useNavigation();
    const modeloAno = data.modelo + ' / ' + data.ano

    function filterNome(nome) {
        if(nome.length < 15) {
          return nome;
        }
        return `${nome.substring(0, 15)}...`;
    }

    function filterModelo(modelo) {
        if(modelo.length < 18) {
          return modelo;
        }
        return `${modelo.substring(0, 18)}...`;
    }

    function filterFabricante(fabricante) {
        if(fabricante.length < 16) {
          return fabricante;
        }
        return `${fabricante.substring(0, 16)}...`;
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
                <ImageBackground style={styles.img} source={{uri: data.imagem}}>
                    <View style={styles.condicao}>
                        <Text style={styles.txtCondicao}>{data.condicao}</Text>
                    </View>
                </ImageBackground>
            </View>
    
            <View>
                <Text style={styles.sub}>{filterNome(data.subcategoria)}</Text>
                <Text style={styles.fabricante}>{filterFabricante(data.fabricante)}</Text>
                <Text style={styles.modelo}>{filterModelo(modeloAno)}</Text>

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
        width: 110
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
    sub: {
        color: '#222',
        fontSize: 17,
        marginLeft: 5,
        textTransform: 'uppercase'
    },
    fabricante: {
        color: '#222',
        fontSize: 16,
        marginLeft: 5,
        marginTop: 5,
        textTransform: 'uppercase'
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
        height: 152,
        borderWidth: 2,
        borderColor: '#ffa500',
        borderRadius: 10,
        marginRight: 10
    },
    img: {
        width: 180,
        height: 148,
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