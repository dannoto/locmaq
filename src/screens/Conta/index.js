import React, { useContext } from 'react';
import { Platform , ScrollView, Text, TouchableOpacity, KeyboardAvoidingView, View, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';

export default () => {

    const { user, sair } = useContext(AuthContext);
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>               

                <View style={styles.header}>
                    {/* {avatar != '' ?
                        <Image source={{uri: avatar}}/>
                        : */}
                        <Ionicons
                            name={'md-person-circle'}
                            size={70}
                            color="#bbb"        
                        /> 
                    {/* } */}
                

                    <Text style={styles.nome}>{ user && user.nome }</Text>

                </View>

                <View style={styles.areaBtn}>
                    <Text style={styles.titulo1}>CONFIGURAÇÕES DA CONTA</Text>

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

                    <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Notificacoes')}>
                    <EvilIcons
                        name={'bell'}
                        size={40}
                        color="#ffa500"
                    /> 
                        <Text style={styles.btnTitulo}>NOTIFICAÇÕES</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Favoritos')}>
                    <EvilIcons
                        name={'heart'}
                        size={40}
                        color="#ffa500"
                    /> 
                        <Text style={styles.btnTitulo}>FAVORITOS</Text>
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
                        name={'comment'}
                        size={40}
                        color="#ffa500"
                    /> 
                        <Text style={styles.btnTitulo}>ENVIAR FEEDBACK</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Erro')}>
                    <EvilIcons style={styles.icon}
                        name={'exclamation'}
                        size={40}
                        color="#ffa500"
                    /> 
                        <Text style={styles.btnTitulo}>ENCONTROU ALGUM ERRO?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Perguntas')}>
                    <EvilIcons style={styles.icon}
                        name={'question'}
                        size={40}
                        color="#ffa500"
                    /> 
                        <Text style={styles.btnTitulo}>PERGUNTAS FREQUENTES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={ () => navigation.navigate('Sobre')}>
                    <EvilIcons style={styles.icon}
                        name={'heart'}
                        size={40}
                        color="#ffa500"
                    /> 
                        <Text style={styles.btnTitulo}>SOBRE A LOCMAQ</Text>
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

                    <TouchableOpacity style={styles.btn} onPress={ () => sair()}>
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
        marginBottom: 20,
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
        fontSize: 22,
        paddingLeft: 10
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
    }
})