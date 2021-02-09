import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Platform, Alert, Modal, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firebase from '../../services/firebaseConnection';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInputMask } from 'react-native-masked-text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function FormEditEmpilhadeiras({data}) {

    const errors = {};

    const [detalhes, setDetalhes] = useState([]);
    const [condicao, setCondicao] = useState('');
    const [condicoes, setCondicoes] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ALUGUEL'}, 
        {key: 2, nome: 'VENDA'}
    ]);
    const [fabricante, setFabricante] = useState('');
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [caracteristica, setCaracteristica] = useState('');
    const [opcoescaracteristica, setOpcoesCaracteristica] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ASA DELTA'}, 
        {key: 2, nome: 'DUPLEX'},
        {key: 3, nome: 'DUPLEX DESLOCADO'},
        {key: 4, nome: 'LATERAL'},
        {key: 5, nome: 'OPERADOR A BORDO'}, 
        {key: 6, nome: 'OPERADOR A PÉ'},
        {key: 7, nome: 'PALETADEIRA'},
        {key: 8, nome: 'PANTOGRÁFICA'},
        {key: 9, nome: 'QUADRIPLEX'}, 
        {key: 10, nome: 'OPCIONAL - PLE'},
        {key: 11, nome: 'SPREADER'},
        {key: 12, nome: 'TRILATERAL'},
        {key: 13, nome: 'TRIPLEX'}, 
        {key: 14, nome: 'TRIPLEX CONTAINER'},
        {key: 15, nome: 'TRIPLEX DESLOCADOR'}
    ]);
    const [tipo, setTipo] = useState('');
    const [tipos, setTipos] = useState([
        {key: 0, nome: 'SELECIONAR'}, 
        {key: 1, nome: 'ELÉTRICO'}, 
        {key: 2, nome: 'MANUAL'},
        {key: 3, nome: 'COMBUSTÃO'}
    ]);
    const [altura, setAltura] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [peso, setPeso] = useState('');
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
    const [precoHora, setPrecoHora] = useState('');
    const [imagens, setImagens] = useState([]);
    const [modalCondicao, setModalCondicao] = useState(false);
    const [modalFabricante, setModalFabricante] = useState(false);
    const [modalModelo, setModalModelo] = useState(false);
    const [modalAno, setModalAno] = useState(false);
    const [modalCaracteristica, setModalCaracteristica] = useState(false);
    const [modalTipo, setModalTipo] = useState(false);
    const [modalCapacidade, setModalCapacidade] = useState(false);
    const [modalAltura, setModalAltura] = useState(false);
    const [modalPeso, setModalPeso] = useState(false);
    const [modalPotencia, setModalPotencia] = useState(false);
    const [modalSeguro, setModalSeguro] = useState(false);
    const [modalinfoAdicionais, setModalinfoAdicionais] = useState(false);
    const [modalEstado, setModalEstado] = useState(false);
    const [modalCidade, setModalCidade] = useState(false);
    const [modalPreco, setModalPreco] = useState(false);
    const [modalPrecoHora, setModalPrecoHora] = useState(false);
    const [modalvisible, setModalVisible] = useState(false);
    const [countimagens, setCountImagens] = useState([]);
   
    useEffect(() => {
        async function getDetalhes() {
             await firebase.database().ref('equipamentos').child(data).on('value', (snapshot) => {
                setDetalhes([]);
             
                let data = {
                    key: snapshot.key,
                    condicao: snapshot.val().condicao.nome,
                    fabricante: snapshot.val().fabricante,
                    ano: snapshot.val().ano,
                    modelo: snapshot.val().modelo,
                    caracteristica: snapshot.val().caracteristica.nome,
                    tipo: snapshot.val().tipo.nome,
                    capacidade: snapshot.val().capacidade,
                    altura: snapshot.val().altura, 
                    peso: snapshot.val().peso, 
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais, 
                    estado: snapshot.val().estado.key, 
                    cidade: snapshot.val().cidade.nome,
                    preco: snapshot.val().preco, 
                    precoHora: snapshot.val().precoHora,
                    subcategoria: snapshot.val().subcategoria.nome, 
                    categoria: snapshot.val().categoria.nome,
                    codigoProduto: snapshot.val().codigoProduto,
                    imagem0:snapshot.val().imagem0,
                    imagem1:snapshot.val().imagem1,
                    imagem2:snapshot.val().imagem2,
                    imagem3:snapshot.val().imagem3,
                    imagem4:snapshot.val().imagem4,
                    imagem5:snapshot.val().imagem5
                };
                setDetalhes(data);
            })
        }

        fetch('https://gist.githubusercontent.com/letanure/3012978/raw/2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json')
        .then((r)=>r.json())
        .then((json)=>{
            setCidadesData(json.estados);
        });

        getDetalhes()
    }, []);


