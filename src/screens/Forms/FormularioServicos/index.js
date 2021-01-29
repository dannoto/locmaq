import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, ImageBackground, TouchableOpacity, TextInput, StyleSheet, Platform, Alert, Modal, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../../contexts/auth';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../../../services/firebaseConnection';
import RNFetchBlob from 'react-native-fetch-blob';

window.Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const Fetch = RNFetchBlob.polyfill.Fetch
window.fetch = new Fetch({
    auto : true,
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/'
    ]
}).build()

//Formulário Serviços
export default function FormBritador({ navigation, route }) {

    const {subnome, subkey, catkey} = route.params;
    navigation.setOptions({headerTitle: subnome.toUpperCase()});
    const { cadastrarServicos, user } = useContext(AuthContext); 
    const navegacao = useNavigation();
    const categoria = {key:catkey, nome:'Serviços'};
    const subcategoria = {key:subkey, nome:subnome};
    const usuario = {key:user.uid, nome:user.nome};
    const errors = {};

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
    const [modalvisible, setModalVisible] = useState(false);
    const [countimagens, setCountImagens] = useState([]);
    const [codigoServico, setCodigoServico] = useState('');

    const base_firebase =  "https://firebasestorage.googleapis.com/v0/b/";
    const base_app = "locmaq-c04b0.appspot.com/o/";
    const base_folder = 'equipamentos';
    const base_user = user.uid;
    const base_slash = "%2F";
    const base_codigo = codigoServico;
    const base_alt = "?alt=media";

    useEffect (() => {
        fetch('https://gist.githubusercontent.com/letanure/3012978/raw/2e43be5f86eef95b915c1c804ccc86dc9790a50a/estados-cidades.json')
        .then((r)=>r.json())
        .then((json)=>{
            setCidadesData(json.estados);
        });

        GeradorCodigo() 
    }, []);

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

    function GeradorCodigo() {
      let  Salt =  Math.random () * Date.now();
      let Me = user.uid
      let CodigoFinal = Salt+Me
        setCodigoServico(CodigoFinal)
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
            minFiles: 2,
            maxFiles: 2
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
    console.log()

    function handleRegister(){
        if (subcategoria.nome == "Outros") {  
            if (titulo.length < 1) {
                errors.titulo = Alert.alert('Opps!', 'Informe o Título.')
            }
        }
        else if (estado.length < 1) {            
            errors.estado = Alert.alert('Opps!', 'Informe o Estado.')
        }  
        else if (cidade.length < 1) {          
            errors.cidade = Alert.alert('Opps!', 'Informe a Cidade.')    
        }  
        else if (descricao.length < 1) {  
            errors.descricao = Alert.alert('Opps!', 'Faça uma Descrição do Serviço.')
        }
        else if (infoPrevent(descricao) == false) {
            errors.descricao = Alert.alert('Opps!', 'Não é permitido digitar informações de contato (Telefone ou E-mail).')
        } 
        else if (imagens.length < 1) {       
            errors.imagens = Alert.alert('Opps!', 'Carregue pelo menos uma Foto.')
        } 
        else {
            salvarImagem(imagens); 
            
            var urls = [];
            
            if (imagens.length == 1) {
                var imagem0 = base_firebase+base_app+base_folder+base_slash+base_user+base_slash+base_codigo+base_slash+'0-'+base_codigo+'.jpeg'+base_alt;
                var imagem1 = "";

                if (cadastrarServicos (titulo, estado, cidade, descricao, usuario, subcategoria, categoria, codigoServico, imagem0, imagem1)) { 
                    Alert.alert('','Cadastrado com Sucesso!');
                    navegacao.navigate('Anuncie');
                }
            } 
            else if (imagens.length == 2) {
                var imagem0 = base_firebase+base_app+base_folder+base_slash+base_user+base_slash+base_codigo+base_slash+'0-'+base_codigo+'.jpeg'+base_alt;
                var imagem1 = base_firebase+base_app+base_folder+base_slash+base_user+base_slash+base_codigo+base_slash+'1-'+base_codigo+'.jpeg'+base_alt;

                if (cadastrarServicos (titulo, estado, cidade, descricao, usuario, subcategoria, categoria, codigoServico, imagem0, imagem1)) { 
                    Alert.alert('','Cadastrado com Sucesso!');
                    navegacao.navigate('Anuncie');
                }
            } 
        }  
    }

    return (
        <ScrollView style={[styles.background, modalvisible ? {backgroundColor: '#ffa500', opacity: 0.2} : '']}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>

                <Text style={styles.titulo}>PREENCHA OS CAMPOS ABAIXO</Text>

                {subcategoria.nome == "Outros" ?
                    (
                        <View>
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
                        </View>
                    ) :
                    (
                        false
                    )
                }

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

                <Text style={styles.tituloInput}>DESCRIÇÃO DO SERVIÇO</Text>
                <View style={styles.txtArea}>
                    <TextInput
                        style={styles.input}
                        multiline = {true}
                        numberOfLines = {1}
                        placeholder=""
                        value={descricao}
                        onChangeText={(text) => setDescricao(text)}
                        keyboardType={'default'}
                        maxLength={300}
                    />
                </View>
                <Text style={styles.atencao}>Atenção: Informações de contato só poderão ser passadas durante a negociação.</Text>

                <Text style={styles.tituloImagens}>ADICIONAR FOTO</Text>
                <Text style={styles.subImagens}>Máximo de 2 Fotos.</Text>
                <TouchableOpacity style={styles.areaBtnPhoto} onPress={onClickAddImage}>
                    <Text style={styles.txtBtnPhoto}>CARREGAR FOTO</Text>
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

                <TouchableOpacity style={styles.btnAnunciar} onPress={handleRegister}>
                    <Text style={styles.txtBtn}>ANUNCIAR</Text>
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
    btnAnunciar: {
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
    tituloImagens: {
        fontSize: 20,
        color: '#fff',
        marginTop: 40,
        fontWeight: 'bold'
    },
    subImagens: {
        fontSize: 17,
        color: '#fff',
        marginTop: 5
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
    },
    txtArea: {
        width: '100%',
        height: 260,
        backgroundColor: 'transparent',
        marginTop: 10,
        paddingHorizontal: 5,
        borderWidth: 2,
        borderColor: '#fff'
    },
    atencao: {
        fontSize: 18,
        color: '#222',
        marginTop: 5,
        textAlign: 'justify'
    }
})