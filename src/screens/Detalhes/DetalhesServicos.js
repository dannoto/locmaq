import React, { useState, useEffect, useContext } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SlideDetalhesServicos from '../../components/SlideDetalhesServicos';

export default ({route}) => {

    const { key } = route.params; 
    const { user } = useContext(AuthContext); 
    const navigation = useNavigation();
    const interessado = user.uid;
    const produto= key;
 
    const [detalhes, setDetalhes] = useState([]);
    const [modalvisible, setModalVisible] = useState(false);
    const [desativado, setDesativado] = useState(true);
    const [ativado, setAtivado] = useState(false);
    const [proprietario, setProprietario] = useState('');

    function CloseModal() { 
        setModalVisible(false)
    }

    function Favoritar() {
        setDesativado(!desativado)
        setAtivado(!ativado)
    }
   
    useEffect(() => {
        async function getDetalhes() {
            await firebase.database().ref('servicos').child(key).on('value', (snapshot) => {
                 
                setProprietario({nome:snapshot.val().usuario.nome, codigo:snapshot.val().usuario.key})
             
                let data = {
                    key: snapshot.key,
                    titulo: snapshot.val().titulo,
                    estado: snapshot.val().estado.key, 
                    cidade: snapshot.val().cidade.nome,
                    descricao: snapshot.val().descricao, 
                    subcategoria: snapshot.val().subcategoria.nome, 
                    categoria: snapshot.val().categoria.nome,
                    codigoServico: snapshot.val().codigoServico
                };
                setDetalhes(data);
            })
        }

        getDetalhes();
    }, []);

    return (
        <ScrollView style={[styles.background, modalvisible ? {backgroundColor: '#fff', opacity: 0.1} : '']} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>  
            
                <SlideDetalhesServicos data={produto}/>
            
                <View style={styles.areaFavorito}>

                    {detalhes.titulo !== "" ? 
                                (  
                                    <View style={styles.areaTitulo}>
                                        <Text style={styles.titulo}>{detalhes.titulo}</Text>
                                    </View>
                                ) :
                                (
                                    <View style={styles.areaTitulo}>
                                        <Text style={styles.titulo}>{detalhes.subcategoria}</Text>
                                    </View>
                                )
                            }
                    
                    {ativado === false ?
                        (
                            <TouchableOpacity onPress={Favoritar}>
                                <Ionicons
                                    name={'heart-outline'}
                                    size= {38}
                                    color="#222"
                                />
                            </TouchableOpacity>
                        ) :
                        (
                            <TouchableOpacity onPress={Favoritar}>
                                <Ionicons
                                name={'heart-sharp'}
                                size= {38}
                                color="#ed4956"
                                />
                            </TouchableOpacity>
                        )
                    }
                </View>
                
                <Text style={styles.categoria}>{detalhes.categoria}</Text>

                <View style={styles.areaInteresse}>

                    <View style={styles.areaBtn}>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Chat',{proprietario:proprietario, interessado:interessado, produto:produto})}> */}
                        <TouchableOpacity onPress={() => proprietario.codigo == user.uid ? setModalVisible(true)  :  navigation.navigate('Chat',{proprietario:proprietario, interessado:interessado, produto:produto})  } >
                            <Text style={styles.txtBtn}>TENHO INTERESSE</Text>
                        </TouchableOpacity>
                    </View>

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

                                <Text style={styles.txtBtnModalProprietario}>VOCÊ É O PROPRIETÁRIO</Text>

                                <TouchableOpacity  onPress={CloseModal} style={styles.areaBtnModal} >
                                    <Text style={styles.txtBtnModal}>ENTENDI</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

                <View style={styles.areaLocal}>
                    <Ionicons
                    name='location-sharp'
                    size= {25}
                    color="#222"
                    />

                    <Text style={styles.local}>{detalhes.cidade} - {detalhes.estado}</Text>
                </View>

                <View>
                    <Text style={styles.tituloInfo}>DESCRIÇÃO</Text>

                    <View style={styles.areaInfoGeral}>
                        <Text style={styles.resultadoInfo}>{detalhes.descricao}</Text>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </ScrollView>  
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1
    },
    areaFavorito: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: 10,
        alignItems: 'center'
    },
    areaTitulo: {
        width: '90%'
    },
    titulo: {
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    areaInteresse: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    categoria: {
        color: '#ffa500',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    areaBtn: {
        height: 50,
        backgroundColor: '#ffa500',
        width: '90%',
        marginTop: 10,
        borderRadius: 10,
        justifyContent: 'center',
    },
    txtBtn: {
        color: '#fff', 
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    areaLocal: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 5
    },
    local: {
        color: '#222',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    tituloInfo: {
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 30,
        marginBottom: 15,
        textTransform: 'uppercase'
    },
    areaInfoGeral: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    resultadoInfo: {
        color: '#ffa500',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 4,
        marginRight: 10,
        marginBottom: 15,
        textTransform: 'uppercase'
    },
    modalWindow: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody:{
        width: 350,
        height: 210,
        backgroundColor: '#ffa500',
        borderRadius: 10
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
    txtBtnModalProprietario: {
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