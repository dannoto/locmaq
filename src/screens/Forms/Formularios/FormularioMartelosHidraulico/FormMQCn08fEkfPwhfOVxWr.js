import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

//Formulário Martelos Hidraúlico
export default function FormMartelosHidraúlico({ navigation, route }) {

    const {subnome, subkey, catkey} = route.params;
    navigation.setOptions({headerTitle: subnome.toUpperCase()});
    const navegacao = useNavigation();
    const categoria = {key:catkey, nome:'Martelos Hidraúlico'};
    const subcategoria = {key:subkey, nome:subnome};
    const errors = {};

    const [condicao, setCondicao] = useState('');
    const [condicoes, setCondicoes] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ALUGUEL'}, 
        {key: 2, nome: 'VENDA'}
    ]);
    const [fabricante, setFabricante] = useState('');
    const [ano, setAno] = useState('');
    const [modelo, setModelo] = useState('');
    const [peso, setPeso] = useState('');
    const [seguro, setSeguro] = useState('');
    const [segurooption, setSeguroOption] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'SIM'}, 
        {key: 2, nome: 'NÃO'}
    ]);
    const [infoAdicionais, setInfoAdicionais] = useState('');

    let condicaoItem = condicoes.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let seguroItem = segurooption.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })
    
    function SelectPadraoCondicao(v,i) {
        if (v.key !== 0) {
           setCondicao(v);
        }  
    }

    function SelectPadraoSeguro(v,i) {
        if (v.key !== 0) {
           setSeguro(v);
        }  
    }

    //Filtro Informações Adicionais
    function infoPrevent(text){
        if (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
            return false
        } 
        else {
            return true
        }     
    }

    function handleValidacao(){
        if (condicao.length < 1) {       
            errors.condicao = Alert.alert('Opps!', 'Informe a Condição.')
        }  
        else if (fabricante.length < 1  ) {
            errors.fabricante = Alert.alert('Oops!', 'Informe o Fabricante.')
        }  
        else if (modelo.length < 1  ) {
            errors.modelo = Alert.alert('Oops!', 'Informe o Modelo.')
        } 
        else if (ano.length < 4) {
            errors.ano = Alert.alert('Oops!', 'Informe um Ano válido.')    
        } 
        else if (peso.length < 1) {                   
            errors.peso = Alert.alert('Opps!', 'Informe o Peso Operacional.')
        }    
        else if (seguro.length < 1) {           
            errors.seguro = Alert.alert('Opps!', 'Informe se possui Seguro.')
        }  
        else if (infoPrevent(infoAdicionais) == false) {           
            errors.infoAdicionais = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        }  
        else {
            navegacao.navigate('SegundoFormMartelo', 
            { 
            condicao: condicao,
            fabricante: fabricante, 
            ano: ano, 
            modelo: modelo, 
            peso: peso, 
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            categoria: categoria,
            subcategoria: subcategoria
            })
        }
    }

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>PREENCHA OS CAMPOS ABAIXO</Text>

                <Text style={styles.tituloInput}>CONDIÇÃO</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={condicao}
                    onValueChange={(itemValue, itemIndex) => SelectPadraoCondicao(itemValue,itemIndex)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {condicaoItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>FABRICANTE</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={fabricante}
                        onChangeText={(text) => setFabricante(text)}
                        keyboardType={'default'}
                        maxLength={30}
                    />
                </View>

                <Text style={styles.tituloInput}>MODELO</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={modelo}
                        onChangeText={(text) => setModelo(text)}
                        keyboardType={'default'}
                        maxLength={30}
                    />
                </View>

                <Text style={styles.tituloInput}>ANO</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={ano}
                        onChangeText={(text) => setAno(text)}
                        keyboardType={'numeric'}
                        maxLength={4}
                    />
                </View>

                <Text style={styles.tituloInput}>PESO OPERACIONAL (TON)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="(Toneladas)"
                        placeholderTextColor='#fff'
                        value={peso}
                        onChangeText={(text) => setPeso(text)}
                        keyboardType={'numeric'}
                        maxLength={20}
                    />
                </View>

                <Text style={styles.tituloInput}>POSSUI SEGURO?</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={seguro}
                    onValueChange={(itemValue, itemIndex) => SelectPadraoSeguro(itemValue,itemIndex)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {seguroItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>INFORMAÇÕES ADICIONAIS</Text>
                <View style={styles.txtArea}>
                    <TextInput
                        style={styles.input}
                        multiline = {true}
                        numberOfLines = {1}
                        placeholder=""
                        value={infoAdicionais}
                        onChangeText={(text) => setInfoAdicionais(text)}
                        keyboardType={'default'}
                        maxLength={200}
                    />
                </View>
                <Text style={styles.atencao}>Atenção: Informações de contato só poderão ser passadas durante a negociação.</Text>

                <TouchableOpacity style={styles.btnProximo} onPress={handleValidacao}>
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
        marginBottom: 20
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
    txtArea: {
        width: '100%',
        height: 140,
        backgroundColor: 'transparent',
        marginTop: 10,
        paddingHorizontal: 5,
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
    tituloInfo: {
        fontSize: 20,
        color: '#fff',
        marginTop: 60,
        fontWeight: 'bold'
    },
    atencao: {
        fontSize: 18,
        color: '#222',
        marginTop: 5,
        textAlign: 'justify'
    }
})