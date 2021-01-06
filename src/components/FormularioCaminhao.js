import React, { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, TextInput, Image, StyleSheet, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default () => {

    const [condicao, setCondicao] = useState('');
    const [condicoes, setCondicoes] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ALUGUEL'}, 
        {key: 2, nome: 'VENDA'}
    ]);
    const [fabricante, setFabricante] = useState('');
    const [ano, setAno] = useState('');
    const [modelo, setModelo] = useState('');
    const [tipo, setTipo] = useState("");

    const [tipos, setTipos] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'TOCO'}, 
        {key: 2, nome: 'TRUCK'}, 
        {key: 3, nome: 'TRUCK - TRUCADO'}, 
        {key: 4, nome: 'TRAÇADO'}, 
        {key: 5, nome: 'TRAÇADO - TRUCADO'} ]);
    const [tracao, setTracao] = useState('');
    const [tracaovalores, setTracaoValores] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: '4x2'}, 
        {key: 2, nome: '4x4'}, 
        {key: 3, nome: '6x2'}, 
        {key: 4, nome: '6x4'}, 
        {key: 5, nome: '6x6'},
        {key: 6, nome: '8x2'},
        {key: 7, nome: '8x4'},
        {key: 8, nome: '8x6'},
        {key: 9, nome: '8x8'}
    ]);
    const [consumo, setConsumo] = useState('');
    const [hodometro, setHodometro] = useState('');
    const [horimetro, setHorimetro] = useState('');
    const [seguro, setSeguro] = useState('');
    const [segurooption, setSeguroOption] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'SIM'}, 
        {key: 2, nome: 'NÃO'}
    ]);

    let condicaoItem = condicoes.map( (v, k) => {
        return <Picker.Item key={k} value={k} label={v.nome}/>
    })

    let tiposItem = tipos.map( (v, k) => {
        return <Picker.Item key={k} value={k} label={v.nome}/>
    })

    let tracaoValoresItem = tracaovalores.map( (v, k) => {
        return <Picker.Item key={k} value={k} label={v.nome}/>
    })

    let seguroItem = segurooption.map( (v, k) => {
        return <Picker.Item key={k} value={k} label={v.nome}/>
    })

    function SelectPadraoCondicao(v,i) {
        if (v !== 0) {
           setCondicao(v);
        }  
    }
    
    function SelectPadraoTipo(v,i) {
        if (v !== 0) {
           setTipo(v);
        }  
    }

    function SelectPadraoTracao(v,i) {
        if (v !== 0) {
           setTracao(v);
        }  
    }

    function SelectPadraoSeguro(v,i) {
        if (v !== 0) {
           setSeguro(v);
        }  
    }
        return (

            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

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
                    />
                </View>

                <Text style={styles.tituloInput}>TIPO</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={tipo}
                    onValueChange={(itemValue, itemIndex) => SelectPadraoTipo(itemValue,itemIndex)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {tiposItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>TRAÇÃO</Text>
                <View style={styles.picker}>
                    <Picker
                    selectedValue={tracao}
                    onValueChange={(itemValue, itemIndex) => SelectPadraoTracao(itemValue,itemIndex)}
                    style= {{color: '#fff'}}
                    dropdownIconColor={'white'}
                    >
                        {tracaoValoresItem}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>CONSUMO MÉDIO (KM/L)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="(Quilometros/Litro)"
                        placeholderTextColor='#fff'
                        value={consumo}
                        onChangeText={(text) => setConsumo(text)}
                        keyboardType={'numeric'}
                    />
                </View>

                <Text style={styles.tituloInput}>HODÔMETRO (KM)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="(Quilometros)"
                        placeholderTextColor='#fff'
                        value={hodometro}
                        onChangeText={(text) => setHodometro(text)}
                        keyboardType={'numeric'}
                    />
                </View>

                <Text style={styles.tituloInput}>HORÍMETRO (HOR)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="(Horímetro)"
                        placeholderTextColor='#fff'
                        value={horimetro}
                        onChangeText={(text) => setHorimetro(text)}
                        keyboardType={'numeric'}
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

            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
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
    }
})