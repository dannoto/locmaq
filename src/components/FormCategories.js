import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function FormCategories({data}){
    return(
        <View>
          <Text style={styles.txtBtn}>{data.nome}</Text>
        </View>  
    );
}

const styles = StyleSheet.create ({
    
    txtBtn:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
})