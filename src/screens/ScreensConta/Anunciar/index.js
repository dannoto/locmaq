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
                    <Text style={styles.titulo}>O QUE VOCÊ DESEJA ANUNCIAR?</Text>

                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Categorias')}>
                        <Text style={styles.txtBtn}>EQUIPAMENTOS</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('SubcategoriasServicos', {catId: '-MS2rbqavp5zN_3QZsSK'})}>
                        <Text style={styles.txtBtn}>SERVIÇOS</Text>
                    </TouchableOpacity>
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
        flex: 1,
    },
    area: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
    },
    titulo: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    btn: {
        width: '100%',
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#fff'
    },
    txtBtn:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    }
})