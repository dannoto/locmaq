import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import { Background, Container, Logo, TextTitulo, AreaInput, TituloInput, Input, IconButton, CustomButton, InputCaracter, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessage, SignMessageText } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
import {cnpj} from 'cpf-cnpj-validator';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default () => {

    const navigation = useNavigation();

    const { cadastrarPJ } = useContext(AuthContext);
    const errors = {}

    const [empresa, setEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [tipo, setTipo] = useState('Pessoa Jurídica');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    // const status = isValid(cnpj);

    const inputElementRef = useRef(null);

    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: { fontFamily: 'sans-serif' },
        });
    }, [visible]);

        // // Validate cnpj
        // function isValid(cnpj) {

        //     if (validator(cnpj)) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }

        function handleSignUp() {
            if (empresa.length < 1) {
                errors.empresa = Alert.alert('Opps!', 'Informe seu Nome da Empresa.')
            }  
            else if (cnpj < 1) {
                errors.cnpj = Alert.alert('Oops!', 'CNPJ inválido.')
            } 
            else {
                cadastrarPJ(empresa, cnpj, tipo, email, password);
            }
        }


        return (
            <Background>
                <Container
                    behavior={Platform.OS === 'ios' ? 'padding' : ''}
                    enabled
                >

                    <Logo source={require('../../assets/Logo1.png')} />
                    <TextTitulo>REGISTRE-SE! É FÁCIL E GRATUITO.</TextTitulo>

                    <TituloInput>NOME DA EMPRESA</TituloInput>
                    <AreaInput>
                        <Input
                            placeholder="EX.: JP EQUIPAMENTOS"
                            value={empresa}
                            onChangeText={(text) => setEmpresa(text)}
                            keyboardType={'default'}
                        />
                    </AreaInput>

                    <TituloInput>CNPJ</TituloInput>
                    <AreaInput>
                        <TextInputMask
                            style={{ fontSize: 20, color: "#222" }}
                            placeholder="00.000.000/0000-00"
                            placeholderTextColor="#d2d2d2"
                            value={cnpj}
                            onChangeText={(text) => setCnpj(text)}
                            type={'cnpj'}
                            keyboardType={'numeric'}
                            options={{
                                format: '99.999.999/9999-99'
                            }}
                            maxLength={18}

                        />
                    </AreaInput>

                    <TituloInput>SEU E-MAIL</TituloInput>
                    <AreaInput>
                        <Input
                            placeholder="email@example.com"
                            value={email}
                            onChangeText={(text) => setEmail(text)}

                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                    </AreaInput>

                    <TituloInput>DIGITE SUA SENHA</TituloInput>
                    <AreaInput>
                        <Input
                            style={{ width: '90%' }}
                            ref={inputElementRef}
                            placeholder="•••••••••"
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            autoCorrect={false}
                            autoCapitalize="none"
                            underlineColorAndroid="transparent"
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
                                size={25}
                                color="#707070"
                            />
                        </IconButton>
                    </AreaInput>

                    <InputCaracter>No minímo 6 caracteres</InputCaracter>

                    <SignMessageButton onPress={() => navigation.navigate('Termos')}>
                        <SignMessageButtonText>Ao continuar, você concorda com os Termos e Condições de Uso</SignMessageButtonText>
                    </SignMessageButton>

                    <CustomButton onPress={handleSignUp}>
                        <CustomButtonText>CADASTRAR</CustomButtonText>
                    </CustomButton>

                    <SignMessage onPress={() => navigation.navigate('SignIn')}>
                        <SignMessageText>JÁ TENHO UMA CONTA</SignMessageText>
                    </SignMessage>

                </Container>
            </Background>
        );
    }