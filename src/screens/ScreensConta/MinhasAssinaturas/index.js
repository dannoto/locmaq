import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';

export default () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <View style={styles.areaTitulo}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.ativo}>Ativo</Text>
                            <Text style={styles.titulo}>Plano Trimestral</Text>
                        </View>

                        <TouchableOpacity>
                            <Feather  
                                name='more-vertical'
                                size= {25}
                                color='#222'
                            />
                        </TouchableOpacity>
                
                    </View>
                    
                    <View style={styles.areaInfo}>
                        <Text style={styles.tituloInfo}>VALOR:</Text>
                        <Text style={styles.resultado}>R$ 400,00 a cada 3 meses</Text>
                    </View>

                    <View style={styles.areaInfo}>
                        <Text style={styles.tituloInfo}>FORMA DE PAGAMENTO:</Text>
                        <Text style={styles.resultado}>CARTÃO DE CRÉDITO</Text>
                    </View>

                    <View style={styles.areaInfo}>
                        <Text style={styles.tituloInfo}>DATA PAGAMENTO:</Text>
                        <Text style={styles.resultado}>08/02/2021 às 18:10</Text>
                    </View>

                    <View style={styles.areaInfo}>
                        <Text style={styles.tituloInfo}>INÍCIO DO PERÍODO ATUAL:</Text>
                        <Text style={styles.resultado}>08/02/2021 às 18:10</Text>
                    </View>

                    <View style={styles.areaInfo}>
                        <Text style={styles.tituloInfo}>FIM DO PERÍODO ATUAL:</Text>
                        <Text style={styles.resultado}>08/05/2021 às 18:10</Text>
                    </View>

                    <View style={styles.areaInfoCartao}>
                        <Text style={styles.tituloInfoCartao}>CARTÃO DE CRÉDITO</Text>
                        <Text style={styles.resultadoCartao}>**** **** **** 5471</Text>
                    </View> 

                </View>             
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#ffa500',
        padding: 20
    },
    container: {
        flex: 1,
    },
    area: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 15
    },
    areaTitulo: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10
    },
    titulo: {
        color: '#222',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }, 
    ativo: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 10,
        marginLeft: 5,
        backgroundColor: '#0bcf05',
        padding: 6
    },
    areaInfo: {
        flexDirection: 'row',
        marginVertical: 5,
        marginLeft: 5
    },
    tituloInfo: {
        color: '#222',
        fontSize: 14,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginRight: 5
    },
    resultado: {
        color: '#222',
        fontSize: 14
    },
    areaInfoCartao: {
        marginTop: 10,
        marginLeft: 5
    },
    tituloInfoCartao: {
        color: '#222',
        fontSize: 16,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginRight: 5
    },
    resultadoCartao: {
        marginTop:5,
        color: '#222',
        fontSize: 16
    },
})