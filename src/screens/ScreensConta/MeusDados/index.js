import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Image, Alert, TextInput } from 'react-native';
import { AuthContext } from '../../../contexts/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from '../../../services/firebaseConnection';
import ImagePicker from 'react-native-image-crop-picker';
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
        'foo/',
    ]
}).build()

export default () => {
    const { user } = useContext( AuthContext );
    const [avatar, setAvatar] = useState([]);
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [detalhes, setDetalhes] = useState([]);
    const [nomeFirebase, setNomeFirebase] = useState([]);
    const [empresaFirebase, setEmpresaFirebase] = useState([]);
    const [getUri, setGetUri] = useState('');
    const [modalNome, setModalNome] = useState(false);
    const [modalEmpresa, setModalEmpresa] = useState(false);
    const [modalvisible, setModalVisible] = useState(false);
    const [imagemURL, setImagemURL] = useState([]);
    const [imagemAtual, setImagemAtual] = useState([]);

    useEffect (() => {
        async function getTipo() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
               setDetalhes([]);
            
                let data = {
                    key: snapshot.key,
                    tipo: snapshot.val().tipo,
                };
                setDetalhes(data);
                
                if (data.tipo == "Pessoa Física") {
                    getNome();
                } 
                else if (data.tipo == "Pessoa Jurídica") {
                    getEmpresa();
                }
           })
        }

        async function getNome() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
            setNomeFirebase([]);
            
            let data = {
                nome: snapshot.val().nome,
                cpf: snapshot.val().cpf
            };
            setNomeFirebase(data);
            })
        }

        async function getEmpresa() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
            setempresaFirebase([]);
            
            let data = {
                empresa: snapshot.val().empresa,
                cnpj: snapshot.val().cnpj
            };
            setEmpresaFirebase(data);
            })
        }

        async function pegarFotoPerfil() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
                setImagemAtual(snapshot.val().avatar);
            });  
        }

        getTipo();
        pegarFotoPerfil();
    }, []);

    function onClickModal() {
        setModalVisible(true);
    }

    function CloseModal() { 
        setModalVisible(false)
    };

    async function updateNome() {
        await firebase.database().ref('users').child(user.uid).update({
            nome: nome
        })
        setModalNome(false)
        setNome()
    }

    async function updateEmpresa() {
        await firebase.database().ref('users').child(user.uid).update({
            empresa: empresa
        })
        setModalEmpresa(false)
        setEmpresa()
    }

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
            includeBase64: true

          }).then(image => {
            onSelectedImageLibrary(image)
            setModalVisible(false)
        });
    }

    function onSelectedImageCamera(image) {
        setAvatar([]);
       
        let newDataImg = avatar;

        newDataImg.push({
            id: Math.floor (Math.random () * Date.now ()),
            url: image.path,
            tipo: image.mime,
        });     
        setAvatar(newDataImg);
        salvarImagem(newDataImg)   
        setImagemAtual([])
        setImagemAtual(avatar[0].url)
    }

    function onSelectedImageLibrary(image) {
        setAvatar([]);
      
        let newDataImg = avatar;

        newDataImg.push({
            id: Math.floor (Math.random () * Date.now ()),
            url: image.path,
            tipo: image.mime,
        }); 
        
        setAvatar(newDataImg);
        salvarImagem(newDataImg) 
        setImagemAtual(avatar[0].url)
    }

    async function salvarImagem(imagens) {
        let tipoImagem = imagens[0].tipo.replace('image/','');
        let random = Math.random () * Date.now();
        let nomeImagem = random + '' + imagens[0].id + '.' + tipoImagem;

        let imagem = await firebase.storage().ref().child('perfil').child(nomeImagem);
        
        let uri = imagens[0].url.replace('file://', '');
        let mime = imagens[0].tipo;

        let Storage = imagemURL;

        RNFetchBlob.fs.readFile(uri, 'base64')
        .then((data) => {
        return RNFetchBlob.polyfill.Blob.build(data, {type: mime + ';BASE64'});
        })
        .then((blob) => {
            imagem.put(blob, {contentType:mime})
            .then(() => {
                return imagem.getDownloadURL().then((e) => { 
                    if (Storage.length > 0 ) {
                       
                        Storage = "";

                        Storage.push({url:e});
                        atualizaFoto();
                        setImagemURL(Storage)

                    } else {
                        Storage.push({url:e});
                        atualizaFoto();
                        setImagemURL(Storage)
                    }  
                });
            })
            .catch((error) => {
                Alert.alert('Erro ao carregar foto.', error.code)
            })
        });
    }

    async function atualizaFoto () {
        firebase.database().ref('users').child(user.uid).child('avatar').update({
            url:imagemURL[0].url
        })
       console.log('SALVEI')
    }

    return (
        <ScrollView style={[styles.container, modalvisible || modalNome || modalEmpresa ? {backgroundColor: '#fff', opacity: 0.1} : '']} showsVerticalScrollIndicator={false}>
            <View style={styles.areaImg}>
                {imagemAtual != '' ?
                    <Image style={styles.imgPerfil} source={{uri: imagemAtual.url}}/>
                    :
                    <Ionicons
                        name={'md-person-circle'}
                        size={200}
                        color='#bbb'       
                    /> 
                }

                <TouchableOpacity onPress={onClickModal}>
                    <Text style={styles.txtImg}>ALTERAR FOTO DE PERFIL</Text>
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
            </View>

            {detalhes.tipo == "Pessoa Física" ? 
                (
                    <View style={styles. areaNome}>
                    <View style={{width: '80%'}}>
                        <Text style={styles.titulo}>NOME</Text>
                        <Text style={[styles.dados, {textTransform: 'uppercase'}]}>{nomeFirebase.nome}</Text>    
                    </View>
    
                    <TouchableOpacity onPress={() => setModalNome(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#222'
                        />
                    </TouchableOpacity> 
    
                    <Modal animationType="fade" transparent={true} visible={modalNome} onRequestClose={() => {}}>
                        <View style={styles.modalWindowNome}>
                            <View style={styles.modalBodyNome}>
                                <TouchableOpacity style={styles.areaBtnModalCloseNome} onPress={() => setModalNome(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>
    
                                <Text style={styles.tituloInput}>NOME</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder=""
                                        value={nome}
                                        onChangeText={(text) => setNome(text)}
                                        keyboardType={'default'}
                                        maxLength={50}
                                    />
                                </View>
    
                                <TouchableOpacity style={styles.areaBtnModalNome} onPress={updateNome}>
                                    <Text style={styles.txtBtnModalNome}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                ) : 
                (
                    <View style={styles. areaNome}>
                    <View style={{width: '80%'}}>
                        <Text style={styles.titulo}>EMPRESA</Text>
                        <Text style={[styles.dados, {textTransform: 'uppercase'}]}>{empresaFirebase.nome}</Text>    
                    </View>
    
                    <TouchableOpacity onPress={() => setModalEmpresa(true)}>
                        <MaterialIcons
                            style={styles.icon}
                            name='edit'
                            size= {28}
                            color='#222'
                        />
                    </TouchableOpacity> 
    
                    <Modal animationType="fade" transparent={true} visible={modalEmpresa} onRequestClose={() => {}}>
                        <View style={styles.modalWindowNome}>
                            <View style={styles.modalBodyNome}>
                                <TouchableOpacity style={styles.areaBtnModalCloseNome} onPress={() => setModalEmpresa(false)}>
                                    <AntDesign
                                    style={{marginBottom: 5}}
                                    name='closecircleo'
                                    size= {34}
                                    color="#fff"
                                    />
                                </TouchableOpacity>
    
                                <Text style={styles.tituloInput}>EMPRESA</Text>
                                <View style={styles.areaInput}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder=""
                                        value={empresa}
                                        onChangeText={(text) => setEmpresa(text)}
                                        keyboardType={'default'}
                                        maxLength={50}
                                    />
                                </View>
    
                                <TouchableOpacity style={styles.areaBtnModalNome} onPress={updateEmpresa}>
                                    <Text style={styles.txtBtnModalNome}>SALVAR ALTERAÇÕES</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
                )
            }

            {detalhes.tipo == "Pessoa Física" ? 
                (
                    <View>
                        <Text style={styles.titulo}>CPF</Text>
                        <Text style={styles.dados}>{nomeFirebase.cpf}</Text>
                    </View>
                ) :
                (
                    <View>
                        <Text style={styles.titulo}>CPF</Text>
                        <Text style={styles.dados}>{empresaFirebase.cnpj}</Text>
                    </View>
                )
            }

            <Text style={styles.titulo}>E-MAIL</Text>
            <Text style={styles.dados}>{user.email}</Text>

            <View style={styles.areaCelular}>
                <View>
                    <Text style={styles.titulo}>CELULAR</Text>
                    <Text style={styles.dados}>(62) 99259-3271</Text>
                </View>

                <TouchableOpacity>
                    <MaterialIcons
                        style={styles.icon}
                        name='edit'
                        size= {28}
                        color='#222'
                    />
                </TouchableOpacity>
                
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    areaImg: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgPerfil: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginVertical: 15
    },
    txtImg: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#ffa500',
        color: '#fff',
        borderRadius: 8,
        padding: 12
    },
    areaNome: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    areaCelular: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        marginTop: 50,
        marginHorizontal: 20,
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffa500',
        marginTop: 20,
        marginHorizontal: 20
    },
    dados: {
        fontSize: 18,
        color: '#222',
        marginTop: 5,
        marginHorizontal: 20
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
        borderRadius: 10,
    },
    areaBtnModal: {
        width: '80%',
        marginLeft: '10%',
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    txtBtnModal: {
        fontSize: 18,
        color: '#ffa500',
        fontWeight: 'bold'
    },
    areaBtnModalClose: {
        marginTop: 20,
        flexDirection: 'row-reverse'
    },

    modalWindowNome: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBodyNome:{
        width: '94%',
        height: 270,
        backgroundColor: '#ffa500',
        borderRadius: 10,
        paddingHorizontal: 15
    },
    areaBtnModalNome: {
        width: '80%',
        marginLeft: '10%',
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    txtBtnModalNome: {
        fontSize: 18,
        color: '#ffa500',
        fontWeight: 'bold'
    },
    areaBtnModalCloseNome: {
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row-reverse'
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
    input: {
        width: '100%',
        fontSize: 18,
        color: '#fff'
    }
})