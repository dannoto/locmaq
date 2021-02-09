import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <View style={styles.areaPlanos}>
                        <Text style={styles.titulo}>Plano Mensal</Text>
                        <Text style={styles.txtInfo}>Que tal ter todas estas vantagens?</Text>
                        <Text style={styles.txtPreco}>R$ 80,00/mês</Text>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.txtBtn}>ADQUIRIR</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.areaPlanos}>
                        <Text style={styles.titulo}>Plano Trimestral</Text>
                        <Text style={styles.txtInfo}>Que tal ter todas estas vantagens?</Text>
                        <Text style={styles.txtPreco}>R$ 55,00/mês</Text>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.txtBtn}>ADQUIRIR</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.areaPlanos}>
                        <Text style={styles.titulo}>Plano Anual</Text>
                        <Text style={styles.txtInfo}>Que tal ter todas estas vantagens?</Text>
                        <Text style={styles.txtPreco}>R$ 40,00/mês</Text>

                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.txtBtn}>ADQUIRIR</Text>
                        </TouchableOpacity>
                    </View>

                </View>             
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#ffa500'
    },
    container: {
        flex: 1
    },
    area: {
        padding: 30
    },
    titulo: {
        color: '#fff',
        fontSize: 18,
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }, 
    areaPlanos: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#fff',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center', 
        marginBottom: 30
    }, 
    btn: {
        width: '50%',
        backgroundColor: '#fff',
        padding: 8, 
    },
    txtBtn: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffa500'
    }, 
    txtInfo: {
        color: '#fff',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    txtPreco: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})