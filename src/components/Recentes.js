import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function Recentes({data}){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {}} style={styles.areabtn}> 
                <Image style={styles.img} source={{uri: data.imagem}}/>
                <Text style={styles.txtCat}>SERVIÇO</Text>
                <Text style={styles.txtProd}>NOME PRODUTO</Text>
            </TouchableOpacity>
        </View>

        
        
    );
}

const styles = StyleSheet.create ({
    container: {
        marginHorizontal: 10,
    },
    txtCat: {
        position: 'absolute',
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
        backgroundColor: '#ffa500',
        padding: 3, 
        marginTop: 8,
        marginLeft: 8
    },
    img: {
        width: 170,
        height: 140,
        borderWidth: 3,
        borderColor: '#ffa500',
        borderRadius: 10,
    },
    txtProd: {
        fontSize: 16,
        textAlign: 'center',
        color: '#222',
        marginTop: 8,
        height: 40
    }
})