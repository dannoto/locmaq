import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform } from 'react-native';
import { Background, Container, TextTitulo, AreaInput, Input, IconButton, CustomButton, CustomButtonText, TextInfo  } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

export default () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);

    const { logar, user } = useContext(AuthContext);
    

    const inputElementRef = useRef(null);

    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: { fontFamily: 'sans-serif'},
        });
    }, [visible]);

    function handleLogin() {
        logar(email, password);
    }

    return (
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >
                <TextTitulo>CADASTRE SUA NOVA SENHA</TextTitulo>
                <TextInfo>A SENHA DEVE TER NO MÍNIMO 6 CARACTERES.</TextInfo>
                <TextInfo>DICA: PARA TORNAR SUA SENHA MAIS SEGURA, UTILIZE NÚMEROS, LETRAS MAIÚSCULAS E MINÚSCULAS.</TextInfo>

                <AreaInput>
                    <Input
                        style={{width: '90%'}}
                        ref={inputElementRef}
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        underlineColorAndroid= "transparent"
                        secureTextEntry={visible}
                    />

                    <IconButton onPress={
                        () => {
                            setVisible(!visible) 
                            setShow(!show)
                            }
                        }>
                        <MaterialCommunityIcons
                        name={show === false ? 'eye' : 'eye-off'}
                        size= {25}
                        color="#707070"
                        />
                    </IconButton>
                </AreaInput>

                <AreaInput>
                    <Input
                        style={{width: '90%'}}
                        ref={inputElementRef}
                        placeholder="Confirme sua senha"
                        value={passwordConfirm}
                        onChangeText={(text) => setPasswordConfirm(text)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        underlineColorAndroid= "transparent"
                        secureTextEntry={visible}
                    />

                    <IconButton onPress={
                        () => {
                            setVisible(!visible) 
                            setShow(!show)
                            }
                        }>
                        <MaterialCommunityIcons
                        name={show === false ? 'eye' : 'eye-off'}
                        size= {25}
                        color="#707070"
                        />
                    </IconButton>
                </AreaInput>

                <CustomButton>
                    <CustomButtonText>REDEFINIR</CustomButtonText>
                </CustomButton> 

            </Container>
        </Background>
    );
}