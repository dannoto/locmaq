import React, { useState, useEffect, useContext } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, Modal, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Swiper from 'react-native-swiper'

import SlideDetalhes from '../../components/SlideDetalhes';

export default ({route}) => {

    const { key } = route.params; 
    const { user, getImagens } = useContext(AuthContext); 
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
    };

    
    function Desfavoritar() {
        setDesativado(!desativado) 
    }

    function Favoritar() {
        setAtivado(!ativado)
    }
   
    useEffect(() => {
        async function getDetalhes() {
             await firebase.database().ref('equipamentos').child(key).once('value')
            .then(function(snapshot) {
                setProprietario({nome:snapshot.val().usuario.nome, codigo:snapshot.val().usuario.key})
             
                let data = {
                    key: snapshot.key,
                    condicao: snapshot.val().condicao.nome,
                    fabricante: snapshot.val().fabricante,
                    ano: snapshot.val().ano,
                    modelo: snapshot.val().modelo,
                    tipo: snapshot.val().tipo.nome,
                    tracao: snapshot.val().tracao.nome,
                    caracteristica: snapshot.val().caracteristica.nome,
                    peso: snapshot.val().peso,
                    consumo: snapshot.val().consumo, 
                    hodometro: snapshot.val().hodometro, 
                    horimetro: snapshot.val().horimetro,
                    capacidade: snapshot.val().capacidade, 
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais, 
                    estado: snapshot.val().estado.key, 
                    cidade: snapshot.val().cidade.nome,
                    preco: snapshot.val().preco, 
                    precoDiaria: snapshot.val().precoDiaria,
                    precoSemanal: snapshot.val().precoSemanal,
                    precoMensal: snapshot.val().precoMensal,
                    subcategoria: snapshot.val().subcategoria.nome, 
                    categoria: snapshot.val().categoria.nome,
                    codigoProduto: snapshot.val().codigoProduto,
                    imagem0:snapshot.val().imagem0,
                    imagem1:snapshot.val().imagem1,
                    imagem2:snapshot.val().imagem2,
                    imagem3:snapshot.val().imagem3,
                    imagem4:snapshot.val().imagem4,
                    imagem5:snapshot.val().imagem5,
                };
                setDetalhes(data);
            })
        }

      

        getDetalhes();
     
    }, []);

   