//Funções Update no Firebase
    async function updateCondicao() {
        await firebase.database().ref('equipamentos').child(data).update({
            condicao: condicao
        })
        setModalCondicao(false)
        setCondicao()
    }

    async function updateFabricante() {
        await firebase.database().ref('equipamentos').child(data).update({
            fabricante: fabricante
        })
        setModalFabricante(false)
        setFabricante()
    }

    async function updateModelo() {
        await firebase.database().ref('equipamentos').child(data).update({
            modelo: modelo
        })
        setModalModelo(false)
        setModelo()
    }

    async function updateAno() {
        await firebase.database().ref('equipamentos').child(data).update({
            ano: ano
        })
        setModalAno(false)
        setAno()
    }

    async function updateCaracteristica() {
        await firebase.database().ref('equipamentos').child(data).update({
            caracteristica: caracteristica
        })
        setModalCaracteristica(false)
        setCaracteristica()
    }

    async function updateTipo() {
        await firebase.database().ref('equipamentos').child(data).update({
            tipo: tipo
        })
        setModalTipo(false)
        setTipo()
    }

    async function updateCapacidade() {
        await firebase.database().ref('equipamentos').child(data).update({
            capacidade: capacidade
        })
        setModalCapacidade(false)
        setCapacidade()
    }

    async function updateAltura() {
        await firebase.database().ref('equipamentos').child(data).update({
            altura: altura
        })
        setModalAltura(false)
        setAltura()
    }

    async function updatePeso() {
        await firebase.database().ref('equipamentos').child(data).update({
           peso: peso
        })
        setModalPeso(false)
        setPeso()
    }

    async function updatePotencia() {
        await firebase.database().ref('equipamentos').child(data).update({
            potencia: potencia
        })
        setModalPotencia(false)
        setPotencia()
    }

    async function updateSeguro() {
        await firebase.database().ref('equipamentos').child(data).update({
            seguro: seguro
        })
        setModalSeguro(false)
        setSeguro()
    }

    async function updateInfoAdicionais() {
        if (infoPrevent(infoAdicionais) == false) {           
            errors.infoAdicionais = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        } else {
            await firebase.database().ref('equipamentos').child(data).update({
                infoAdicionais: infoAdicionais
            })
            setModalinfoAdicionais(false)
            setInfoAdicionais()
        }
    }

    async function updateEstado() {
        await firebase.database().ref('equipamentos').child(data).update({
            estado: estado
        })
        setModalEstado(false)
        setEstado()
    }

    async function updateCidade() {
        await firebase.database().ref('equipamentos').child(data).update({
            cidade: cidade
        })
        setModalCidade(false)
        setCidade()
    }

    async function updatePreco() {
        await firebase.database().ref('equipamentos').child(data).update({
            preco: preco
        })
        setModalPreco(false)
        setPreco()
    }

    async function updatePrecoHora() {
        await firebase.database().ref('equipamentos').child(data).update({
            precoHora: precoHora
        })
        setModalPrecoHora(false)
        setPrecoHora()
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

    let condicaoItem = condicoes.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let caracteristicaItem = opcoescaracteristica.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let tiposItem = tipos.map( (v, k) => {
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
    
    function SelectPadraoCaracteristica(v,i) {
        if (v.key !== 0) {
            setCaracteristica(v);
        }  
    }

    function SelectPadraoTipo(v,i) {
        if (v.key !== 0) {
            setTipo(v);
        }  
    }

    function SelectPadraoSeguro(v,i) {
        if (v.key !== 0) {
            setSeguro(v);
        }  
    }

    function SelectPadraoCidades(v,i) {
        if (v.key !== 0) {
           setCidade(v);
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

    async function salvarImagem(imagens) {
        for (var b= 0; b < imagens.length; b++ ) {

            let tipoImagem = imagens[b].tipo.replace('image/','');
            let nomeImagem =  b +'-' + codigoProduto + '.' + tipoImagem;
            let imagem = firebase.storage().ref().child('equipamentos').child(user.uid).child(codigoProduto).child(nomeImagem);
            
            let uri = imagens[b].url.replace('file://', '');
            let mime = imagens[b].tipo;

            RNFetchBlob.fs.readFile(uri, 'base64')
            .then((data) => {
            return RNFetchBlob.polyfill.Blob.build(data, {type: mime + ';BASE64'});
            })
            .then((blob) => {
               imagem.put(blob, {contentType:mime})
              
            })
            .catch((error) => {
                Alert.alert('Erro ao carregar foto.', error.code)
            })
        }
    }

    function onClickAddImage() {
        if (imagens.length == 3) {
            Alert.alert('Opps!', 'Máximo de 3 Fotos!')
        } else {
            setModalVisible(true);
        }  
    }

    function CloseModal() { 
        setModalVisible(false)
    };

    function takePhotoFromCamera() {
        ImagePicker.openCamera({
            width: 300,
            height: 400, 
            compressImageQuality: 0.7,
            includeBase64: true,   
        }).then(image => {
            onSelectedImageCamera(image)
            setModalVisible(false)  
        });
    }

    function choosePhotoFromLibrary() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            compressImageQuality: 0.7,
            includeBase64: true,
            multiple: true,
            minFiles: 3,
            maxFiles: 3
          }).then(image => {
            onSelectedImageLibrary(image)
            setModalVisible(false)
        });
    }

    function onSelectedImageCamera(image) {
        let newDataImg = imagens;
        newDataImg.push({
            id: Math.floor (Math.random () * Date.now ()),
            url: image.path,
            tipo: image.mime,
        });     
        setImagens(newDataImg);
    }

    function onSelectedImageLibrary(image) {
        let limit = (3 - imagens.length);
        let newDataImg = imagens;
        if (image.length > 1) {
            for (var i = 0; i < limit; i++) {
                newDataImg.push({
                    id: Math.floor (Math.random () * Date.now ()),
                    url: image[i].path,
                    tipo: image[i].mime, 
                });
            }      
        } 
        else {
            newDataImg.push({
                id: Math.floor (Math.random () * Date.now ()),
                url: image[0].path,
                tipo: image[0].mime,
            });     
        }
        setImagens(newDataImg);
        console.log(imagens)
    }

    function removerImg (id) {
        imagens.forEach(function (item, index){
            if (id == item.id) { 
                var count = 0;
                count =  imagens.splice(imagens[index],1)  
                setCountImagens(count)   
            }
        });
    }

    return (
        <ScrollView style={[styles.background, modalvisible || modalCondicao || modalFabricante || modalModelo || modalAno || modalCaracteristica ||  modalTipo || modalCapacidade || modalAltura ||
            modalPeso || modalPotencia || modalSeguro || modalinfoAdicionais || modalEstado || modalCidade || modalPreco || modalPrecoHora
         ? {backgroundColor: '#fff', opacity: 0.1} : '']}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>EDITAR ANÚNCIO:</Text>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>CONDIÇÃO</Text>
                        <Text style={styles.dados}>{detalhes.condicao}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {setModalCondicao(true)}}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalCondicao} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => {setModalCondicao(false)}}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateCondicao}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>FABRICANTE</Text>
                        <Text style={styles.dados}>{detalhes.fabricante}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {setModalFabricante(true)}}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalFabricante} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalFabricante(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>FABRICANTE</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder=""
                                        value={fabricante}
                                        onChangeText={(text) => setFabricante(text)}
                                        keyboardType={'default'}
                                        maxLength={50}
                                    />
                                </View>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateFabricante}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>MODELO</Text>
                        <Text style={styles.dados}>{detalhes.modelo}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalModelo(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalModelo} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalModelo(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>MODELO</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder=""
                                        value={modelo}
                                        onChangeText={(text) => setModelo(text)}
                                        keyboardType={'default'}
                                        maxLength={50}
                                    />
                                </View>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateModelo}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>ANO</Text>
                        <Text style={styles.dados}>{detalhes.ano}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalAno(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalAno} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalAno(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateAno}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>CARACTERÍSTICA</Text>
                        <Text style={styles.dados}>{detalhes.caracteristica}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalCaracteristica(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalCaracteristica} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalCaracteristica(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>CARACTERÍSTICA</Text>
                                <View style={styles.picker}>
                                    <Picker
                                    selectedValue={caracteristica}
                                    onValueChange={(itemValue, itemIndex) => SelectPadraoCaracteristica(itemValue,itemIndex)}
                                    style= {{color: '#fff'}}
                                    dropdownIconColor={'white'}
                                    >
                                        {caracteristicaItem}
                                    </Picker>
                                </View>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateCaracteristica}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                
                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>TIPO</Text>
                        <Text style={styles.dados}>{detalhes.tipo}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalTipo(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalTipo} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalTipo(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateTipo}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>CAPACIDADE MÁXIMA DE CARGA (KG)</Text>
                        <Text style={styles.dados}>{detalhes.capacidade}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalCapacidade(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalCapacidade} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalCapacidade(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>CAPACIDADE MÁXIMA DE CARGA (KG)</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="(Quilos)"
                                        placeholderTextColor='#fff'
                                        value={capacidade}
                                        onChangeText={(text) => setCapacidade(text)}
                                        keyboardType={'numeric'}
                                        maxLength={20}
                                    />
                                </View>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateCapacidade}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>ALTURA MÁXIMA DA ELEVAÇÃO (M)</Text>
                        <Text style={styles.dados}>{detalhes.altura}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalAltura(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalAltura} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalAltura(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>ALTURA MÁXIMA DA ELEVAÇÃO (M)</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="(Metros)"
                                        placeholderTextColor='#fff'
                                        value={altura}
                                        onChangeText={(text) => setAltura(text)}
                                        keyboardType={'numeric'}
                                        maxLength={20}
                                    />
                                </View>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateAltura}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>PESO OPERACIONAL (TON)</Text>
                        <Text style={styles.dados}>{detalhes.peso}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalPeso(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalPeso} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalPeso(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updatePeso}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>POTÊNCIA (CV)</Text>
                        <Text style={styles.dados}>{detalhes.potencia}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalPotencia(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalPotencia} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalPotencia(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>POTÊNCIA (CV)</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Potência"
                                        placeholderTextColor='#fff'
                                        value={potencia}
                                        onChangeText={(text) => setPotencia(text)}
                                        keyboardType={'numeric'}
                                        maxLength={50}
                                    />
                                </View>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updatePotencia}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
        
                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>POSSUI SEGURO?</Text>
                        <Text style={styles.dados}>{detalhes.seguro}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setModalSeguro(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalSeguro} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalSeguro(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateSeguro}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                {detalhes.infoAdicionais !== "" ?
                    (
                        <View style={styles.areaEdicao}>
                            <View>
                                <Text style={styles.tituloInput}>INFORMAÇÕES ADICIONAIS</Text>
                                <Text style={styles.dados}>{detalhes.infoAdicionais}</Text>
                            </View>

                            <TouchableOpacity onPress={() => setModalinfoAdicionais(true)}>
                                <MaterialIcons
                                    style={styles.icon}
                                    name='edit'
                                    size= {28}
                                    color='#fff'
                                />
                            </TouchableOpacity>
                        </View>
                    ) : 
                    (
                        <View style={styles.areaEdicao}>
                            <View>
                                <Text style={styles.tituloInput}>INFORMAÇÕES ADICIONAIS</Text>
                                <Text style={styles.dados}>-</Text>
                            </View>

                            <TouchableOpacity onPress={() => setModalinfoAdicionais(true)}>
                                <MaterialIcons
                                    style={styles.icon}
                                    name='edit'
                                    size= {28}
                                    color='#fff'
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }

                <Modal animationType="fade" transparent={true} visible={modalinfoAdicionais} onRequestClose={() => {}}>
                    <View style={styles.modalWindow}>
                        <View style={styles.modalBodyInfo}>
                            <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalinfoAdicionais(false)}>
                                <AntDesign
                                style={{marginBottom: 5}}
                                name='closecircleo'
                                size= {34}
                                color="#fff"
                                />
                            </TouchableOpacity>

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

                            <TouchableOpacity style={styles.areaBtnModal} onPress={updateInfoAdicionais}>
                                <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>ESTADO</Text>
                        <Text style={styles.dados}>{detalhes.estado}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {setModalEstado(true)}}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalEstado} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => {setModalEstado(false)}}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateEstado}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>CIDADE</Text>
                        <Text style={styles.dados}>{detalhes.cidade}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {setModalCidade(true)}}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalCidade} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBody}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => {setModalCidade(false)}}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

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

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateCidade}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                {detalhes.condicao == 'ALUGUEL' ?
                    (
                        <View>
                            {detalhes.precoHora == "" ?
                                (
                                    <View style={styles.areaEdicao}>
                                        <View>
                                            <Text style={styles.tituloInput}>PREÇO POR HORA</Text>
                                            <Text style={styles.dados}>-</Text>
                                        </View>
        
                                        <TouchableOpacity onPress={() => setModalPrecoHora(true)}>
                                            <MaterialIcons
                                                style={styles.icon}
                                                name='edit'
                                                size= {28}
                                                color='#fff'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ) : 
                                (
                                    <View style={styles.areaEdicao}>
                                        <View>
                                            <Text style={styles.tituloInput}>PREÇO POR HORA</Text>
                                            <Text style={styles.dados}>{detalhes.precoHora}</Text>
                                        </View>
        
                                        <TouchableOpacity onPress={() => setModalPrecoHora(true)}>
                                            <MaterialIcons
                                                style={styles.icon}
                                                name='edit'
                                                size= {28}
                                                color='#fff'
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                            
                            <Modal animationType="fade" transparent={true} visible={modalPrecoHora} onRequestClose={() => {}}>
                                <View style={styles.modalWindow}>
                                    <View style={styles.modalBody}>
                                        <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => {setModalPrecoHora(false)}}>
                                            <AntDesign
                                            style={{marginBottom: 5}}
                                            name='closecircleo'
                                            size= {34}
                                            color="#fff"
                                            />
                                        </TouchableOpacity>

                                        <View>
                                        <Text style={styles.tituloInput}>PREÇO POR HORA</Text>
                                        <View style={styles.areaInput}>
                                            <TextInputMask
                                                style={styles.input}
                                                placeholder="R$"
                                                placeholderTextColor='#fff'
                                                value={precoHora}
                                                onChangeText={(text) => setPrecoHora(text)}
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

                                        <TouchableOpacity style={styles.areaBtnModal} onPress={updatePrecoHora}>
                                            <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal> 
                        </View>
                    ) :
                    (
                        <View style={styles.areaEdicao}>
                            <View>
                                <Text style={styles.tituloInput}>PREÇO</Text>
                                <Text style={styles.dados}>{detalhes.preco}</Text>
                            </View>
        
                            <TouchableOpacity onPress={() => {setModalPreco(true)}}>
                                <MaterialIcons
                                    style={styles.icon}
                                    name='edit'
                                    size= {28}
                                    color='#fff'
                                />
                            </TouchableOpacity>
        
                            <Modal animationType="fade" transparent={true} visible={modalPreco} onRequestClose={() => {}}>
                                <View style={styles.modalWindow}>
                                    <View style={styles.modalBody}>
                                        <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => {setModalPreco(false)}}>
                                            <AntDesign
                                            style={{marginBottom: 5}}
                                            name='closecircleo'
                                            size= {34}
                                            color="#fff"
                                            />
                                        </TouchableOpacity>
        
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
                                                options = {{
                                                    precision :  2,
                                                    separator :  ',' ,
                                                    delimiter :  '.' ,
                                                    unidade :  'R$ ',
                                                    sufixoUnidade :  ' ' 
                                                }} 
                                            />
                                        </View>
        
                                        <TouchableOpacity style={styles.areaBtnModal} onPress={updatePreco}>
                                            <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    )
                }

                <Text style={styles.tituloImagens}>EDITAR FOTOS</Text>
                <Text style={styles.subImagens}>Máximo de 3 Fotos.</Text>
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
                            
                            <TouchableOpacity style={styles.areaBtnModal} onPress={takePhotoFromCamera}>
                                <Text style={styles.txtBtnModal}>TIRAR FOTO</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.areaBtnModal} onPress={choosePhotoFromLibrary}>
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

            </KeyboardAvoidingView>
        </ScrollView>
    );
}

