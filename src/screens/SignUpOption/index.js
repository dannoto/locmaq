import React from 'react';
import { Platform } from 'react-native';
import { Background, Container, Logo, CustomButtonSignUpPF, CustomButtonTextSignUpPF, CustomButtonSignUpPJ, CustomButtonTextSignUpPJ } from './styles';
import { useNavigation } from '@react-navigation/native';

export default () => {

    const navigation = useNavigation();

    return (
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >
                <Logo source={require('../../assets/Logo.png')}/>

                <CustomButtonSignUpPF onPress={ () => navigation.navigate('SignUpPF')}>
                    <CustomButtonTextSignUpPF>PESSOA FÍSICA</CustomButtonTextSignUpPF>
                </CustomButtonSignUpPF> 

                <CustomButtonSignUpPJ onPress={ () => navigation.navigate('SignUpPJ')}>
                    <CustomButtonTextSignUpPJ>PESSOA JURÍDICA</CustomButtonTextSignUpPJ>
                </CustomButtonSignUpPJ> 

            </Container>
        </Background>
    );
}