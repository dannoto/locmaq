import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, TextInput, ActivityIndicator, Image} from 'react-native';
import firebase from '../../services/firebaseConnection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SlideDetalhes from '../../components/SlideDetalhes';

export default ({route}) => {

    const {key} = route.params; 
    
    const [detalhes, setDetalhes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const user = firebase.auth().currentUser;
    const [modalvisible, setModalVisible] = useState(false);


    const [proprietario, setProprietario] = useState();
    const interessado = user.uid;
    const produto= key;


    function CloseModal() { 
        setModalVisible(false)
    };

    useEffect(() => {
        async function getDetalhes() {
            // -MQlouXhBLHzXNtW9qe1

          
            await firebase.database().ref('equipamentos').child(key).once('value')
            .then(function(snapshot) {

                setProprietario({nome:snapshot.val().usuario.nome, codigo:snapshot.val().usuario.key})
             
                let data = {
                        
                    // key: childItem.key,
                    // condicao: childItem.val().condicao.nome,
                    fabricante: snapshot.val().fabricante,
                    // ano: childItem.val().ano.ano,
                    // modelo: childItem.val().modelo,
                    // // tipo: childItem.val().tipo.nome,
                    // // tracao: childItem.val().tracao.nome,
                    // consumo: childItem.val().consumo, 
                    // hodometro: childItem.val().hodometro, 
                    // horimetro: childItem.val().horimetro,
                    // capacidade: childItem.val().capacidade, 
                    // seguro: childItem.val().seguro.nome, 
                    // fabricantebau: childItem.val().fabricanteBau, 
                    // anobau: childItem.val().anoBau.anobau, 
                    // dimensoesbau: childItem.val().dimensoesBau,
                    // fabricantetanque: childItem.val().fabricanteTanque,
                    // // anotanque: childItem.val().anoTanque.anotanque, 
                    // capacidadetanque: childItem.val().capacidadeTanque,
                    // fabricantecarroceria: childItem.val().fabricanteCarroceria,
                    // // anocarroceria: childItem.val().anoCarroceria.anocarroceria,
                    // capacidadecarroceria: childItem.val().capacidadeCarroceria,
                    // fabricantecacamba: childItem.val().fabricanteCacamba,
                    // // anocacamba: childItem.val().anoCacamba.anocacamba,
                    // capacidadecacamba: childItem.val().capacidadeCacamba,
                    // // cacamba: childItem.val().cacamba.nome,
                    // fabricantecomboio: childItem.val().fabricanteComboio,
                    // // anocomboio: childItem.val().anoComboio.anocomboio,
                    // modelocomboio: childItem.val().modeloComboio,
                    // capacidadecomboio: childItem.val().capacidadeComboio,
                    // larguraplataforma: childItem.val().larguraPlataforma,
                    // alturaplataforma: childItem.val().alturaPlataforma,
                    // capacidadesilo: childItem.val().capacidadeSilo, 
                    // modeloplataforma: childItem.val().modeloPlataforma,
                    // capacidadepoliguidaste: childItem.val().capacidadePoliguidaste,
                    // // poliguidaste: childItem.val().poliguidaste.nome,
                    // estado: childItem.val().estado.key, 
                    // cidade: childItem.val().cidade.nome,
                    // preco: childItem.val().preco, 
                    // precoDiaria: childItem.val().precoDiaria,
                    // precoSemanal: childItem.val().precoSemanal,
                    // precoMensal: childItem.val().precoMensal,
                    // subcategoria: childItem.val().subcategoria.nome, 
                    // categoria: childItem.val().categoria.nome,

                   
                };
                // console.log(snapshot);

                setDetalhes(data);
            
            })
                setLoading(false)
            
        }
        getDetalhes();
    }, []);
 
    // console.log('proprietario')
    // console.log(proprietario);
    // console.log('produto')
    // console.log(produto);
    // console.log('interessado')
    // console.log(interessado);

    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>       

                <SlideDetalhes/>

                <Text style={styles.titulo}>CAMINHÃO BAÚ - MK 12233</Text>
             
                <Text style={styles.condicao}>ALUGUEL</Text>

                <View style={styles.areaInteresse}>
                    <View>
                        <Text style={styles.contato}>CONTATO DO PROPRIETÁRIO</Text>
                        <Text style={styles.celular}>(66) *****-4875</Text>
                    </View>

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
                                    <Text style={styles.txtBtnModalProprietario} >VOCÊ É O PROPRIETÁRIO</Text>
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

                    <Text style={styles.local}>Local: Goiânia - GO</Text>
                </View>

                <View style={styles.areaPrecoGeral}>
                    <View style={styles.areaPreco}>
                        <Text style={styles.precoInfo}>Valor Diária: </Text>
                        <Text style={styles.preco}>R$ 500,00</Text>
                    </View>
                    <View style={styles.areaPreco}>
                        <Text style={styles.precoInfo}>Valor Semanal: </Text>
                        <Text style={styles.preco}>R$ 2500,00</Text>
                    </View>
                    <View style={styles.areaPreco}>
                        <Text style={styles.precoInfo}>Valor Mensal: </Text>
                        <Text style={styles.preco}>R$ 7000,00</Text>
                    </View>
                </View>

                <Text style={styles.tituloInfo}>INFORMAÇÕES BÁSICAS</Text>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>FABRICANTE</Text>
                        <Text style={styles.resultadoInfo}>VOLKSWAGEN</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>MODELO</Text>
                        <Text style={styles.resultadoInfo}>MK 12233</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>ANO</Text>
                        <Text style={styles.resultadoInfo}>2016</Text>
                    </View>
                </View>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>TIPO</Text>
                        <Text style={styles.resultadoInfo}>TOCO</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>TRAÇÃO</Text>
                        <Text style={styles.resultadoInfo}>4x2</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>CONSUMO MÉDIO</Text>
                        <Text style={styles.resultadoInfo}>20 KM/L</Text>
                    </View>
                </View>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>HODÔMETRO</Text>
                        <Text style={styles.resultadoInfo}>255555 KM</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>HORÍMETRO</Text>
                        <Text style={styles.resultadoInfo}>5550 HOR</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>SEGURO</Text>
                        <Text style={styles.resultadoInfo}>SIM</Text>
                    </View>
                </View>

                <Text style={styles.tituloInfo}>INFORMAÇÕES ADICIONAIS</Text>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>FABRICANTE BAÚ</Text>
                        <Text style={styles.resultadoInfo}>VOLKSWAGEN</Text>
                    </View>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>MODELO BAÚ</Text>
                        <Text style={styles.resultadoInfo}>MK 12233</Text>
                    </View>
                </View>

                <View style={[styles.areaInfoGeral, {marginBottom: 20}]}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>DIMENSÕES (M)</Text>
                        <Text style={styles.resultadoInfo}>5X5X5</Text>
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
        flex: 1,
    },
    titulo: {
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        paddingHorizontal: 10
    },
    areaInteresse: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    condicao: {
        color: '#ffa500',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 4,
    },
    contato: {
        color: '#222',
        fontSize: 14,
        marginTop: 15
    },
    celular: {
        textAlign: 'center',
        color: '#222',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 4
    },
    areaBtn: {
        height: 50,
        backgroundColor: '#ffa500',
        width: '45%',
        marginTop: 10,
        borderRadius: 5,
        justifyContent: 'center'
    },
    txtBtn: {
        color: '#fff', 
        fontSize: 16,
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
        fontSize: 18
    },
    areaPrecoGeral: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    areaPreco: {
        flexDirection: 'row',
        marginTop: 10
    },
    precoInfo: {
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold'
    },
    preco: {
        color: '#222',
        fontSize: 18,
    },
    tituloInfo: {
        color: '#ffa500',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 30
    },
    areaInfoGeral: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    areaInfo: {
        marginTop: 15
    },
    info: {
        color: '#222',
        fontSize: 18,
    },
    resultadoInfo: {
        color: '#ffa500',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 4
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
    txtBtnModalProprietario: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    areaBtnModalClose: {
        marginTop: 20,
        flexDirection: 'row-reverse'
    },
}) 