function renderItem(item, removerImg) {
    return (
        <View style={{width: '31%', marginBottom: 10, marginHorizontal: '1%'}}>
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
        fontSize: 18,
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
    },
    dados: {
        fontSize: 18,
        color: '#222',
        marginTop: 10,
        marginBottom: 5,
        textTransform: 'uppercase'
    },
    areaEdicao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#fff'
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
    tituloImagens: {
        fontSize: 18,
        color: '#fff',
        marginTop: 40,
        fontWeight: 'bold'
    },
    subImagens: {
        fontSize: 18,
        color: '#fff',
        marginTop: 5
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
        fontSize: 18,
        color: '#ffa500',
        fontWeight: 'bold'
    },
    areaImage: {
        height: 115,
        width: '100%',
        borderColor: '#fff',
        borderWidth: 2,   
    },
    itemImage: {
        height: 111,
        width: '100%',
        resizeMode: 'cover'
    },
    modalWindow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBody:{
        width: '94%',
        height: 270,
        backgroundColor: '#ffa500',
        borderRadius: 10,
        paddingHorizontal: 15
    },
    modalBodyInfo:{
        width: '94%',
        height: 400,
        backgroundColor: '#ffa500',
        borderRadius: 10,
        paddingHorizontal: 15
    },
    tituloModal: {
        fontSize: 18,
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
        fontSize: 18,
        color: '#ffa500',
        fontWeight: 'bold'
    },
    txtBtnModalTitulo: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    areaBtnModalClose: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row-reverse'
    }
})