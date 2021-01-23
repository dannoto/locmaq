import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import Swiper from 'react-native-swiper'

export default function SlideDetalhes(data) {

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
            {/* <View style={styles.slide}>
                <Image style={styles.img} source={{uri: data.url}}/>
            </View>   */}

            <View style={styles.slide}>
                <Image style={styles.img} source={{uri:"https://firebasestorage.googleapis.com/v0/b/locmaq-c04b0.appspot.com/o/equipamentos%2FbQdR7kvqgldYJUmL1oijrjznyB63%2F1086889774249.0564bQdR7kvqgldYJUmL1oijrjznyB63%2F0-1086889774249.0564bQdR7kvqgldYJUmL1oijrjznyB63.jpeg?alt=media"}}/>
            </View>

            {/* <View style={styles.slide}>
                <Image style={styles.img} source={require('../assets/caminhao.jpg')}/>
            </View>

            <View style={styles.slide}>
                <Image style={styles.img} source={require('../assets/caminhao.jpg')}/>
            </View>

            <View style={styles.slide}>
                <Image style={styles.img} source={require('../assets/caminhao.jpg')}/>
            </View>

            <View style={styles.slide}>
                <Image style={styles.img} source={require('../assets/caminhao.jpg')}/>
            </View> */} 
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
        resizeMode: 'cover'
    },
    color:{
        backgroundColor: '#ffa500'
    }
})