console.log(typeof(detalhes.imagem0))

         
 
   
    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>       

            <Text>URL DA IMAGENS</Text>
            <Text>{detalhes.imagem0}</Text>
            <Text>{detalhes.imagem1}</Text>
            <Text>{detalhes.imagem2}</Text>
            <Text>{detalhes.imagem3}</Text>
            <Text>{detalhes.imagem4}</Text>
            <Text>{detalhes.imagem5}</Text>

                    <Swiper
                style={styles.wrapper}
                autoplay={true}
                autoplayTimeout={4}
                loop={true}
                dotStyle={{
                    backgroundColor: '#000',
                    borderColor: '#000',
                    width: 10,
                    height: 10,
                    borderRadius: 10
                }}
                activeDotColor='#ffa500'
                activeDotStyle={{
                    borderColor: '#000',
                    borderWidth: 1,
                    width: 10,
                    height: 10,
                    borderRadius: 10
                }} >

                    <View style={styles.slide}>
                        <Image style={styles.img} source={require('../../assets/caminhao.jpg')}/>
                    </View> 
                  
                     { !detalhes.imagem0?

                        ( 
                            ''
                        ):
                        (
                            <View style={styles.slide}>
                            <Image style={styles.img} source={{uri:detalhes.imagem0}}/>
                        </View>  
                        )

                    }

                    { !detalhes.imagem1 ?
                        (
                                   ''
                        ):
                        (
                            <View style={styles.slide}>
                                <Image style={styles.img} source={{uri:detalhes.imagem1}}/>
                            </View>  
                        )
                    }
                     { !detalhes.imagem2 ?
                        (
                                   ''
                        ):
                        (
                            <View style={styles.slide}>
                                <Image style={styles.img} source={{uri:detalhes.imagem2}}/>
                            </View>  
                        )
                    }

                    { !detalhes.imagem3 ?
                        (
                                   ''
                        ):
                        (
                            <View style={styles.slide}>
                                <Image style={styles.img} source={{uri:detalhes.imagem3}}/>
                            </View>  
                        )
                    }

                    { !detalhes.imagem4 ?
                        (
                                   ''
                        ):
                        (
                            <View style={styles.slide}>
                                <Image style={styles.img} source={{uri:detalhes.imagem4}}/>
                            </View>  
                        )
                    }

                    { !detalhes.imagem5 ?
                        (
                                   ''
                        ):
                        (
                            <View style={styles.slide}>
                                <Image style={styles.img} source={{uri:detalhes.imagem5}}/>
                            </View>  
                        )
                    }
                 
                    
             </Swiper>     
               
     

                <View style={styles.areaFavorito}>

                    {/* <Image style={{width: 100, height: 100}} source={{uri: imagem1}}/> */}

                    <View style={styles.areaTitulo}>
                        <Text style={styles.titulo}>{detalhes.subcategoria} - {detalhes.modelo}</Text>
                    </View>

                    
                        {ativado === false ?
                            (
                                <TouchableOpacity onPress={Desfavoritar}>
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
             
                <Text style={styles.condicao}>{detalhes.condicao}</Text>

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

                    <Text style={styles.local}>Local: {detalhes.cidade} - {detalhes.estado}</Text>
                </View>

                {detalhes.condicao == 'VENDA' ?
                    (
                        <View style={styles.areaPrecoGeral}>
                            <View style={styles.areaPreco}>
                                <Text style={styles.precoInfo}>Valor: </Text>
                                <Text style={styles.preco}>{detalhes.preco}</Text>
                            </View>
                        </View>
                    ) :
                    (
                        <View style={styles.areaPrecoGeral}>
                            <View style={styles.areaPreco}>
                                <Text style={styles.precoInfo}>Valor Diária: </Text>
                                <Text style={styles.preco}>{detalhes.precoDiaria}</Text>
                            </View>

                            {!detalhes.precoSemanal ?
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor Semanal: </Text>
                                        <Text style={styles.preco}>-</Text>
                                    </View>
                                ) :
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor Semanal: </Text>
                                        <Text style={styles.preco}>{detalhes.precoSemanal}</Text>
                                    </View>
                                )
                            }

                            {!detalhes.precoMensal ?
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor Mensal: </Text>
                                        <Text style={styles.preco}>-</Text>
                                    </View>
                                ) :
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor Mensal: </Text>
                                        <Text style={styles.preco}>{detalhes.precoMensal}</Text>
                                    </View>
                                )
                            }
                        </View>
                    )
                }

                <View style={styles.areaCategoriaGeral}>
                    <View style={styles.areaCategoria}>
                        <Text style={styles.categoriaInfo}>CATEGORIA: </Text>
                        <Text style={styles.categoria}>{detalhes.categoria}</Text>
                    </View>
                </View>

                <Text style={styles.tituloInfo}>INFORMAÇÕES BÁSICAS</Text>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>FABRICANTE</Text>
                        <Text style={styles.resultadoInfo}>{detalhes.fabricante}</Text>
                    </View>

                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>MODELO</Text>
                        <Text style={styles.resultadoInfo}>{detalhes.modelo}</Text>
                    </View>
                </View>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>ANO</Text>
                        <Text style={styles.resultadoInfo}>{detalhes.ano}</Text>
                    </View>

                    {!detalhes.capacidade ?
                        (
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>CAPACIDADE</Text>
                                <Text style={styles.resultadoInfo}>-</Text>
                            </View> 
                        ) :
                        (
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>CAPACIDADE</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.capacidade} TON</Text>
                            </View> 
                        )
                    }
                </View>

                {detalhes.categoria == 'Caminhões' ?
                    (
                        <View style={styles.areaInfoGeral}>
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>TIPO</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.tipo}</Text>
                            </View>

                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>TRAÇÃO</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.tracao}</Text>
                            </View>
                        </View>
                    ) :
                    (
                        false
                    )
                }

                {detalhes.categoria !== 'Britadores' ?
                    (
                        <View style={styles.areaInfoGeral}>
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>HODÔMETRO</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.hodometro} KM</Text>
                            </View>

                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>HORÍMETRO</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.horimetro} HOR</Text>
                            </View>
                        </View>
                    ) :
                    (
                        false
                    )
                }

                {detalhes.categoria == 'Britadores' ?
                    (
                        <View style={styles.areaInfoGeral}>
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>PESO OPERACIONAL</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.peso} TON</Text>
                            </View>

                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>CARACTERÍSTICA</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.caracteristica}</Text>
                            </View>
                        </View>
                    ) :
                    (
                        false
                    )
                }

                <View style={styles.areaInfoGeral}>
                    {!detalhes.consumo ?
                        (
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                <Text style={styles.resultadoInfo}>-</Text>
                            </View>
                        ) :
                        (
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.consumo + ' KM/L'}</Text>
                            </View>
                        )
                    }
                    
                    {!detalhes.potencia ?
                        (
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>POTÊNCIA</Text>
                                <Text style={styles.resultadoInfo}>-</Text>
                            </View>
                        ) :
                        (
                            <View style={styles.areaInfo}>
                                <Text style={styles.info}>POTÊNCIA</Text>
                                <Text style={styles.resultadoInfo}>{detalhes.potencia} CV</Text>
                            </View>
                        )
                    }
                </View>

                <View style={styles.areaInfoGeral}>
                    <View style={styles.areaInfo}>
                        <Text style={styles.info}>SEGURO</Text>
                        <Text style={styles.resultadoInfo}>{detalhes.seguro}</Text>
                    </View>
                </View>

                {!detalhes.infoAdicionais ?
                    (
                        false
                    ) :
                    (
                        <View>
                            <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                            <View style={styles.areaInfoGeral}>
                                <Text style={styles.resultadoInfo}>{detalhes.infoAdicionais}</Text>
                            </View>
                        </View>
                    )
                }    
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
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
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
        paddingHorizontal: 10
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
        fontSize: 17,
        textTransform: 'uppercase'
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
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    preco: {
        color: '#ffa500',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    areaCategoriaGeral: {
        marginTop: 10,
        paddingHorizontal: 10
    },
    areaCategoria: {
        flexDirection: 'row',
        marginTop: 10
    },
    categoriaInfo: {
        color: '#222',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    categoria: {
        color: '#ffa500',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    tituloInfo: {
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 30,
        marginBottom: 15,
        textTransform: 'uppercase'
    },
    tituloInfoAdicionais: {
        color: '#222',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 15,
        textTransform: 'uppercase'
    },
    areaInfoGeral: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    areaInfo: {
        width: '50%'
    },
    info: {
        color: '#222',
        fontSize: 18,
        textTransform: 'uppercase'
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
    wrapper: {
        height: 350
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    img: {
        width: '100%',
        resizeMode: 'cover'
    },
    color:{
        backgroundColor: '#ffa500'
    }
}) 