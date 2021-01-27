import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, Image, Alert } from 'react-native';
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
    const [getUri, setGetUri] = useState('');
    const [modalvisible, setModalVisible] = useState(false);
    const [imagemURL, setImagemURL] = useState([]);
    const [imagemAtual, setImagemAtual] = useState([]);

    function onClickModal() {
        setModalVisible(true);
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
        // console.log(imagemAtual.length)
        // if (imagemURL.length > 0 ) {
        //     console.log('É MAIORRRR QUE ZEROOOOOOOOOOOOOO')
        //     setImagemURL([])
        
        // } else {
        //     console.log('É MENORRRRRRRR QUE ZEROOOOOOOOOOOOOO')
        // }
   
    }
    
    useEffect (() => {
        async function pegarFotoPerfil() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
                setImagemAtual(snapshot.val().avatar);
            });  
        }
        pegarFotoPerfil()
    }, []);


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
                    console.log('tamanho')
                    if (Storage.length > 0 ) {
                       
                        Storage = "";

                        Storage.push({url:e});
                        atualizaFoto();
                        setImagemURL(Storage)


                        
                        console.log('LIMPADO')
                        console.log(imagemURL);
                    } else {
                        
                        Storage.push({url:e});
                        atualizaFoto();
                        setImagemURL(Storage)
                    
                        console.log(imagemURL)

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
        <ScrollView style={[styles.container, modalvisible ? {backgroundColor: '#fff', opacity: 0.1} : '']}>
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

            <View style={styles. areaNome}>
                <View style={{width: '80%'}}>
                    <Text style={styles.titulo}>NOME</Text>
                    <Text style={[styles.dados, {textTransform: 'uppercase'}]}>{user.nome}</Text>    
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
        
            <Text style={styles.titulo}>CPF</Text>
            <Text style={styles.dados}>{user.cpf}</Text>

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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffa500',
        marginTop: 20,
        marginHorizontal: 20
    },
    dados: {
        fontSize: 20,
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
        marginTop: 20,
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