import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FiltroHome({data}){

    console.log(data.imagem0)

    const navigation = useNavigation();
    const modelo = data.modelo;
    const ano = data.ano;
    const modeloAno = modelo + ' / ' + ano

    function filterTitulo(titulo) {
        if(titulo.length < 17) {
          return titulo;
        }
        return `${titulo.substring(0, 17)}...`;
    }
    
    return(
        <TouchableOpacity style={styles.areaAnuncios} onPress={() => navigation.navigate('DetalhesServicos', {key:data.key})}>
            
            <View style={styles.areaImg}>
                <ImageBackground style={styles.img} source={{uri: data.imagem0}}>
                    <View style={styles.condicao}>
                        <Text style={styles.txtCondicao}>{data.condicao}</Text>
                    </View>
                </ImageBackground>
            </View>

            <View>
                {data.subcategoria == "Outros" ? 
                    (
                        <Text style={styles.titulo}>{filterTitulo(data.titulo)}</Text>
                    ) :
                    (
                        <Text style={styles.titulo}>{filterTitulo(data.subcategoria)}</Text>
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
        marginTop: 85
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
    titulo: {
        color: '#222',
        fontSize: 16,
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
    }
  })