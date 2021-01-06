import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../services/firebaseConnection';

import FormularioCaminhao from '../../../components/FormularioCaminhao'

//Formulário Caminhões
export default ({route}) => {
    const {titulo} = route.params;
    const navigation = useNavigation();

    const [fabricantebau, setFabricanteBau] = useState('');
    const [anobau, setAnoBau] = useState('');
    const [dimensoesbau, setDimensoesBau] = useState('');

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>PREENCHA OS CAMPOS ABAIXO</Text>

                <FormularioCaminhao/>

                {titulo == "Caminhão Baú" ?
                    (
                        <View>
                            <Text style={styles.tituloInfo}>BAÚ:</Text>

                            <Text style={styles.tituloInput}>FABRICANTE</Text>
                            <View style={styles.areaInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    value={fabricantebau}
                                    onChangeText={(text) => setFabricanteBau(text)}
                                    keyboardType={'default'}
                                />
                            </View>

                            <Text style={styles.tituloInput}>ANO</Text>
                            <View style={styles.areaInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    value={anobau}
                                    onChangeText={(text) => setAnoBau(text)}
                                    keyboardType={'numeric'}
                                />
                            </View>

                            <Text style={styles.tituloInput}>DIMENSÕES (AxLxP)</Text>
                            <View style={styles.areaInput}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Altura x Largura x Profundidade"
                                    placeholderTextColor='#fff'
                                    value={dimensoesbau}
                                    onChangeText={(text) => setDimensoesBau(text)}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </View>   
                    ) :
                    (
                        null
                    )
                }

                {titulo == "Caminhão Betoneira" ?
                    (
                        <Text>É Betoneira.</Text> 
                    ) :
                    (
                        null   
                    )
                }


                <TouchableOpacity style={styles.btnProximo} onPress={() => navigation.navigate('SegundoForm')}>
                    <Text style={styles.txtBtn}>PRÓXIMO</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
background: {
    backgroundColor: '#ffa500',
    flex: 1
},
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
},
titulo: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
    fontWeight: 'bold'
},
btnProximo: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
},
txtBtn: {
    fontSize: 22,
    color: '#222',
    fontWeight: 'bold'
},
tituloInput: {
    fontSize: 20,
    color: '#fff',
    marginTop: 20,
    fontWeight: 'bold'
},
areaInput: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderColor: '#fff'
},
input: {
    width: '100%',
    fontSize: 20,
    color: '#fff'
}, 
picker: {
    borderWidth: 2,
    borderColor: '#fff',
    marginTop: 10,
},
tituloInfo: {
    fontSize: 20,
    color: '#fff',
    marginTop: 60,
    fontWeight: 'bold'
}
})