import React, { useState, useEffect } from 'react';
import { Platform, ScrollView, KeyboardAvoidingView, View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import firebase from '../../services/firebaseConnection';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Categories from '../../components/Categories';

export default () => {

    const [categorias, setCategorias] = useState([]);
    const [search, setSearch] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingCat, setLoadingCat] = useState(true);
    const [emptyList, setEmptyList] = useState(false);
    const [list, setList] = useState([]);

    // Buscando Categorias
    useEffect(() => {
        async function getCategories() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategorias([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        nome: childItem.val().categoria,
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
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>               

                <View style={styles.header}>
                    <EvilIcons
                        name='search'
                        size= {30}
                        color="#222"
                    />

                    <TextInput 
                        style={{color: '#222', fontSize: 18, marginLeft: 10}}
                        placeholder="O que você está procurando?"
                        placeholderTextColor= "#777"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        keyboardType={'default'}
                        returnKeyType="search"
                        autofocus
                        selectTextOnFocus
                    />      
                    
                    {/* <TouchableOpacity style={{justifyContent: 'space-evenly'}}>
                        <EvilIcons
                            name='close'
                            size= {30}
                            color="#222"
                        />
                    </TouchableOpacity> */}
                </View>

                {/* <View>
                    {loading &&
                        <ActivityIndicator size={"large"} color={"#ffffff"}/>
                    }
                    {emptyList &&
                        <Text>Nenhum resultado encontrado!</Text>
                    }
                    
                </View> */}

                <View style={styles.areaCategorias}>
                    <Text style={styles.tituloCat}>SELECIONE A CATEGORIA</Text>
                    {loadingCat ?
                        (
                            <ActivityIndicator style={{marginTop: 20}} size={"large"} color={"#222"}/>
                        ) :
                        (
                            <FlatList
                                data={categorias.sort((a,b) => a.nome.localeCompare(b.nome))}
                                renderItem={({item}) => (<Categories data={item}/>)}
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
    areaCategorias: {
        flex: 1,
        justifyContent: 'center'
    },
    tituloCat: {
        color: '#222',
        fontSize: 18,
        marginTop: 10,
        paddingBottom: 20,
        paddingLeft: 20, 
        borderBottomWidth: 2,
        borderColor: '#ddd'
    }
})