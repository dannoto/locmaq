import React from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';

export default () => {
    return (
        <ScrollView style={styles.background}>
            <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>               

                
            
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    background: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
    },
})