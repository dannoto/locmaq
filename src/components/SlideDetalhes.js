import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import firebase from '../services/firebaseConnection';
import Swiper from 'react-native-swiper';

export default function SlideDetalhes({data}) {

    const [imagens, setImagens] = useState([]);
    const key = data;
    const i1 = imagens.imagem0
    const i2 = imagens.imagem1
    const i3 = imagens.imagem2
    const i4 = imagens.imagem3
    const i5 = imagens.imagem4
    const i6 = imagens.imagem5

    useEffect(() => {
        async function getImagens() {
            await firebase.database().ref('equipamentos').child(key).on('value', (snapshot) => {
                setImagens([]);

                    let fotos = {
                        key: snapshot.key,
                        imagem0: snapshot.val().imagem0,
                        imagem1: snapshot.val().imagem1,
                        imagem2: snapshot.val().imagem2,
                        imagem3: snapshot.val().imagem3,
                        imagem4: snapshot.val().imagem4,
                        imagem5: snapshot.val().imagem5
                    };
                    
                setImagens(fotos);
            })
        }
        getImagens();
    }, []);
    
    return (
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
        }}
        >
            
            <View style={styles.slide}>
                <Image style={styles.img} source={{uri: i1}}/>
            </View>  

            {i2 == "" ?
                (
                    false
                ) :
                (
                <View style={styles.slide}>
                    <Image style={styles.img} source={{uri: i2}}/>
                </View>
                )  
            }

            {i3 == ""  ?
                (
                    false
                ) :
                (
                    <View style={styles.slide}>
                        <Image style={styles.img} source={{uri: i3}}/>
                    </View>
                )  
            }

            {i4 == "" ?
                (
                    false
                ) :
                (
                    <View style={styles.slide}>
                        <Image style={styles.img} source={{uri: i2}}/>
                    </View>
                )  
            }

            {i5 == ""  ?
                (
                    false
                ) :
                (
                    <View style={styles.slide}>
                        <Image style={styles.img} source={{uri: i2}}/>
                    </View>
                )  
            }

            {i6 == ""  ?
                (
                    false
                ) :
                (
                    <View style={styles.slide}>
                        <Image style={styles.img} source={{uri: i2}}/>
                    </View>
                )  
            }
        </Swiper>     
    );
}

const styles = StyleSheet.create ({
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
        height: 350,
        resizeMode: 'cover'
    },
    color:{
        backgroundColor: '#ffa500'
    }
})