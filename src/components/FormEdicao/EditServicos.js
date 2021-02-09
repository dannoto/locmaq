import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Platform, Alert, Modal, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import firebase from '../../services/firebaseConnection';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function FormEditServicos({data}) {

    const errors = {};

    const [detalhes, setDetalhes] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
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
    const [imagens, setImagens] = useState([]);
    const [modalTitulo, setModalTitulo] = useState(false);
    const [modalEstado, setModalEstado] = useState(false);
    const [modalCidade, setModalCidade] = useState(false);
    const [modalDescricao, setModalDescricao] = useState(false);
    const [modalvisible, setModalVisible] = useState(false);
    const [countimagens, setCountImagens] = useState([]);
   
    useEffect(() => {
        async function getDetalhes() {
             await firebase.database().ref('equipamentos').child(data).on('value', (snapshot) => {
                setDetalhes([]);
             
                let data = {
                    key: snapshot.key,
                    titulo: snapshot.val().titulo,
                    estado: snapshot.val().estado.key, 
                    cidade: snapshot.val().cidade.nome,
                    descricao: snapshot.val().descricao, 
                    subcategoria: snapshot.val().subcategoria.nome, 
                    categoria: snapshot.val().categoria.nome,
                    codigoServico: snapshot.val().codigoServico,
                    imagem0:snapshot.val().imagem0,
                    imagem1:snapshot.val().imagem1
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
    async function updateTitulo() {
        await firebase.database().ref('equipamentos').child(data).update({
            titulo: titulo
        })
        setModalTitulo(false)
        setTitulo()
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

    async function updateDescricao() {
        if (infoPrevent(descricao) == false) {           
            errors.descricao = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        } else {
            await firebase.database().ref('equipamentos').child(data).update({
                descricao: descricao
            })
            setModalDescricao(false)
            setDescricao()
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

    let estadoItem = estados.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    let cidadeItem = cidades.map( (v, k) => {
        return <Picker.Item key={k} value={v} label={v.nome}/>
    })

    function SelectPadraoCidades(v,i) {
        if (v.key !== 0) {
           setCidade(v);
        }  
    }

    //Filtro Descrição
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
            let nomeImagem =  b +'-' + codigoServico + '.' + tipoImagem;
            let imagem = firebase.storage().ref().child('servicos').child(user.uid).child(codigoServico).child(nomeImagem);
            
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
        if (imagens.length == 2) {
            Alert.alert('Opps!', 'Máximo de 2 Fotos!')
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
            minFiles: 6,
            maxFiles: 6
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
        let limit = (2 - imagens.length);
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
        <ScrollView style={[styles.background, modalvisible || modalTitulo || modalDescricao || modalEstado || modalCidade ? {backgroundColor: '#fff', opacity: 0.1} : '']}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>EDITAR ANÚNCIO:</Text>

                {detalhes.subcategoria == "Outros" ?
                    (
                        <View style={styles.areaEdicao}>
                            <View>
                                <Text style={styles.tituloInput}>TÍTULO</Text>
                                <Text style={styles.dados}>{detalhes.titulo}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {setModalTitulo(true)}}>
                                <MaterialIcons
                                    style={styles.icon}
                                    name='edit'
                                    size= {28}
                                    color='#fff'
                                />
                            </TouchableOpacity>

                            <Modal animationType="fade" transparent={true} visible={modalTitulo} onRequestClose={() => {}}>
                                <View style={styles.modalWindow}>
                                    <View style={styles.modalBody}>
                                        <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => setModalTitulo(false)}>
                                            <AntDesign
                                            style={{marginBottom: 5}}
                                            name='closecircleo'
                                            size= {34}
                                            color="#fff"
                                            />
                                        </TouchableOpacity>

                                        <Text style={styles.tituloInput}>TÍTULO</Text>
                                        <View style={styles.areaInput}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder=""
                                                value={titulo}
                                                onChangeText={(text) => setTitulo(text)}
                                                keyboardType={'default'}
                                                maxLength={20}
                                            />
                                        </View>

                                        <TouchableOpacity style={styles.areaBtnModal} onPress={updateTitulo}>
                                            <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
                        </View> 
                    ) : 
                    (
                        false
                    )
                }

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

                <View style={styles.areaEdicao}>
                    <View>
                        <Text style={styles.tituloInput}>DESCRIÇÃO DO SERVIÇO</Text>
                        <Text style={styles.dados}>{detalhes.descricao}</Text>
                    </View>

                    <TouchableOpacity onPress={() => {setModalDescricao(true)}}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#fff'
                        />
                    </TouchableOpacity>

                    <Modal animationType="fade" transparent={true} visible={modalDescricao} onRequestClose={() => {}}>
                        <View style={styles.modalWindow}>
                            <View style={styles.modalBodyInfo}>
                                <TouchableOpacity style={styles.areaBtnModalClose} onPress={() => {setModalDescricao(false)}}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>

                                <Text style={styles.tituloInput}>DESCRIÇÃO DO SERVIÇO</Text>
                                <View style={styles.txtArea}>
                                    <TextInput
                                        style={styles.input}
                                        multiline = {true}
                                        numberOfLines = {7}
                                        textAlignVertical = 'top'
                                        placeholder=""
                                        value={descricao}
                                        onChangeText={(text) => setDescricao(text)}
                                        keyboardType={'default'}
                                        maxLength={300}
                                    />
                                </View>
                                <Text style={styles.atencao}>Atenção: Informações de contato só poderão ser passadas durante a negociação.</Text>

                                <TouchableOpacity style={styles.areaBtnModal} onPress={updateDescricao}>
                                    <Text style={styles.txtBtnModal}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <Text style={styles.tituloImagens}>EDITAR FOTOS</Text>
                <Text style={styles.subImagens}>Máximo de 2 Fotos.</Text>
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