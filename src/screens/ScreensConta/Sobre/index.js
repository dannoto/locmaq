import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';

export default () => {

    return (
        <ScrollView style={styles.background} showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled> 
                <View style={styles.area}>
                    <Text style={styles.txtSobre}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
                        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>
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
        padding: 20
    },
    area: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSobre: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'uppercase',
        marginBottom: 40,
        textAlign: 'justify'
    }
})