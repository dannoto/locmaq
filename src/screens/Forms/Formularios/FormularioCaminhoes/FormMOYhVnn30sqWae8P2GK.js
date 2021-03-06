import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, Platform, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

//Formulário Caminhões
export default function FormCaminhoes({ navigation, route }) {

    const {titulo, subnome, subkey, catkey} = route.params;
    navigation.setOptions({headerTitle: subnome.toUpperCase()});
    const navegacao = useNavigation();
    const categoria = {key:catkey, nome:'Caminhões'};
    const subcategoria = {key:subkey, nome:subnome};
    const errors = {};

    const [condicao, setCondicao] = useState('');
    const [condicoes, setCondicoes] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ALUGUEL'}, 
        {key: 2, nome: 'VENDA'}
    ]);
    const [fabricante, setFabricante] = useState('cfhcxhxj,');
    const [modelo, setModelo] = useState('ccgiuho');
    const [ano, setAno] = useState('5599');
    const [tipo, setTipo] = useState([{key: 2, nome: 'TRUCK'}]);
    const [tipos, setTipos] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'TOCO'}, 
        {key: 2, nome: 'TRUCK'}, 
        {key: 3, nome: 'TRUCK - TRUCADO'}, 
        {key: 4, nome: 'TRAÇADO'}, 
        {key: 5, nome: 'TRAÇADO - TRUCADO'} 
    ]);
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
    const [consumo, setConsumo] = useState('56462');
    const [hodometro, setHodometro] = useState('5161');
    const [horimetro, setHorimetro] = useState('5465');
    const [capacidade, setCapacidade] = useState('68000');
    const [potencia, setPotencia] = useState('6888');
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

    let tiposItem = tipos.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let tracaoValoresItem = tracaovalores.map( (v, k) => {
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
    
    function SelectPadraoTipo(v,i) {
        if (v.key !== 0) {
           setTipo(v);
        }  
    }

    function SelectPadraoTracao(v,i) {
        if (v.key !== 0) {
           setTracao(v);
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
        else if (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.+)/gi)) {
            return false
        }
        else if (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+)/gi)) {
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
        else if (ano.length < 4 ) {  
            errors.ano = Alert.alert('Oops!', 'Informe um Ano válido.')
        } 
        else if (tipo.length < 1) {     
            errors.tipo = Alert.alert('Opps!', 'Informe o Tipo.')
        }  
        else if (tracao.length < 1) {           
            errors.tracao = Alert.alert('Opps!', 'Informe a Tração.')
        } 
        else if (consumo.length < 1) {                   
            errors.consumo = Alert.alert('Opps!', 'Informe o Consumo Médio.')
        }  
        else if (hodometro.length < 1) {                 
            errors.hodometro = Alert.alert('Opps!', 'Informe o Hodômetro.')
        }   
        else if (capacidade.length < 1  ) {
            errors.capacidade = Alert.alert('Oops!', 'Informe a Capacidade.')
        } 
        else if (potencia.length < 1) {     
            errors.potencia = Alert.alert('Opps!', 'Informe a Potência.')
        } 
        else if (seguro.length < 1) {           
            errors.seguro = Alert.alert('Opps!', 'Informe se possui Seguro.')
        } 
        else if (infoPrevent(infoAdicionais) == false) {           
            errors.infoAdicionais = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        }  
        else {
            navegacao.navigate('SegundoFormCaminhao', {
                condicao: condicao,
                fabricante: fabricante,  
                modelo: modelo, 
                ano: ano,
                tipo: tipo, 
                tracao: tracao, 
                consumo: consumo, 
                hodometro: hodometro,
                horimetro: horimetro,
                capacidade: capacidade,
                potencia: potencia,
                seguro: seguro, 
                infoAdicionais: infoAdicionais,
                categoria: categoria,
                subcategoria: subcategoria
            })
        }
    }

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
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
                        maxLength={20}
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
                        maxLength={20}
                    />
                </View>

                <Text style={styles.tituloInput}>ANO</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={ano}
                        onChangeText={(text) => setAno(text)}
                        keyboardType={'number-pad'}
                        maxLength={4}
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
                        maxLength={20}
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
                        maxLength={20}
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
                        maxLength={20}
                    />
                </View>

                <Text style={styles.tituloInput}>CAPACIDADE (TON)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Toneladas"
                        placeholderTextColor='#fff'
                        value={capacidade}
                        onChangeText={(text) => setCapacidade(text)}
                        keyboardType={'numeric'}
                        maxLength={20}
                    />
                </View>

                <Text style={styles.tituloInput}>POTÊNCIA (CV)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Potência"
                        placeholderTextColor='#fff'
                        value={potencia}
                        onChangeText={(text) => setPotencia(text)}
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
                        numberOfLines = {7}
                        textAlignVertical = 'top'
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
        fontSize: 18,
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
        fontSize: 18,
        color: '#222',
        fontWeight: 'bold'
    },
    tituloInput: {
        fontSize: 18,
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
        fontSize: 18,
        color: '#fff'
    }, 
    picker: {
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 10
    },
    tituloInfo: {
        fontSize: 18,
        color: '#fff',
        marginTop: 60,
        fontWeight: 'bold'
    },
    atencao: {
        fontSize: 14,
        color: '#222',
        marginTop: 5,
        textAlign: 'justify'
    }
})