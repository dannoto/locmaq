import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import firebase from '../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Anuncios({data}){

    const navigation = useNavigation();
    const modelo = data.modelo + ' / ' + data.ano;
    const { user } = useContext(AuthContext); 

    function filterNome(nome) {
        if(nome.length < 20) {
        return nome;
      }
      return `${nome.substring(0, 20)}...`;
    }

    function filterModelo(modelo) {
        if(modelo.length < 22) {
        return modelo;
      }
      return `${modelo.substring(0, 22)}...`;
    }

    function filterPreco(preco) {
        if(preco.length < 22) {
        return preco;
      }
      return `${preco.substring(0, 22)}...`;
    }

  async function Desfavoritar() {
    await firebase.database().ref('users').child(user.uid).child('favoritos').child(data.key).remove();
  }

  return(
    <View style={styles.areaAnuncios}>

      <View style={styles.containerImg}>
        <View style={styles.areaImg}>
          <Image style={styles.img} source={{uri: data.imagem0}}/>
        </View>
      </View>

      {data.condicao == "VENDAS" ?
        (
          <View style={styles.areaInfo}>
            <View style={{width: '100%', flexDirection: 'row'}}>
                <View style={{width: '85%'}}>
                  {data.subcategoria == "Outros" ?
                    (
                      <Text style={styles.subcategoria}>{filterNome(data.titulo)}</Text>
                    ) :
                    (
                      <Text style={styles.subcategoria}>{filterNome(data.subcategoria)}</Text>
                    )
                  }
                </View>

                <View style={{width: '15%', flexDirection: 'row-reverse'}}>
                  <TouchableOpacity onPress={Desfavoritar}>
                      <Ionicons
                      name={'heart-sharp'}
                      size= {38}
                      color="#ed4956"
                      />
                  </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.condicao}>{data.condicao}</Text>
          </View>
        ) :
        (
          <View style={styles.areaInfo}>
            <View style={{width: '100%', flexDirection: 'row'}}>
                <View style={{width: '85%'}}>
                    <Text style={styles.subcategoria}>{filterNome(data.subcategoria)}</Text>
                    <Text style={styles.modelo}>{filterModelo(modelo)}</Text>
                </View>

                <View style={{width: '15%', flexDirection: 'row-reverse'}}>
                  <TouchableOpacity onPress={Desfavoritar}>
                      <Ionicons
                      name={'heart-sharp'}
                      size= {38}
                      color="#ed4956"
                      />
                  </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.condicao}>{data.condicao}</Text>

            {data.condicao == 'ALUGUEL' ?
              (
                  <Text style={styles.preco}>{filterPreco(data.precoHora + ' / Hora')}</Text>
              ) :
              (
                  <Text style={styles.preco}>{filterPreco(data.preco)}</Text>
              )
            }

          </View>
        )
      }
      
    </View>
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
  containerImg: {
    width: '30%'
  },
  areaInfo: {
    width: '70%'
  },
  subcategoria: {
    color: '#222',
    fontSize: 16,
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
  condicao: {
    color: '#ffa500',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  preco: {
    color: '#222',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  areaImg: {
    width: '95%',
    height: 100,
    borderWidth: 3,
    borderColor: '#ffa500'
  },
  img: {
    width: '100%',
    height: 94,
    resizeMode: 'cover'
  }
})