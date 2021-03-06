import React, {useState, useEffect, useContext } from 'react';
import { Platform, StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import firebase from '../../services/firebaseConnection';
import Recentes from '../../components/Recentes';
import { AuthContext } from '../../contexts/auth';

import FiltroHome from '../../components/FiltroHome';
import FiltroHomeServicos from '../../components/FiltroHomeServicos';

export default () => {

    const navigation = useNavigation();
    const { user } = useContext( AuthContext );

    const [produtos, setProdutos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [destaques, setDestaques] = useState([]);
    const [condicao, setCondicao] = useState([]);
    const [condicaoServicos, setCondicaoServicos] = useState([]);
    const [coordenadas, setCoordenadas] = useState();

    const recentes = produtos.concat(servicos)

    // Localização do Usuário.
    const [json, setJson] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();

    // Lat e Long
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    // Buscando Produtos
    useEffect(() => {
        async function handleLocation() {
            let result = await request(
                Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
    
            if (result == 'granted') {
                 Geolocation.getCurrentPosition((info) => {
                    setCoordenadas(null)
                
                    //  var latitude = info.coords.latitude;
                    //  var longitude = info.coords.longitude;
                    var latitude =  -16.8098994;
                    var longitude = -49.3125790;

                    setLat(latitude);
                    setLong(longitude);
                });
            } 
        }

        async function getProdutos() {
            await firebase.database().ref('equipamentos').on('value', (snapshot) => {
                setProdutos([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        subcategoria: childItem.val().subcategoria.nome,
                        condicao: childItem.val().condicao.nome,
                        fabricante: childItem.val().fabricante,
                        ano: childItem.val().ano,
                        modelo: childItem.val().modelo,
                        preco: childItem.val().preco,
                        precoHora: childItem.val().precoHora,
                        imagem0: childItem.val().imagem0
                    };

                    setProdutos(oldArray => [...oldArray, data].reverse());
                })
                setLoading(false);
                condAluguel(); 
            })
        }

        async function getServicos() {
            await firebase.database().ref('servicos').on('value', (snapshot) => {
                setServicos([]);
    
                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        subcategoria: childItem.val().subcategoria.nome,
                        titulo: childItem.val().titulo,
                        condicao: childItem.val().condicao,
                        imagem0: childItem.val().imagem0
                    };
    
                    setServicos(oldArray => [...oldArray, data].reverse());
                })
            })
        }

        getProdutos();
        getServicos();
        handleLocation();
    }, []);

    async function buscaEndereco() {
        if (lat == "" || long == "") {
            let result = await request( Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        
            if (result == 'granted') {
                Geolocation.getCurrentPosition((info) => {
                    setCoordenadas(null)
                
                    //  var latitude = info.coords.latitude;
                    //  var longitude = info.coords.longitude;
                    var latitude =  -16.8098994;
                    var longitude = -49.3125790;

                    setLat(latitude);
                    setLong(longitude);

                    var base_url = 'http://api.positionstack.com/v1/reverse?access_key=';
                    var key = '9ea96881c31e67477314c1f574b77f3b';
            
                    fetch(base_url+key+'&query='+lat+','+long+'&limit=1')
                    .then((r)=>r.json())
                    .then((json)=>{
                        setEstado(json.data[0].region_code)
                        setCidade(json.data[0].locality)
                        setCep(json.data[0].postal_code)
                    });    
                });
            } 

        } else {
            var base_url = 'http://api.positionstack.com/v1/reverse?access_key=';
            var key = '9ea96881c31e67477314c1f574b77f3b';
    
            fetch(base_url+key+'&query='+lat+','+long+'&limit=1')
            .then((r)=>r.json())
            .then((json)=>{
                setEstado(json.data[0].region_code)
                setCidade(json.data[0].locality)
                setCep(json.data[0].postal_code)
            });
        }
    }

    async function condAluguel(estado) {
        await firebase.database().ref('equipamentos').on('value', (snapshot) => {
            setCondicao([]);

            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    subcategoria: childItem.val().subcategoria.nome,
                    condicao: childItem.val().condicao.nome,
                    fabricante: childItem.val().fabricante,
                    ano: childItem.val().ano,
                    modelo: childItem.val().modelo,
                    preco: childItem.val().preco,
                    precoHora: childItem.val().precoHora,
                    imagem0: childItem.val().imagem0
                };

                setCondicao(oldArray => [...oldArray, data].reverse());
            })
        })
    }

    async function condVendas(estado) {
        await firebase.database().ref('equipamentos').on('value', (snapshot) => {
            setCondicao([]);

            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    subcategoria: childItem.val().subcategoria.nome,
                    condicao: childItem.val().condicao.nome,
                    fabricante: childItem.val().fabricante,
                    ano: childItem.val().ano,
                    modelo: childItem.val().modelo,
                    preco: childItem.val().preco,
                    precoHora: childItem.val().precoHora,
                    imagem0: childItem.val().imagem0
                };

                setCondicao(oldArray => [...oldArray, data].reverse());
            })
        })
    }

    async function condServicos(estado) {
        await firebase.database().ref('servicos').on('value', (snapshot) => {
            setCondicaoServicos([]);

            snapshot.forEach((childItem) => {
                let data = {
                    key: childItem.key,
                    subcategoria: childItem.val().subcategoria.nome,
                    titulo: childItem.val().titulo,
                    condicao: childItem.val().condicao,
                    imagem0: childItem.val().imagem0
                };

                setCondicaoServicos(oldArray => [...oldArray, data].reverse());
            })
        })
    }

    return (   
        <View style={styles.background}>
            <SafeAreaView>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.btn} onPress={buscaEndereco}>
                        { !estado ?
                            (
                                <Text style={styles.location}>BUSQUE PELA LOCALIZAÇÃO</Text>
                            )
                            :
                            (
                                <Text style={styles.location}>{cidade} - {estado}</Text>
                            )
                        }
                        
                        <MaterialIcons
                        name='gps-fixed'
                        size= {30}
                        color="#222"
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false}>
                <KeyboardAvoidingView style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : ''}
                enabled> 

                    <View style={styles.areaRecentes}>
                        <Text style={styles.txtRecentes}>MAIS RECENTES DO BRASIL</Text>

                        {loading ?
                            (
                                <ActivityIndicator style={{marginTop: 15}} size={"large"} color={"#222"}/>
                            ) :
                            (
                                <SafeAreaView>
                                    <View>
                                        <FlatList
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            showsVerticalScrollIndicator={false}
                                            data={recentes}
                                            renderItem={({item}) => (<Recentes data={item}/>)}
                                            keyExtractor={item => item.key}
                                        />
                                    </View>
                                </SafeAreaView>
                            )
                        } 
                    </View>

                    <View style={styles.areaFiltros}>
                        <TouchableOpacity>
                            <Text style={styles.txtFiltros} onPress={condAluguel}>ALUGUEL</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.txtFiltros} onPress={condVendas}>VENDAS</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.txtFiltros} onPress={condServicos}>SERVIÇOS</Text>
                        </TouchableOpacity>
                    </View>

                    <SafeAreaView style={styles.produtos}>
                        
                        {loading ?
                            (
                                <ActivityIndicator style={{marginTop: 15}} size={"large"} color={"#222"}/>
                            ) :
                            (
                                <SafeAreaView>
                                    {condicao == "" ? 
                                        (
                                            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 50}}>
                                                <MaterialCommunityIcons
                                                    name='folder-alert-outline'
                                                    size= {90}
                                                    color='#d2d2d2'
                                                />
                                                <Text style={{color: '#707070', fontSize: 17, marginTop: 10}}>NENHUM EQUIPAMENTO ENCONTRADO!</Text>
                                            </View>
                                        ) :
                                        (
                                            <View>
                                                {condAluguel ?
                                                    (
                                                        <FlatList
                                                            showsHorizontalScrollIndicator={false}
                                                            showsVerticalScrollIndicator={false}
                                                            data={condicao}
                                                            renderItem={({item}) => (<FiltroHome data={item}/>)}
                                                            keyExtractor={item => item.key}
                                                        />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                }

                                                {/* {condVendas ?
                                                    (
                                                        <FlatList
                                                            showsHorizontalScrollIndicator={false}
                                                            showsVerticalScrollIndicator={false}
                                                            data={condicao}
                                                            renderItem={({item}) => (<FiltroHome data={item}/>)}
                                                            keyExtractor={item => item.key}
                                                        />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                } */}

                                                {/* {condServicos ?
                                                    (
                                                        <FlatList
                                                            showsHorizontalScrollIndicator={false}
                                                            showsVerticalScrollIndicator={false}
                                                            data={condicaoServicos}
                                                            renderItem={({item}) => (<FiltroHomeServicos data={item}/>)}
                                                            keyExtractor={item => item.key}
                                                        />
                                                    ) :
                                                    (
                                                        null
                                                    )
                                                } */}
                                            </View>
                                        )
                                    }
                                </SafeAreaView>
                            )
                        }
                    </SafeAreaView>
                    
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    )
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
        backgroundColor: 'transparent',
        height: 50,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#222',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 5,
        marginHorizontal: 15
    },
    location: {
        marginTop: 3,
        fontSize: 18,
        color: '#222'
    },
    areaBtn: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btn: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    categorias: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    areaRecentes: {
        flex: 1,
    },
    txtRecentes: {
        fontSize: 18,
        color: '#ffa500',
        fontWeight: 'bold',
        paddingHorizontal: 10,
        marginTop: 15,
        marginBottom: 15
    },
    areaFiltros: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    txtFiltros: {
        fontSize: 18,
        color: '#222',
        fontWeight: 'bold',
        marginTop: 25
    }
})