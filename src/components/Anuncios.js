import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function Anuncios({data}){
    return(
      <View style={styles.areaAnuncios}>
        <Image style={styles.img} source={{uri: data.imagem}}/>
        <Text style={styles.Titulo}>NOME PRODUTO</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.txtBtn}>EDITAR</Text>
        </TouchableOpacity>
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
  btn: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffa500',
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 106,
    marginLeft: 215,
    borderRadius: 5,
    position: 'absolute',
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  Titulo: {
    color: '#222',
    fontSize: 18,
    marginLeft: 5,
    textTransform: 'uppercase'
  },
  img: {
    width: 180,
    height: 120,
    borderWidth: 2,
    borderColor: '#ffa500',
    borderRadius: 20,
    marginRight: 10
  }
})