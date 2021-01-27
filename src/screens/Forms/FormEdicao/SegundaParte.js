import React, { useState, useEffect, createFactory } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, StyleSheet, Platform, FlatList, Modal, Alert, TextComponent, PermissionsAndroid } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../../../services/firebaseConnection';
import { min } from 'react-native-reanimated';


//Formulário Caminhões
export default function FormCaminhoes({ navigation, route }) {

    const {key, subnome} = route.params;  
    navigation.setOptions({headerTitle: subnome.toUpperCase()});
    const navegacao = useNavigation();
    const errors = {};
    const [detalhes, setDetalhes] = useState([]);
    const [tracaoFiltradas, setTracaoFiltradas] = useState([])
    
    useEffect(() => {
        filtrandoTracoes();
        async function getDetalhes() {
        
             await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                setDetalhes([]);
             
                let data = {
                    key: snapshot.key,
                    condicao: snapshot.val().condicao.nome,
                    fabricante: snapshot.val().fabricante,
                    ano: snapshot.val().ano,
                    modelo: snapshot.val().modelo,
                    tipo: snapshot.val().tipo.nome,
                    tracao: snapshot.val().tracao.nome,
                    tracaoKey: snapshot.val().tracao.key,
                    caracteristica: snapshot.val().caracteristica.nome,
                    peso: snapshot.val().peso,
                    consumo: snapshot.val().consumo, 
                    hodometro: snapshot.val().hodometro, 
                    horimetro: snapshot.val().horimetro,
                    capacidade: snapshot.val().capacidade, 
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais, 
                    estado: snapshot.val().estado.key, 
                    cidade: snapshot.val().cidade.nome,
                    preco: snapshot.val().preco, 
                    precoDiaria: snapshot.val().precoDiaria,
                    precoSemanal: snapshot.val().precoSemanal,
                    precoMensal: snapshot.val().precoMensal,
                    subcategoria: snapshot.val().subcategoria.nome, 
                    categoria: snapshot.val().categoria.nome,
                    codigoProduto: snapshot.val().codigoProduto,
                    imagem0:snapshot.val().imagem0,
                    imagem1:snapshot.val().imagem1,
                    imagem2:snapshot.val().imagem2,
                    imagem3:snapshot.val().imagem3,
                    imagem4:snapshot.val().imagem4,
                    imagem5:snapshot.val().imagem5,
                };
                setDetalhes(data);
            })
        }
        getDetalhes()

        fetch('https://gist.githubusercontent.com/letanure/3012978/raw/2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json')
        .then((r)=>r.json())
        .then((json)=>{
            setCidadesData(json.estados);
        });
    }, [detalhes]);

    const [condicao, setCondicao] = useState('');
    const [condicoes, setCondicoes] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ALUGUEL'}, 
        {key: 2, nome: 'VENDA'}
    ]);
    const [fabricante, setFabricante] = useState(detalhes.fabricante);
    const [modelo, setModelo] = useState('ccgiuho');
    const [ano, setAno] = useState('5599');
    const [tipo, setTipo] = useState([{key: 2, nome: 'TRUCK'}]);
    const [tipos, setTipos] = useState([
        // {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'TOCO'}, 
        {key: 2, nome: 'TRUCK'}, 
        {key: 3, nome: 'TRUCK - TRUCADO'}, 
        {key: 4, nome: 'TRAÇADO'}, 
        {key: 5, nome: 'TRAÇADO - TRUCADO'} 
    ]);

 
    const [tracao, setTracao] = useState('');

    function filtrandoTracoes () {


            var  tracaoArray =    [ 
        {key: 1, nome: '4x2'}, 
        {key: 2, nome: '4x4'}, 
        {key: 3, nome: '6x2'}, 
        {key: 4, nome: '6x4'}, 
        {key: 5, nome: '6x6'}, 
        {key: 6, nome: '8x2'},
        {key: 7, nome: '8x4'},
        {key: 8, nome: '8x6'},
        {key: 9, nome: '8x8'}
    ];

  
    var valores = []
      valores.push( <Picker.Item key={detalhes.tracaoKey} value={detalhes.tracao} label={detalhes.tracao}/>)
   
         for (let i = 0 ; i < tracaoArray.length; i++) {
           
            
                if (tracaoArray[i].nome == detalhes.tracao) {

                } else {
                        valores.push( <Picker.Item key={tracaoArray[i].key} value={tracaoArray[i].nome} label={tracaoArray[i].nome}/>)
                }
           
        }

            setTracaoFiltradas(valores)
  
        
    }
   
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
    const [caracteristica, setCaracteristica] = useState('');
    const [peso, setPeso] = useState('');
    const [consumo, setConsumo] = useState('');
    const [hodometro, setHodometro] = useState('');
    const [horimetro, setHorimetro] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [potencia, setPotencia] = useState('');
    const [seguro, setSeguro] = useState('');
    const [segurooption, setSeguroOption] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'SIM'}, 
        {key: 2, nome: 'NÃO'}
    ]);
    const [infoAdicionais, setInfoAdicionais] = useState('');
    const [estado, setEstado] = useState('');
    const [estados, setEstados] = useState([  
        {key: 0, nome: 'SELECIONAR'},
        {key: 'AC', nome: 'Acre'},
        {key: 'AL', nome: 'Alagoas'},
        {key: 'AP', nome: 'Amapá'},
        {key: 'AM', nome: 'Amazonas'},
        {key: 'BA', nome: 'Bahia'},
        {key: 'CE', nome: 'Ceará'},
        {key: 'DF', nome: 'Distrito Federal'},
        {key: 'ES', nome: 'Espírito Santo'},
        {key: 'GO', nome: 'Goiás'},
        {key: 'MA', nome: 'Maranhão'},
        {key: 'MT', nome: 'Mato Grosso'},
        {key: 'MS', nome: 'Mato Grosso do Sul'},
        {key: 'MG', nome: 'Minas Gerais '},
        {key: 'PA', nome: 'Pará '},
        {key: 'PB', nome: 'Paraíba '},
        {key: 'PR', nome: 'Paraná '},
        {key: 'PE', nome: 'Pernambuco '},
        {key: 'PI', nome: 'Piauí '},
        {key: 'RJ', nome: 'Rio de Janeiro '},
        {key: 'RN', nome: 'Rio Grande do Norte '},
        {key: 'RS', nome: 'Rio Grande do Sul '},
        {key: 'RO', nome: 'Rondônia '},
        {key: 'RR', nome: 'Roraima '},
        {key: 'SC', nome: 'Santa Catarina '},
        {key: 'SP', nome: 'São Paulo '},
        {key: 'SE', nome: 'Sergipe '},
        {key: 'TO', nome: 'Tocantins '}
    ]);
    const [cidade, setCidade] = useState('');
    const [cidadesdata, setCidadesData] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [preco, setPreco] = useState('');
    const [precoDiaria, setPrecoDiaria] = useState('');
    const [precoSemanal, setPrecoSemanal] = useState('');
    const [precoMensal, setPrecoMensal] = useState('');
    const [imagens, setImagens] = useState([]);
    const [modalvisible, setModalVisible] = useState(false);
    const [countimagens, setCountImagens] = useState([]);
    const [codigoProduto, setCodigoProduto] = useState('');

    let condicaoItem = condicoes.map( (v, k) => {

        return <Picker.Item key={k} value={v} label={v.nome}/>

    })

    let tiposItem = tipos.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let tracaoValoresItem = tracaoFiltradas.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })


    let seguroItem = segurooption.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    
    let estadoItem = estados.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let cidadeItem = cidades.map( (v, k) => {
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
        var seguroCadastrado = [{key: 0, nome: detalhes.seguro}]
        setSeguroOption(seguroCadastrado)

        if (v.key !== 0) {
           setSeguro(v);
        }  
    }

    function SelectPadraoCidades(v,i) {
        if (v.key !== 0) {
           setCidade(v);
        }  
    }

    function pegaCidades(v,k) {
        var todasCidades = [{key: 0, nome: "SELECIONAR"}];
     
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

    function onClickAddImage() {
        setModalVisible(true);
    }

    function CloseModal() { 
        setModalVisible(false)
    };

    function removerImg (id) {
        imagens.forEach(function (item, index){
            if (id == item.id) { 
                var count = 0;
                count =  imagens.splice(imagens[index],1)  
                setCountImagens(count)   
            }
        });
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

    async function update() {
        if (infoPrevent(infoAdicionais) == false) {           
            errors.infoAdicionais = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        }
        else {
            await firebase.database().ref('equipamentos').child(key).update({
                // condicao: condicao,
                // fabricante: fabricante,
                // ano: ano,
                // modelo: modelo,
                // tipo: tipo,
                tracao: tracao,
                // consumo: consumo,
                // hodometro: hodometro,
                // horimetro: horimetro,
                // caracteristica: caracteristica,
                // peso: peso,
                // capacidade: capacidade,
                // potencia: potencia,
                // seguro: seguro,
                // infoAdicionais: infoAdicionais,
                // estado: estado,
                // cidade: cidade,
                // preco: preco,
                // precoDiaria: precoDiaria,
                // precoSemanal: precoSemanal,
                // precoMensal: precoMensal,
                // imagem0: imagem0,
                // imagem1: imagem1,
                // imagem2: imagem2,
                // imagem3: imagem3,
                // imagem4: imagem4,
                // imagem5: imagem5
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
                        value={detalhes.fabricante}
                        onChangeText={(text) => setFabricante(text)}
                        keyboardType={'default'}
                        maxLength={50}
                    />
                </View>

                <Text style={styles.tituloInput}>MODELO</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={detalhes.modelo}
                        onChangeText={(text) => setModelo(text)}
                        keyboardType={'default'}
                        maxLength={50}
                    />
                </View>

                <Text style={styles.tituloInput}>ANO</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder=""
                        value={detalhes.ano}
                        onChangeText={(text) => setAno(text)}
                        keyboardType={'numeric'}
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
                        <Picker.Item key={0} value={detalhes.tipo} label={detalhes.tipo}/>
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
                        {tracaoFiltradas}
                    </Picker>
                </View>

                <Text style={styles.tituloInput}>CONSUMO MÉDIO (KM/L)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="(Quilometros/Litro)"
                        placeholderTextColor='#fff'
                        value={detalhes.consumo}
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
                        value={detalhes.horimetro}
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
                        value={detalhes.horimetro}
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
                        value={detalhes.capacidade}
                        onChangeText={(text) => setCapacidade(text)}
                        keyboardType={'numeric'}
                        maxLength={50}
                    />
                </View>

                <Text style={styles.tituloInput}>POTÊNCIA (CV)</Text>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Potência"
                        placeholderTextColor='#fff'
                        value={detalhes.potencia}
                        onChangeText={(text) => setPotencia(text)}
                        keyboardType={'numeric'}
                        maxLength={50}
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
                        value={detalhes.infoAdicionais}
                        onChangeText={(text) => setInfoAdicionais(text)}
                        keyboardType={'default'}
                        maxLength={200}
                    />
                </View>
                <Text style={styles.atencao}>Atenção: Informações de contato só poderão ser passadas durante a negociação.</Text>

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
                
                {condicao.nome == 'ALUGUEL' ?
                    (
                        <View>
                            <Text style={styles.tituloInput}>PREÇO DIÁRIA</Text>
                            <View style={styles.areaInput}>
                                <TextInputMask
                                    style={styles.input}
                                    placeholder="R$"
                                    placeholderTextColor='#fff'
                                    value={detalhes.precoDiaria}
                                    onChangeText={(text) => setPrecoDiaria(text)}
                                    keyboardType={'numeric'}
                                    type={'money'}
                                    options = {{
                                        precision :  2,
                                        separator :  ',' ,
                                        delimiter :  '.' ,
                                        unidade :  'R$ ' ,
                                        sufixoUnidade :  ' ' 
                                    }} 
                                />
                            </View> 

                            <View>
                            <Text style={styles.tituloInput}>PREÇO SEMANAL</Text>
                            <View style={styles.areaInput}>
                                <TextInputMask
                                    style={styles.input}
                                    placeholder="R$"
                                    placeholderTextColor='#fff'
                                    value={detalhes.precoSemanal}
                                    onChangeText={(text) => setPrecoSemanal(text)}
                                    keyboardType={'numeric'}
                                    type={'money'}
                                    options = {{
                                        precision :  2,
                                        separator :  ',' ,
                                        delimiter :  '.' ,
                                        unidade :  'R$ ' ,
                                        sufixoUnidade :  ' ' 
                                    }} 
                                />
                            </View> 
                        </View>

                        <View>
                            <Text style={styles.tituloInput}>PREÇO MENSAL</Text>
                            <View style={styles.areaInput}>
                                <TextInputMask
                                    style={styles.input}
                                    placeholder="R$"
                                    placeholderTextColor='#fff'
                                    value={detalhes.precoMensal}
                                    onChangeText={(text) => setPrecoMensal(text)}
                                    keyboardType={'numeric'}
                                    type={'money'}
                                    options = {{
                                        precision :  2,
                                        separator :  ',' ,
                                        delimiter :  '.' ,
                                        unidade :  'R$ ' ,
                                        sufixoUnidade :  ' ' 
                                    }} 
                                />
                            </View> 
                        </View>
                        </View>
                    ) :
                    (
                        <View>
                            <Text style={styles.tituloInput}>PREÇO</Text>
                            <View style={styles.areaInput}>
                                <TextInputMask
                                    style={styles.input}
                                    placeholder="R$"
                                    placeholderTextColor='#fff'
                                    value={detalhes.preco}
                                    onChangeText={(text) => setPreco(text)}
                                    keyboardType={'numeric'}
                                    type={'money'}
                                    options = {{
                                        precision :  2,
                                        separator :  ',' ,
                                        delimiter :  '.' ,
                                        unidade :  'R$ ',
                                        sufixoUnidade :  ' ' 
                                    }} 
                                />
                            </View> 
                        </View>
                    )
                }

                <Text style={styles.tituloImagens}>ADICIONAR FOTOS</Text>
                <Text style={styles.subImagens}>Máximo de 6 Fotos.</Text>
                <TouchableOpacity style={styles.areaBtnPhoto} onPress={onClickAddImage}>
                    <Text style={styles.txtBtnPhoto}>CARREGAR FOTOS</Text>
                </TouchableOpacity>

                <Modal animationType="fade" transparent={true} visible={modalvisible} onRequestClose={() => {}}>
                    <View style={styles.modalWindow}>
                        <View style={styles.modalBody}>
                            <TouchableOpacity style={styles.areaBtnModalClose} onPress={CloseModal}>
                                <AntDesign
                                style={{marginRight: 20, marginBottom: 5}}
                                name='closecircleo'
                                size= {34}
                                color="#fff"
                                />
                            </TouchableOpacity>
                            
                            <TouchableOpacity style={styles.areaBtnModal}>
                                <Text style={styles.txtBtnModal}>TIRAR FOTO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.areaBtnModal}>
                                <Text style={styles.txtBtnModal}>ESCOLHER FOTO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={imagens}
                    numColumns={3}
                    renderItem={({item}) => renderItem (item, removerImg)}
                    keyExtractor={(item, index) => index.toString()}
                />

                <TouchableOpacity style={styles.btnProximo} onPress={update}>
                    <Text style={styles.txtBtn}>SALVAR ALTERAÇÕES</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </ScrollView>
    );
}

function renderItem(item, removerImg) {
    return (
        <View style={styles.areaImage}>
            <TouchableOpacity onPress={() => removerImg(item.id)}>
                <ImageBackground style={styles.itemImage} source={{uri: item.url}}>
                    <View style={{flexDirection: 'row-reverse'}}>
                        <FontAwesome
                            style={{marginRight: 3}}
                            name='close'
                            size= {30}
                            color="red"
                        />
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
};

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
    marginTop: 10,
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
},
areaBtnPhoto: {
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
},
txtBtnPhoto: {
    fontSize: 22,
    color: '#ffa500',
    fontWeight: 'bold'
},
areaImage: {
    height: 105,
    width: 105,
    borderWidth: 2,
    borderColor: '#fff',
    margin: 10 
},
itemImage: {
    height: 101,
    width: 101,
    resizeMode: 'cover'
},
modalWindow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
modalBody:{
    width: 350,
    height: 250,
    backgroundColor: '#ffa500',
    borderRadius: 10
},
tituloModal: {
    fontSize: 20,
    color: '#222',
    marginTop: 20,
    fontWeight: 'bold'
},
areaBtnModal: {
    width: '80%',
    marginLeft: '10%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
},
txtBtnModal: {
    fontSize: 22,
    color: '#ffa500',
    fontWeight: 'bold'
},
areaBtnModalClose: {
    marginTop: 20,
    flexDirection: 'row-reverse'
}
})