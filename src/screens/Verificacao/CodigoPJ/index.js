import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Codigo PJ
export default function CodigoPJ({route}){

    const { celular, empresa, cnpj, tipo, avatar, email, password } = route.params;
    const navigation = useNavigation();
    const [codigo, setCodigo] = useState('');

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
    }
})