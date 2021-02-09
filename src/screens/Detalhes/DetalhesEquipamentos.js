import React, { useState, useEffect, useContext } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, Modal, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';

import SlideDetalhes from '../../components/SlideDetalhes';

export default ({route}) => {

    const { key } = route.params; 
    const { user } = useContext(AuthContext); 
    const navigation = useNavigation();
    const interessado = user.uid;
    const produto= key;
 
    const [detalhes, setDetalhes] = useState([]);
    const [detalhesBritador, setDetalhesBritador] = useState([]);
    const [detalhesCaminhao, setDetalhesCaminhao] = useState([]);
    const [detalhesCompactador, setDetalhesCompactador] = useState([]);
    const [detalhesEmpilhadeira, setDetalhesEmpilhadeira] = useState([]);
    const [detalhesEscavadeira, setDetalhesEscavadeira] = useState([]);
    const [detalhesGuindaste, setDetalhesGuindaste] = useState([]);
    const [detalhesManTelescopico, setDetalhesManTelescopico] = useState([]);
    const [detalhesMartHidraulico, setDetalhesMartHidraulico] = useState([]);
    const [detalhesPlataformaAerea, setDetalhesPlataformaAerea] = useState([]);
    const [detalhesTratores, setDetalhesTratores] = useState([]);
    const [detalhesUsinaAsfalto, setDetalhesUsinaAsfalto] = useState([]);
    const [detalhesUsinaConcreto, setDetalhesUsinaConcreto] = useState([]);
    const [detalhesPerfuratriz, setDetalhesPerfuratriz] = useState([]);
    const [keyFavorito, setkeyFavorito] = useState([]);
    const [modalvisible, setModalVisible] = useState(false);
    const [desativado, setDesativado] = useState('');
    const [ativado, setAtivado] = useState('');
    const [proprietario, setProprietario] = useState('');

    const keyProduto = key;
    const subcategoria = detalhes.subcategoria;
    const modelo = detalhes.modelo;
    const ano = detalhes.ano;
    const condicao = detalhes.condicao;
    const preco = detalhes.preco;
    const precoHora = detalhes.precoHora;
    const titulo = "";
    const imagem0 = detalhes.imagem0;
    
    useEffect(() => {
        async function getDetalhes() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                 
                setProprietario({nome:snapshot.val().usuario.nome, codigo:snapshot.val().usuario.key})
             
                let data = {
                    key: snapshot.key,
                    condicao: snapshot.val().condicao.nome,
                    fabricante: snapshot.val().fabricante,
                    ano: snapshot.val().ano,
                    modelo: snapshot.val().modelo,
                    estado: snapshot.val().estado.key, 
                    cidade: snapshot.val().cidade.nome,
                    preco: snapshot.val().preco, 
                    precoHora: snapshot.val().precoHora,
                    subcategoria: snapshot.val().subcategoria.nome, 
                    categoria: snapshot.val().categoria.nome,
                    codigoProduto: snapshot.val().codigoProduto,
                    imagem0: snapshot.val().imagem0
                };
                setDetalhes(data);

                if (data.categoria == "Britadores") {
                    getDetalhesBritador();
                } 
                else if (data.categoria == "Caminhões") {
                    getDetalhesCaminhao();
                }
                else if (data.categoria == "Compactadores") {
                    getDetalhesCompactador();
                }
                else if (data.categoria == "Empilhadeiras") {
                    getDetalhesEmpilhadeira();
                }
                else if (data.categoria == "Escavadeiras") {
                    getDetalhesEscavadeira();
                }
                else if (data.categoria == "Guindastes") {
                    getDetalhesGuindaste();
                }
                else if (data.categoria == "Manipuladores Telescópico") {
                    getDetalhesManipulador();
                }
                else if (data.categoria == "Martelos Hidraúlico") {
                    getDetalhesMartelo();
                }
                else if (data.categoria == "Plataformas Aérea") {
                    getDetalhesPlataforma();
                }
                else if (data.categoria == "Tratores") {
                    getDetalhesTrator();
                }
                else if (data.categoria == "Usinas de Asfalto") {
                    getDetalhesUsina();
                }
                else if (data.categoria == "Usinas de Concreto") {
                    getDetalhesUsinaConcreto();
                }
                else if (data.categoria == "Perfuratriz") {
                    getDetalhesPerfuratriz();
                }
            })
        }

        async function getDetalhesBritador() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataBritador = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    peso: snapshot.val().peso,
                    capacidade: snapshot.val().capacidade, 
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais, 
                };
                setDetalhesBritador(dataBritador);
            })
        }

        async function getDetalhesCaminhao() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataCaminhao = {
                    tipo: snapshot.val().tipo.nome,
                    tracao: snapshot.val().tracao.nome,
                    consumo: snapshot.val().consumo, 
                    hodometro: snapshot.val().hodometro, 
                    horimetro: snapshot.val().horimetro,
                    capacidade: snapshot.val().capacidade, 
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais, 
                };
                setDetalhesCaminhao(dataCaminhao);
            })
        }

        async function getDetalhesCompactador() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataCompactador = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    tipo: snapshot.val().tipo.nome,
                    motorizacao: snapshot.val().motorizacao.nome,
                    consumo: snapshot.val().consumo, 
                    peso: snapshot.val().peso,
                    horimetro: snapshot.val().horimetro,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesCompactador(dataCompactador);
            })
        } 

        async function getDetalhesEmpilhadeira() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataEmpilhadeira = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    tipo: snapshot.val().tipo.nome,
                    capacidade: snapshot.val().capacidade,
                    altura: snapshot.val().altura,
                    peso: snapshot.val().peso,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesEmpilhadeira(dataEmpilhadeira);
            })
        } 

        async function getDetalhesEscavadeira() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataEscavadeira = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    tipo: snapshot.val().tipo.nome,
                    tracao: snapshot.val().tracao.nome,
                    consumo: snapshot.val().consumo,
                    peso: snapshot.val().peso,
                    horimetro: snapshot.val().horimetro,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesEscavadeira(dataEscavadeira);
            })
        } 

        async function getDetalhesGuindaste() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataGuindaste = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    capacidade: snapshot.val().capacidade, 
                    lanca: snapshot.val().lanca,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesGuindaste(dataGuindaste);
            })
        } 

        async function getDetalhesManipulador() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataManipulador = {
                    consumo: snapshot.val().consumo,
                    peso: snapshot.val().peso, 
                    lanca: snapshot.val().lanca,
                    horimetro: snapshot.val().horimetro,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesManTelescopico(dataManipulador);
            })
        } 

        async function getDetalhesMartelo() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataMartelo = {
                    peso: snapshot.val().peso,  
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesMartHidraulico(dataMartelo);
            })
        } 

        async function getDetalhesPlataforma() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataPlataforma = {
                    caracteristica: snapshot.val().caracteristica.nome, 
                    capacidade: snapshot.val().capacidade,
                    altura: snapshot.val().altura,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais 
                };
                setDetalhesPlataformaAerea(dataPlataforma);
            })
        } 

        async function getDetalhesTrator() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataTrator = {
                    consumo: snapshot.val().consumo,
                    peso: snapshot.val().peso,
                    horimetro: snapshot.val().horimetro,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais
                };
                setDetalhesTratores(dataTrator);
            })
        } 

        async function getDetalhesUsina() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataUsina = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    capacidade: snapshot.val().capacidade,
                    peso: snapshot.val().peso,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais
                };
                setDetalhesUsinaAsfalto(dataUsina);
            })
        } 

        async function getDetalhesUsinaConcreto() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataUsinaConcreto = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    tipo: snapshot.val().tipo.nome,
                    capacidade: snapshot.val().capacidade,
                    peso: snapshot.val().peso,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais
                };
                setDetalhesUsinaConcreto(dataUsinaConcreto);
            })
        } 

        async function getDetalhesPerfuratriz() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                let dataPerfuratriz = {
                    caracteristica: snapshot.val().caracteristica.nome,
                    perfuracao: snapshot.val().perfuracao.nome,
                    peso: snapshot.val().peso,
                    potencia: snapshot.val().potencia, 
                    seguro: snapshot.val().seguro.nome, 
                    infoAdicionais: snapshot.val().infoAdicionais
                };
                setDetalhesPerfuratriz(dataPerfuratriz);
            })
        } 

        async function keyFavoritos() {
            await firebase.database().ref('users').child(user.uid).child('favoritos').on('value', (snapshot) => {
                setkeyFavorito([]);
        
                snapshot.forEach((childItem) => {
                    let data = {
                        keyProduto: childItem.val().keyProduto
                    };
        
                    setkeyFavorito(oldArray => [...oldArray, data]);
                })

            })
        } 

        getDetalhes();
        keyFavoritos();
    }, []);
    
    function CloseModal() { 
        setModalVisible(false)
    }

    async function Favoritar() {
        let favoritos = await firebase.database().ref('users').child(user.uid).child('favoritos');
        let chave = favoritos.push().key;
    
        favoritos.child(chave).set({
            keyProduto: keyProduto,
            subcategoria: subcategoria,
            modelo: modelo,
            ano: ano,
            condicao: condicao, 
            preco: preco,
            precoHora: precoHora,
            titulo: titulo,
            imagem0: imagem0
        });

        // if(detalhesFavoritos.keyProduto = keyProduto) {
        //     setDesativado(false)
        //     setAtivado(true)
        // }
        // else {
        //     setDesativado(true)
        //     setAtivado(false)
        // }
    }

    async function Desfavoritar() {
        setDesativado(true)
        setAtivado(false)

        await firebase.database().ref('users').child('favoritos').child(key).remove();
    }
   

    return (
        <ScrollView style={[styles.background, modalvisible ? {backgroundColor: '#fff', opacity: 0.1} : '']} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>  
            
                <SlideDetalhes data={produto}/>
                
                <View style={styles.areaFavorito}>

                    <View style={styles.areaTitulo}>
                        <Text style={styles.titulo}>{detalhes.subcategoria} - {detalhes.modelo}</Text>
                    </View>
                    
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
                            <TouchableOpacity onPress={Desfavoritar}>
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

                {detalhes.condicao == 'VENDA' ?
                    (
                        <View style={styles.areaPrecoGeral}>
                            {!detalhes.preco ?
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor: </Text>
                                        <Text style={styles.preco}>-</Text>
                                    </View>
                                ) :
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor: </Text>
                                        <Text style={styles.preco}>{detalhes.preco}</Text>
                                    </View>
                                )
                            }
                        </View>
                    ) :
                    (
                        <View style={styles.areaPrecoGeral}>
                            {!detalhes.precoHora ?
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor Hora: </Text>
                                        <Text style={styles.preco}>-</Text>
                                    </View>
                                ) :
                                (
                                    <View style={styles.areaPreco}>
                                        <Text style={styles.precoInfo}>Valor Hora: </Text>
                                        <Text style={styles.preco}>{detalhes.precoHora}</Text>
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

                {/* Detalhes Britadores */}
                {detalhes.categoria == "Britadores" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesBritador.caracteristica}</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesBritador.capacidade} TON/H</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesBritador.peso} TON</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesBritador.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesBritador.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesBritador.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesBritador.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Caminhões */}
                {detalhes.categoria == "Caminhões" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.consumo} KM/L</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>TIPO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.tipo}</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>TRAÇÃO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.tracao}</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>HODÔMETRO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.hodometro} KM</Text>
                                </View>

                                {!detalhesCaminhao.horimetro ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesCaminhao.horimetro} HOR</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.capacidade} TON</Text>
                                </View> 
                                
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.potencia} CV</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCaminhao.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesCaminhao.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesCaminhao.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Compactadores */}
                {detalhes.categoria == "Compactadores" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCompactador.peso} TON</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                {!detalhesCompactador.caracteristica ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>CARACTERÍSTICA</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>CARACTERÍSTICA</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesCompactador.caracteristica}</Text>
                                        </View>
                                    )
                                }

                                {!detalhesCompactador.tipo ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>TIPO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>TIPO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesCompactador.tipo}</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>MOTORIZAÇÃO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCompactador.motorizacao}</Text>
                                </View>

                                {!detalhesCompactador. consumo ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesCompactador.consumo} KM/L</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.areaInfoGeral}>
                                {!detalhesCompactador.horimetro ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesCompactador.horimetro} HOR</Text>
                                        </View>
                                    )
                                }

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCompactador.potencia} CV</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesCompactador.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesCompactador.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesCompactador.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Empilhadeiras */}
                {detalhes.categoria == "Empilhadeiras" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.caracteristica}</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>TIPO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.tipo}</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE DE CARGA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.capacidade} KG</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>ALTURA DE ELEVAÇÃO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.altura} M</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.peso} TON</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesEmpilhadeira.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesEmpilhadeira.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Escavadeiras */}
                {detalhes.categoria == "Escavadeiras" ? 
                    (
                        <View>
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

                                {!detalhesEscavadeira.caracteristica ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>CARACTERÍSTICA</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>CARACTERÍSTICA</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesEscavadeira.caracteristica}</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.areaInfoGeral}>
                                {!detalhesEscavadeira.tipo ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>TIPO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>TIPO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesEscavadeira.tipo}</Text>
                                        </View>
                                    )
                                }

                                {!detalhesEscavadeira.tracao ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>TRAÇÃO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>TRAÇÃO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesEscavadeira.tracao}</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEscavadeira.consumo} KM/L</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEscavadeira.peso} TON</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                {!detalhesEscavadeira.horimetro ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesEscavadeira.horimetro} HOR</Text>
                                        </View>
                                    )
                                }

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEscavadeira.potencia} CV</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesEscavadeira.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesEscavadeira.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesEscavadeira.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Guindastes */}
                {detalhes.categoria == "Guindastes" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesGuindaste.caracteristica}</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE DE CARGA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesGuindaste.capacidade} TON</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>ALCANCE DE LANÇA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesGuindaste.lanca} M</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesGuindaste.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesGuindaste.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesGuindaste.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesGuindaste.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Manipuladores Telescópico */}
                {detalhes.categoria == "Manipuladores Telescópico" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesManTelescopico.consumo} KM/L</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesManTelescopico.peso} TON</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>ALCANCE DE LANÇA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesManTelescopico.lanca} M</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                {!detalhesManTelescopico.horimetro ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesManTelescopico.horimetro} HOR</Text>
                                        </View>
                                    )
                                }

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesManTelescopico.potencia} CV</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesManTelescopico.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesManTelescopico.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesManTelescopico.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Martelos Hidraúlico */}
                {detalhes.categoria == "Martelos Hidraúlico" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesMartHidraulico.peso} TON</Text>
                                </View>  
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesMartHidraulico.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesMartHidraulico.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesMartHidraulico.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Plataformas Aérea */}
                {detalhes.categoria == "Plataformas Aérea" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPlataformaAerea.caracteristica}</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE DE CARGA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPlataformaAerea.capacidade} TON</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>ALTURA DE TRABALHO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPlataformaAerea.altura} M</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPlataformaAerea.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPlataformaAerea.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesPlataformaAerea.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesPlataformaAerea.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Perfuratriz */}
                {detalhes.categoria == "Perfuratriz" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPerfuratriz.caracteristica}</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PERFURAÇÃO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPerfuratriz.perfuracao}</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPerfuratriz.peso} TON</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPerfuratriz.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesPerfuratriz.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesPerfuratriz.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesPerfuratriz.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Tratores */}
                {detalhes.categoria == "Tratores" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CONSUMO MÉDIO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesTratores.consumo} KM/L</Text>
                                </View> 
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesTratores.peso} KG</Text>
                                </View> 

                                {!detalhesTratores.horimetro ?
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>-</Text>
                                        </View>
                                    ) :
                                    (
                                        <View style={styles.areaInfo}>
                                            <Text style={styles.info}>HORÍMETRO</Text>
                                            <Text style={styles.resultadoInfo}>{detalhesTratores.horimetro} HOR</Text>
                                        </View>
                                    )
                                }
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesTratores.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesTratores.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesTratores.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesTratores.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Usinas de Asfalto */}
                {detalhes.categoria == "Usinas de Asfalto" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaAsfalto.caracteristica}</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE DE PRODUÇÃO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaAsfalto.capacidade} TON/H</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaAsfalto.peso} KG</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaAsfalto.potencia} CV</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaAsfalto.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesUsinaAsfalto.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesUsinaAsfalto.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
                    )
                }

                {/* Detalhes Usinas de Concreto */}
                {detalhes.categoria == "Usinas de Concreto" ? 
                    (
                        <View>
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

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CARACTERÍSTICA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.caracteristica}</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>TIPO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.tipo}</Text>
                                </View> 

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>CAPACIDADE DE PRODUÇÃO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.capacidade} M3/H</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>PESO OPERACIONAL</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.peso} KG</Text>
                                </View>

                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>POTÊNCIA</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.potencia} CV</Text>
                                </View>
                            </View>

                            <View style={styles.areaInfoGeral}>
                                <View style={styles.areaInfo}>
                                    <Text style={styles.info}>SEGURO</Text>
                                    <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.seguro}</Text>
                                </View>
                            </View>

                            {!detalhesUsinaConcreto.infoAdicionais ?
                                (
                                    false
                                ) :
                                (
                                    <View>
                                        <Text style={styles.tituloInfoAdicionais}>INFORMAÇÕES ADICIONAIS</Text>

                                        <View style={styles.areaInfoGeral}>
                                            <Text style={styles.resultadoInfo}>{detalhesUsinaConcreto.infoAdicionais}</Text>
                                        </View>
                                    </View>
                                )
                            }    
                        </View>                        
                    ) :
                    (
                        false
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
    condicao: {
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
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 30,
        marginBottom: 15,
        textTransform: 'uppercase'
    },
    tituloInfoAdicionais: {
        color: '#222',
        fontSize: 18,
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
        fontSize: 16,
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