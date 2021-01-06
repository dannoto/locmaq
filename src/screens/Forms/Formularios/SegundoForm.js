import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import { ImageBrowser } from 'expo-image-picker-multiple';
import firebase from '../../../services/firebaseConnection';

// Segunda parte do Formulário
export default () => {
    const navigation = useNavigation();

    const [estado, setEstado] = useState('');
    const [estados, setEstados] = useState([  
        {key: 0, nome: 'SELECIONAR'},
        {key:'AC', nome: 'Acre'},
        {key:'AL', nome: 'Alagoas'},
        {key:'AP', nome: 'Amapá'},
        {key:'AM', nome: 'Amazonas'},
        {key:'BA', nome: 'Bahia'},
        {key:'CE', nome: 'Ceará'},
        {key:'DF', nome: 'Distrito Federal'},
        {key:'ES', nome: 'Espírito Santo'},
        {key:'GO', nome: 'Goiás'},
        {key:'MA', nome: 'Maranhão'},
        {key:'MT', nome: 'Mato Grosso'},
        {key:'MS', nome: 'Mato Grosso do Sul'},
        {key:'MG', nome: 'Minas Gerais '},
        {key:'PA', nome: 'Pará '},
        {key:'PB', nome: 'Paraíba '},
        {key:'PR', nome: 'Paraná '},
        {key:'PE', nome: 'Pernambuco '},
        {key:'PI', nome: 'Piauí '},
        {key:'RJ', nome: 'Rio de Janeiro '},
        {key:'RN', nome: 'Rio Grande do Norte '},
        {key:'RS', nome: 'Rio Grande do Sul '},
        {key:'RO', nome: 'Rondônia '},
        {key:'RR', nome: 'Roraima '},
        {key:'SC', nome: 'Santa Catarina '},
        {key:'SP', nome: 'São Paulo '},
        {key:'SE', nome: 'Sergipe '},
        {key:'TO', nome: 'Tocantins '}
    ]);
    const [cidade, setCidade] = useState('');
    const [cidadesdata, setCidadesData] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [preco, setPreco] = useState('');
    const [photos, setPhotos] = useState([]);
                     
    fetch('https://gist.githubusercontent.com/letanure/3012978/raw/2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json')
    .then((r)=>r.json())
    .then((json)=>{

        setCidadesData(json.estados);

    });

    function pegaCidades(v,k) {
        var todasCidades = [{key: 0, nome: "SELECIONAR"},];
     
        if (v.key !== 0) {
         
            for (var i = 0 ; i < cidadesdata.length; i++)    {

                if (cidadesdata[i].sigla == v.key) {
                    var listadecidades = cidadesdata[i].cidades;

                    for (var b = 0; b < listadecidades.length; b++) {
                        todasCidades.push({key:listadecidades[b],nome:listadecidades[b]})
                    }
                    setCidades(todasCidades);
                }
            }  

            setEstado(v);
        }  
    }

    let estadoItem = estados.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let cidadeItem = cidades.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    function SelectPadraoCidades(v,i) {
        if (v !== 0) {
           setCidade(v);
        }  
    }

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>PREENCHA OS CAMPOS ABAIXO</Text>

                <Text style={styles.tituloInput}>ESTADO</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={estado}
                    onValueChange={(itemValue, itemIndex) => pegaCidades(itemValue)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {estadoItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>CIDADE</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={cidade}
                    onValueChange={(itemValue, itemIndex) => SelectPadraoCidades(itemValue)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {cidadeItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>PREÇO</Text>
                <View style={styles.areaInput}>
                    <TextInputMask
                        style={styles.input}
                        placeholder="R$"
                        placeholderTextColor='#fff'
                        value={preco}
                        onChangeText={(text) => setPreco(text)}
                        keyboardType={'numeric'}
                        type={'money'}
                        options = { {
                            precision :  2 ,
                            separator :  ' , ' ,
                            delimiter :  ' . ' ,
                            unidade :  ' R $ ' ,
                            sufixoUnidade :  ' ' 
                         } } 
                    />
                </View> 

                <Text style={styles.tituloInput}>ADICIONAR IMAGENS</Text>
                <TouchableOpacity style={styles.areaBtnPhoto}>
                    <Text style={styles.txtBtnPhoto}>CARREGAR FOTOS</Text>
                </TouchableOpacity>

                {/* < ImageBrowser 
                    max = { 5 } 
                    onChange = { ( callback )  =>  {

                        console.log(callback)
                        
                    } } 
                    callback = { ( num ,  onSubmit )  =>  {
                        console.log(num)
                        console.log(onSubmit)

                    } } 
                /> */}
                            
                <TouchableOpacity style={styles.btnAnunciar}>
                    <Text style={styles.txtBtn}>ANUNCIAR</Text>
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
btnAnunciar: {
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
    marginTop: 10
},
areaBtnPhoto: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
},
txtBtnPhoto: {
    fontSize: 22,
    color: '#ffa500',
    fontWeight: 'bold'
}
})