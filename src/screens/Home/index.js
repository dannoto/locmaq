import React, {useState, useEffect } from 'react';
import { Platform, StyleSheet, ScrollView, KeyboardAvoidingView, View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import { set } from 'react-native-reanimated';
import CategoriesHome from '../../components/CategoriesHome';
import firebase from '../../services/firebaseConnection';

export default () => {

    const navigation = useNavigation();

    const [categorias, setCategorias] = useState([]);
    const [loadingCat, setLoadingCat] = useState(true);

    // Buscando Categorias
    useEffect(() => {
        async function getCategories() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategorias([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        name: childItem.val().categoria,
                        imagem: childItem.val().imagem
                    };

                    setCategorias(oldArray => [...oldArray, data]);

                })

                setLoadingCat(false)
            })
        }

        getCategories();
    }, []);


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

                    <TouchableOpacity style={styles.areaBtn}>
                        
                        <Text style={styles.location}>Informar localização</Text>

                        <FontAwesome
                            name='sort-desc'
                            size= {22}
                            color="#222"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.categorias}>
                    {loadingCat ?
                        (
                            <ActivityIndicator size={"large"} color={"#222"}/>
                        ) :
                        (
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={categorias}
                                renderItem={({item}) => (<CategoriesHome data={item}/>)}
                                keyExtractor={item => item.key}
                            />
                        )
                    }
                </View>

                <View style={styles.areaFiltros}>
                    <TouchableOpacity>
                        <Text style={styles.txtFiltros}>Todos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.txtFiltros}>Aluguel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.txtFiltros}>Vendas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.txtFiltros}>Serviços</Text>
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
    areaFiltros: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    txtFiltros: {
        fontSize: 18,
        color: '#222',
        fontWeight: 'bold',
        marginTop: 10
    }
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