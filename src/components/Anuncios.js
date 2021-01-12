import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Anuncios({data}){

  function filterNome(nome) {
    if(nome.length < 18) {
      return nome;
    }
    return `${nome.substring(0, 15)}...`;
  }

    return(
      <View style={styles.areaAnuncios}>
        <View>
          <Image style={styles.img} source={{uri: data.imagem}}/>
        </View>
        
        <View>
          <Text style={styles.subcategoria}>{filterNome(data.subcategoria)}</Text>
          <Text style={styles.modelo}>{data.modelo} / {data.ano}</Text>
          <Text style={styles.preco}>Preço</Text>
          <Text style={styles.condicao}>{data.condicao}</Text>

          <View style={styles.areaBtn}>
            <TouchableOpacity style={[styles.btn, {marginRight: 10}]}>
              <Text style={styles.txtBtn}>EDITAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.txtBtn}>APAGAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create ({
  areaAnuncios: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    padding: 20
  },
  areaBtn: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: '#ffa500',
    marginTop: 10,
    borderRadius: 5,
    padding: 6
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
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
  img: {
    width: 180,
    height: 150,
    borderWidth: 2,
    borderColor: '#ffa500',
    borderRadius: 20,
    marginRight: 10
  }
})