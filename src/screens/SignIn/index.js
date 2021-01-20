import React, { useState, useEffect, useRef, useContext } from 'react';
import { Platform } from 'react-native';
import { Background, Container, Logo, TextTitulo, AreaInput, Input, IconButton, CustomButton, CustomButtonText, ForgetButton, ForgetButtonText  } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth'

export default () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);

    const { logar } = useContext(AuthContext);

    const inputElementRef = useRef(null);

    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: { fontFamily: 'sans-serif'},
        });
    }, [visible]);

    function handleLogin() {
        logar(email, password)
    }

    return (
        <Background>
            <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled
            >
               <Logo source={require('../../assets/Logo1.png')}/>
                <TextTitulo>FAÇA LOGIN E APROVEITE NOSSO APLICATIVO.</TextTitulo>
                
                <AreaInput>
                    <Input
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCorrect={false}
                        autoCapitalize="none"
                        underlineColorAndroid= "transparent"
                    />
                </AreaInput>

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

                <CustomButton onPress={handleLogin}>
                    <CustomButtonText>ENTRAR</CustomButtonText>
                </CustomButton> 

                <ForgetButton>
                    <ForgetButtonText>ESQUECI MINHA SENHA</ForgetButtonText>
                </ForgetButton>

            </Container>
        </Background>
    );
}