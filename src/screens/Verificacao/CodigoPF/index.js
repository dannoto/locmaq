import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../../services/firebaseConnection';


//Codigo PF
export default function CodigoPF({route}){

    const { celular, celularFiltrado, nome, cpf, tipo, avatar, email, password,codigoGerado } = route.params;
    const navigation = useNavigation();
    const [codigoDigitado, setCodigoDigitado] = useState('');
    const[confirmacao, setConfirmacao] = useState('')
    const [ minutes, setMinutes ] = useState(0);
    const [seconds, setSeconds ] =  useState(59);
  
    useEffect(() => {
       
        
        enviarSMS();
       
    }, [])




    function timer() {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
               
                console.log(seconds - 1)
            } else {
                clearInterval(myInterval)
            }
            // if (seconds === 0) {
            //     if (minutes === 0) {
            //         clearInterval(myInterval)
            //     } 
            //     else {
            //         setSeconds(59);
            //     }
            // } 
        }, 1000)

        return ()=> {
            clearInterval(myInterval);
        };
    }

    async function enviarSMS() {


        https://api.smsdev.com.br/v1/send?key=SUA_CHAVE_KEY&type=9&number=11988887777&msg=Teste de envio
        var base_url = 'https://api.smsdev.com.br/v1/send?key=';
        var key = 'YIELEWP0GXMXJBE4LCZC22O9UN4DBH04GWC4XOWTAL9JLN1HC4C2O6ZT5IYQEP4WTY1G0BYVY8WNQPR7SGG0NZXMEAUBD1P3KB0LYZDAD8QEVR0YZEQ1P2I79WSDCNZI';
        var numero = "&type=9&number="+celularFiltrado;
        var mensagem = "&msg=LoqMaq - Codigo de Verificação ";
        
        var URL = base_url+key+numero+mensagem+codigoGerado;
       

        // fetch(URL)
        // .then((r)=>r.json())
        // .then((json)=>{
        //           console.log(json)

        //           if (json.situacao == "OK") {
        //             console.log('ENVIADO COM SUCESSO')
        //                 return true;
        //           } else {
        //             console.log('ERRO INESPERADO')
        //                 return false;
        //           }
        // });
       }


     function confirmaCodigo() {

        console.log(codigoDigitado)
        console.log(codigoGerado)
        if (codigoGerado == codigoDigitado ) {
            console.log('CADSTRADO COM SUCESSO')
            
            timer() 

        } else {
            console.log('CODIGO INVALIDO')
        }
        
      }

      
    return(
        <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>
            <Text style={styles.titulo}>INSIRA O CÓDIGO DE VERIFICAÇÃO</Text>

            <Text style={styles.txtInfo}>Digite o código de 4 dígitos enviado para seu celular +55 {celular}.</Text>

            <View style={styles.areaInput}>
                <TextInput
                style={{ fontSize: 20, color: "#222" }}
                placeholder="Informe o código OTP"
                placeholderTextColor="#d2d2d2"
                value={codigoDigitado}
                onChangeText={(text) => setCodigoDigitado(text)}
                keyboardType={'numeric'}
                maxLength={4}
                autoFocus
                /> 
            </View>

            <View>
                <TouchableOpacity>
                    <Text style={styles.txtBtnSemCodigo}>Não recebi o código</Text>
                    
                </TouchableOpacity>

                <View>
                    {seconds == 0 ? 
                        (
                            null
                        ) :
                        (
                            <Text style={styles.txtBtnSemCodigo}>Contagem {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</Text>
                        )
                    }
                </View>
            </View>

            <View style={styles.areaBtn}>
                <TouchableOpacity style={styles.btn} onPress={confirmaCodigo} >
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
    txtBtnSemCodigo: {
        fontSize: 18, 
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