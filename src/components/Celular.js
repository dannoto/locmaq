import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

export default function Celular(){

    const navigation = useNavigation();
    const [celular, setCelular] = useState('');

    return(
        <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <Text style={styles.titulo}>DIGITE SEU NÚMERO DE CELULAR</Text>

            <View style={styles.areaInput}>
                <Text style={styles.txtInput}>+55</Text>

                <TextInputMask
                style={{ fontSize: 20, color: "#222" }}
                placeholder="Número do celular"
                placeholderTextColor="#d2d2d2"
                value={celular}
                onChangeText={(text) => setCelular(text)}
                type={'cel-phone'}
                keyboardType={'numeric'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                maxLength={15}
                autoFocus
                /> 
            </View>

            <Text style={styles.txtInfo}>Ao continuar, você receberá um SMS com o código de verificação.</Text>

            <View style={styles.areaBtn}>
                {/* <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Codigo', {numeroCelular: celular})}>
                    <Text style={styles.txtBtn}>AVANÇAR</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#ffa500',
        padding: 20
    },
    titulo: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }, 
    areaInput: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        marginTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    txtInput: {
        fontSize: 20, 
        color: "#222",
        marginRight: 5
    }, 
    txtInfo: {
        fontSize: 16, 
        color: "#fff",
        marginTop: 10,
        textAlign: 'justify'
    },
    areaBtn: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    btn: {
        height: 60,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    txtBtn: {
        fontSize: 20,
        color: '#222',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})