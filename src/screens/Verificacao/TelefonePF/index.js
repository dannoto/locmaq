import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

import firebase from '../../../services/firebaseConnection';

//Telefone PF
export default function CelularPF({route}){

    const { nome, cpf, tipo, avatar, email, password } = route.params;
    const navigation = useNavigation();
    const errors = {}
    const [celular, setCelular] = useState('');
    const  codigoGerado = Math.floor(Math.random() * 9999) + 1000;
    

   async function pegarNumero() {
        let celularFiltrado = celular.replace('(','').replace(')','').replace('-','').replace(' ','')

        if(celular && celular.length > 15){
            navigation.navigate('CodigoPF', {celular: celular, celularFiltrado: celularFiltrado,  nome: nome, cpf: cpf, tipo: tipo, avatar: avatar, email: email, password: password, codigoGerado: codigoGerado})   
        }
        else  {
        errors.condicao = Alert.alert('Opps!', 'Informe um número de celular válido.')
        }
    }

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
                keyboardType={'number-pad'}
                options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                }}
                maxLength={15}
                autoFocus
                /> 
            </View>

            <Text style={styles.txtInfo}>Você receberá um SMS com o código de verificação.</Text>

            <View style={styles.areaBtn}>
                <TouchableOpacity style={styles.btn} onPress={pegarNumero}>
                    <Text style={styles.txtBtn}>AVANÇAR</Text>
                </TouchableOpacity>
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