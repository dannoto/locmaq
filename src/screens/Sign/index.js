import React from 'react';
import { Platform } from 'react-native';
import { Background, Container, Logo, CustomButtonSignUp, CustomButtonTextSignUp, CustomButtonSignIn, CustomButtonTextSignIn } from './styles';
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

                <CustomButtonSignIn onPress={ () => navigation.navigate('SignIn')}>
                    <CustomButtonTextSignIn>ENTRAR</CustomButtonTextSignIn>
                </CustomButtonSignIn> 

                <CustomButtonSignUp onPress={ () => navigation.navigate('SignUp')}>
                    <CustomButtonTextSignUp>CADASTRAR</CustomButtonTextSignUp>
                </CustomButtonSignUp> 

            </Container>
        </Background>
    );
}