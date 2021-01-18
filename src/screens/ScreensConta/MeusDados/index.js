import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Modal, ImagePickerIOS } from 'react-native';
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
    const [modalvisible, setModalVisible] = useState(false);
    const [imagemURL, setImagemURL] = useState('');

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
        let newDataImg = avatar;

        newDataImg.push({
            id: Math.floor (Math.random () * Date.now ()),
            url: image.path,
            tipo: image[i].mime,
        });     
            
        setAvatar(newDataImg);
    }

    function onSelectedImageLibrary(image) {

        let newDataImg = avatar;

        newDataImg.push({
            id: Math.floor (Math.random () * Date.now ()),
            url: image[0].path,
            tipo: image[0].mime,
        });     

        setAvatar(newDataImg);
    }

    // async function salvarImagem(imagens) {

    //     var URLImagem = imagemURL;
    //     for (var b =0; b < imagens.length; b++ ) {

    //         let tipoImagem = imagens[b].tipo.replace('image/','');
    //         let random = Math.random () * Date.now();
    //         let nomeImagem = random + '' + imagens[b].id + '.' + tipoImagem;

    //         let imagem = firebase.storage().ref().child('equipamentos').child(nomeImagem);
            
    //         let uri = imagens[b].url.replace('file://', '');
    //         let mime = imagens[b].tipo;

    //         RNFetchBlob.fs.readFile(uri, 'base64')
    //         .then((data) => {
    //         return RNFetchBlob.polyfill.Blob.build(data, {type: mime + ';BASE64'});
    //         })
    //         .then((blob) => {
    //            imagem.put(blob, {contentType:mime})
    //             .then(() => {
    //                 return imagem.getDownloadURL().then((e) => { 
    //                     URLImagens.push({url:e});
    //                 });
    //             })
    //             .catch((error) => {
    //                 Alert.alert('Erro ao carregar foto.', error.code)
    //             })
    //         });
    //     }
    //     setImagensURL(URLImagens)
    // }

    return (
        <ScrollView style={[styles.container, modalvisible ? {backgroundColor: '#fff', opacity: 0.1} : '']}>
            <View style={styles.areaImg}>
                {avatar != '' ?
                    <Image style={styles.imgPerfil} source={{uri: avatar.url}}/>
                    :
                    <Ionicons
                        name={'md-person-circle'}
                        size={200}
                        color="#bbb"        
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
                <View style={{width: '85%'}}>
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

            <View style={styles. areaCelular}>
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
        width: 120,
        height: 120
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