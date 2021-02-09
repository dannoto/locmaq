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
                            <Text style={styles.titulo}>08/02/2021 - R$ 400,00</Text>
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
                        <Text style={styles.txtInfo}>Assinatura:</Text>
                        <Text style={styles.txtInfoResultado}>Plano Trimestral</Text>
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
        padding: 8, 
        borderRadius: 10
    },
    areaTitulo: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginLeft: 10,
        marginBottom: 5
    },
    titulo: {
        color: '#222',
        fontSize: 16,
        textTransform: 'uppercase'
    }, 
    areaInfo: {
        flexDirection: 'row',
        marginVertical: 5,
        marginLeft: 10
    },
    txtInfo: {
        color: '#222',
        fontSize: 16
    },
    txtInfoResultado: {
        color: '#222',
        fontSize: 16,
        marginLeft: 5
    }
})