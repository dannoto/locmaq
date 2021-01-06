import React, {useState, useEffect } from 'react';
import { Platform, StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { set } from 'react-native-reanimated';
import firebase from '../../services/firebaseConnection';
import Recentes from '../../components/Recentes';
import FiltroHome from '../../components/FiltroHome';

export default () => {

    const navigation = useNavigation();

    const [categorias, setCategorias] = useState([]);
    const [loadingCat, setLoadingCat] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [destaques, setDestaques] = useState([]);
    const [condicao, setCondicao] = useState([]);


    const [coordenadas, setCoordenadas] = useState();

    // Localização do Usuário.
    const [json, setJson] = useState();
    const [estado, setEstado] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();

   


    const handleLocation = async () => {
      
        let result = await request(
            Platform.OS === 'ios' ?
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            :
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

      
        if (result == 'granted') {

            Geolocation.getCurrentPosition((info) => {

                setCoordenadas(null)
            
                 var base_url = 'http://api.positionstack.com/v1/reverse?access_key=';
                 // var latitude = info.coords.latitude;
                 // var longitude = info.coords.longitude;
                 var latitude =  -16.8098994
                 var longitude = -49.3125790
                 var key = '9ea96881c31e67477314c1f574b77f3b';
                          
            fetch(base_url+key+'&query='+latitude+','+longitude+'&limit=1')
            .then((r)=>r.json())
            .then((json)=>{
                setJson(json)
            });
               
                setEstado(json.data[0].region_code)
                setCidade(json.data[0].locality)
                setCep(json.data[0].postal_code)
                 
            })
        } else {
            
                setEstado('GO')
                setCidade('Goiânia')
                setCep('74957720')

                console.log(estado)
                console.log(cidade)
                console.log(cep)
           
        }
    }
  


    // Buscando Categorias
    useEffect(() => {
        async function getCategories() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategorias([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: childItem.val().nome,
                        imagem: childItem.val().imagem
                    };

                    setCategorias(oldArray => [...oldArray, data]);

                })

                setLoadingCat(false);
                condAluguel(); 
            })
        }

        getCategories();
    }, []);


   
        async function condAluguel(estado) {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCondicao([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: 'ALUGUEL',
                        imagem: childItem.val().imagem
                    };

                    setCondicao(oldArray => [...oldArray, data]);

                })
            })
        }

          async function condVendas(estado) {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCondicao([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: 'VENDAS',
                        imagem: childItem.val().imagem
                    };

                    setCondicao(oldArray => [...oldArray, data]);

                })

               
            })
        }

      

         async function condServicos(estado) {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCondicao([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: 'SERVICOS',
                        imagem: childItem.val().imagem
                    };

                    setCondicao(oldArray => [...oldArray, data]);

                })

                
            })
        }




    return (
        <ScrollView style={styles.background} showsVerticalIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>               

                <View style={styles.header}>
                    <EvilIcons
                        name='location'
                        size= {30}
                        color="#222"
                    />

                    <TouchableOpacity style={styles.areaBtn}  onPress={handleLocation}>
                        
                        <Text style={styles.location}>Informar localização</Text>
                             
                        <Text style={styles.location}>{setEstado}</Text>

                        <FontAwesome
                            name='sort-desc'
                            size= {22}
                            color="#222"
                        />
                    </TouchableOpacity>
                    


                </View>

                <View style={styles.areaRecentes}>
                    <Text style={styles.txtRecentes}>MAIS RECENTES</Text>
                    
                    {loadingCat ?
                        (
                            <ActivityIndicator size={"large"} color={"#222"}/>
                        ) :
                        (
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={categorias}
                                renderItem={({item}) => (<Recentes data={item}/>)}
                                keyExtractor={item => item.key}
                            />
                        )
                    }
                </View>

                <View style={styles.areaFiltros}>
              
                    <TouchableOpacity>
                        <Text style={styles.txtFiltros} onPress={condAluguel} >ALUGUEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.txtFiltros} onPress={condVendas} >VENDAS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.txtFiltros} onPress={condServicos} >SERVIÇOS</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.produtos}>
                    
                    {loadingCat ?
                        (
                            <ActivityIndicator size={"large"} color={"#222"}/>
                        ) :
                        (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                data={condicao}
                                numColumns={2}
                                renderItem={({item}) => (<FiltroHome data={item}/>)}
                                keyExtractor={item => item.key}
                            />
                        )
                    }
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
        height: 55,
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
    location: {
        color: '#222',
        fontSize: 18,
        paddingLeft: 5,
        paddingRight: 10
    },
    areaBtn: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
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
        fontSize: 19,
        color: '#ffa500',
        fontWeight: 'bold',
        paddingHorizontal: 10,
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
        fontSize: 19,
        color: '#222',
        fontWeight: 'bold',
        marginTop: 25
    },
})

// import React, {useState} from 'react';
// import { Platform } from 'react-native';
// import { Background, Container, HeaderArea, HeaderTitle, SearchButton, LocationArea, LocationInput, IconButton, LoadingIcon } from './styles';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../../contexts/auth';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { request, PERMISSIONS } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import { set } from 'react-native-reanimated';

// export default () => {

//     const navigation = useNavigation();

//     const [locationText, setLocationText] = useState('');
//     const [coords, setCoords] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [list, setList] = useState([]);

//     const handleLocation = async () => {
//         setCoords(null);
//         let result = await request(
//             Platform.OS === 'ios' ?
//             PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
//             :
//             PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//         );

//         if (result == 'granted') {

//             setLoading(true);
//             setLocationText('');
//             setList([]);

//             Geolocation.getCurrentPosition((info) => {
//                 setCoords(info.coords);
//                 getInfo();
//                 // console.log(info);
//             })
//         }
//     }

//     const get = () => {}

//     return (
//         <Background>
//             <Container
//             behavior={Platform.OS === 'ios' ? 'padding' : ''}
//             enabled
//             >
//                 <HeaderArea>
//                     <HeaderTitle numberOfLines={2}>O que você está procurando?</HeaderTitle>
//                     <SearchButton onPress={()=>navigation.navigate('Search')}>
//                         <EvilIcons
//                         name='search'
//                         size= {35}
//                         color="#222"
//                         />
//                     </SearchButton>
//                 </HeaderArea>

//                 <LocationArea>
//                     <LocationInput
//                      placeholder="Onde você está?"
//                      placeholderTextColor="#d2d2d2"
//                      value={locationText}
//                      onChangeText={t => setLocationText(t)}
//                     />

//                     <IconButton onPress={handleLocation}>
//                         <MaterialIcons
//                         name='gps-fixed'
//                         size= {28}
//                         color="#222"
//                         />
//                     </IconButton>
//                 </LocationArea>

//                 {loading &&
//                 <LoadingIcon size="large" color="#222"/>
//                 }
    
//             </Container>
//         </Background>
//     );
// }