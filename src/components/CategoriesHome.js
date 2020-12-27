import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CategoriesHome({data}){
    return(

        <TouchableOpacity onPress={() => {}} style={styles.container}>    
            <Image style={styles.img} source={{uri: data.imagem}}/>
            <Text style={styles.btnTitulo}>{data.name}</Text>
        </TouchableOpacity>
        
    );
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 120
    
  },
  btnTitulo: {
    color: '#222',
    fontSize: 13,
    marginTop: 5,
    textTransform: 'uppercase',
    textAlign: 'center',
    height: 50
  },
  img: {
    width: 90,
    height: 90,
    paddingTop: 10
  }
})