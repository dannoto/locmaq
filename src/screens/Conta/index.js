import React, { useState, useContext, useEffect } from 'react';
import { Platform , ScrollView, Text, TouchableOpacity, KeyboardAvoidingView, View, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default () => {

    const { user, sair } = useContext(AuthContext);
    const navigation = useNavigation();
    const [detalhes, setDetalhes] = useState([]);
    const [nomeFirebase, setNomeFirebase] = useState([]);
    const [empresaFirebase, setEmpresaFirebase] = useState([]);

    useEffect (() => {
        async function getTipo() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
               setDetalhes([]);
            
                let data = {
                    key: snapshot.key,
                    tipo: snapshot.val().tipo,
                    avatar: snapshot.val().avatar.url
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
                nome: snapshot.val().nome
            };
            setNomeFirebase(data);
            })
        }

        async function getEmpresa() {
            await firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
            setempresaFirebase([]);
            
            let data = {
                empresa: snapshot.val().empresa
            };
            setEmpresaFirebase(data);
            })
        }

        getTipo();
    }, []);
 
    return (
        <View style={styles.background}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('MeusDados')}>
                    {detalhes.avatar != "" ?
                        <Image style={styles.img} source={{uri: detalhes.avatar}}/>
                        :
                        <Ionicons
                            name={'md-person-circle'}
                            size={70}
                            color="#bbb"        
                        /> 
                    }
                </TouchableOpacity>
                
                {detalhes.tipo == "Pessoa Física" ?
                    (
                        <Text style={styles.nome}>{nomeFirebase.nome}</Text>
                    ) : 
                    (
                        <Text style={styles.nome}>{empresaFirebase.nome}</Text>
                    )
                }
            </View>

            <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled>                            

                    <View style={styles.areaBtn}>
                        <Text style={[styles.titulo1, {marginTop: 20}]}>CONFIGURAÇÕES DA CONTA</Text>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('MeusDados')}>
                        <EvilIcons style={styles.icon}
                            name={'user'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>MEUS DADOS</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('MeusAnuncios')}>
                        <EvilIcons
                            name={'tag'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>MEUS ANÚNCIOS</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Favoritos')}>
                        <EvilIcons style={styles.icon}
                            name={'heart'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>FAVORITOS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('MinhasAssinaturas')}>
                        <EvilIcons
                            name={'retweet'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>MINHAS ASSINATURAS</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('HistoricoPagamentos')}>
                        <EvilIcons
                            name={'credit-card'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>HISTÓRICO DE PAGAMENTOS</Text>
                        </TouchableOpacity> 
                    </View>

                    <View style={styles.areaBtn}>
                        <Text style={styles.titulo2}>SERVIÇOS E CONTEÚDO</Text>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Anunciar')}>
                        <EvilIcons style={styles.icon}
                            name={'tag'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>ANUNCIAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('SobreAssinatura')}>
                        <EvilIcons style={styles.icon}
                            name={'retweet'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>SOBRE A ASSINATURA</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Planos')}>
                        <EvilIcons style={styles.icon}
                            name={'plus'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>CONHEÇA NOSSOS PLANOS</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.areaBtn}>
                        <Text style={styles.titulo2}>CENTRAL DE ATENDIMENTO</Text>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Feedback')}>
                        <EvilIcons style={styles.icon}
                            name={'question'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>AJUDA E SUPORTE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Sobre')}>
                        <EvilIcons style={styles.icon}
                            name={'heart'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>SOBRE A LOQMAC</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Termos')}>
                        <EvilIcons style={styles.icon}
                            name={'arrow-right'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>TERMOS DE USO</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Politica')}>
                        <EvilIcons style={styles.icon}
                            name={'arrow-right'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>POLÍTICA DE PRIVACIDADE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btnSair} onPress={() => sair()}>
                        <EvilIcons style={styles.icon}
                            name={'external-link'}
                            size={40}
                            color="#ffa500"
                        /> 
                            <Text style={styles.btnTitulo}>SAIR</Text>
                        </TouchableOpacity>
                    </View>
                    
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#fff'
    },

    container: {
        flex: 1,
    },
    header: {
        height: 90,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        shadowOffset: {width: 0, height: 4},
        shadowColor: '#222',
        shadowRadius: 2,
        elevation: 7
    },
    nome: {
        color: '#222',
        fontSize: 18,
        paddingLeft: 10,
        textTransform: 'uppercase'
    },
    areaBtn: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    titulo1: {
        color: '#666',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10
    },
    btn: {
        height: 60,
        borderBottomWidth: 2,
        borderColor: '#ddd',
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnSair: {
        height: 60,
        alignItems: 'center',
        flexDirection: 'row'
    },
    btnTitulo: {
        color: '#222',
        fontSize: 18,
        marginLeft:10
    },
    titulo2: {
        color: '#666',
        fontSize: 18,
        marginTop: 30,
        marginBottom: 10
    },
    avatarIcon: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    img: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 3,
        borderColor: '#ffa500'
    }
})