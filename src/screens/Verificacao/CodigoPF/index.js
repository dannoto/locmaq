import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../services/firebaseConnection';

//Codigo PF
export default function CodigoPF({route}){

    const { celular, celularFiltrado, nome, cpf, tipo, avatar, email, password } = route.params;
    const navigation = useNavigation();
    const [codigo, setCodigo] = useState('');
    const[confirmacao, setConfirmacao] = useState('')
    const appVerifier = window.recaptchaVerifier;
   

   
  
    // firebase.auth().signInWithPhoneNumber(phoneNumber, applicationVerifier)
    //     .then(function(confirmationResult) {
    //       var verificationCode = window.prompt('Please enter the verification ' +
    //           'code that was sent to your mobile device.');
    //       return confirmationResult.confirm(verificationCode);
   

    useEffect(() => {
            

       enviarSMS();
      }, [])


      async function enviarSMS() {
        try{
           const envio = await firebase.auth().signInWithPhoneNumber('+55'+celularFiltrado,appVerifier)
           .then(confirmResult =>  console.log(confirmResult))
           .catch(error => console.log(error));
        //    setConfirmacao(envio);

   
         }catch(e){
          alert(JSON.stringify(e));
        }
       }


       async function confirmaCodigo() {
        try{
        const code = codigo;
        const response = await confirmacao.confirm(code);
        if(response){
        //   navigation.navigate('Home');
            console.log('CONFIRMADO')
        }
        } catch(e){
          alert(JSON.stringify(e));
        }
      }
      
    return(
        <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <Text style={styles.titulo}>INSIRA O CÓDIGO DE VERIFICAÇÃO</Text>

            <Text style={styles.txtInfo}>Digite o código de 6 dígitos enviado para seu celular +55 {celular}.</Text>

            <View style={styles.areaInput}>
                <TextInput
                style={{ fontSize: 20, color: "#222" }}
                placeholder="Informe o código OTP"
                placeholderTextColor="#d2d2d2"
                value={codigo}
                onChangeText={(text) => setCodigo(text)}
                keyboardType={'numeric'}
                maxLength={6}
                autoFocus
                /> 
            </View>

            <View>
                <TouchableOpacity>
                    <Text style={styles.txtBtn}>Não recebi o código</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.areaBtn}>
                <TouchableOpacity style={styles.btn} onPress={{confirmaCodigo}} >
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
        fontSize: 18, 
        color: "#fff",
        marginTop: 10,
        textAlign: 'justify'
    },
    areaBtn: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
    },
    txtBtn: {
        fontSize: 16, 
        color: "#fff",
        marginTop: 10
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