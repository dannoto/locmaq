import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import { Background, Container, Logo, TextTitulo, AreaInput, TituloInput, Input, IconButton, CustomButton, InputCaracter, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessage, SignMessageText } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
import { validate } from 'gerador-validador-cpf'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

export default () => {

    const navigation = useNavigation();

    const { cadastrarPF } = useContext(AuthContext);
    const errors = {}

    const [nome, setNome] = useState('oipipio');
    const [cpf, setCpf] = useState('70128706139');
    const [tipo, setTipo] = useState('Pessoa Física');
    const [email, setEmail] = useState('652@gmail.com');
    const [password, setPassword] = useState('123456');
    const [avatar, setAvatar] = useState({url : ''});
    const [show, setShow] = React.useState(false);
    const [visible, setVisible] = React.useState(true);
    const statusCPF = isValid(cpf);
    const isstring = isString(nome);

    const inputElementRef = useRef(null);

    useEffect(() => {
        inputElementRef.current.setNativeProps({
            style: { fontFamily: 'sans-serif' },
        });
    }, [visible]);

        // Validação nome
        function isString(nome) {
            var letters = /^[A-Za-z]+$/;
            if (nome.match(letters)) {
                return true;
            } 
            else {
                return false;
            }
        }

        // Validação CPF
        function isValid(cpf) {

            if (validate(cpf)) {
                return true;
            } else {
                return false;
            }
        }

        function handleSignUp() {
            if (nome.length < 5) {
                if (isstring) {              
                } else {
                    errors.nome = Alert.alert('Opps!', 'Informe seu Nome.')
                }
            }  
            else if (statusCPF == false) {
                errors.cpf = Alert.alert('Oops!', 'CPF inválido.')
            } 
            else {
                // cadastrarPF(nome, cpf, tipo, avatar, email, password);
                navigation.navigate('TelefonePF', {nome: nome, cpf: cpf, tipo: tipo, avatar: avatar, email: email, password: password})
            }
        }

        return (
            <Background showsVerticalScrollIndicator={false}>
                <Container behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

                    <Logo source={require('../../assets/Logo1.png')} />
                    <TextTitulo>REGISTRE-SE! É FÁCIL E GRATUITO.</TextTitulo>

                    <TituloInput>SEU NOME</TituloInput>
                    <AreaInput>
                        <Input
                            placeholder="EX.: JOÃO SILVA"
                            value={nome}
                            onChangeText={(text) => setNome(text)}
                            keyboardType={'default'}
                            maxLength={50}
                        />
                    </AreaInput>

                    <TituloInput>SEU CPF</TituloInput>
                    <AreaInput>
                        <TextInputMask
                            style={{ fontSize: 20, color: "#222" }}
                            placeholder="000.000.000-00"
                            placeholderTextColor="#d2d2d2"
                            value={cpf}
                            onChangeText={(text) => setCpf(text)}
                            type={'cpf'}
                            keyboardType={'number-pad'}
                            options={{
                                format: '999.999.999-99'
                            }}
                            maxLength={14}
                        />
                    </AreaInput>

                    <TituloInput>SEU E-MAIL</TituloInput>
                    <AreaInput>
                        <Input
                            placeholder="email@example.com"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            keyboardType={'email-address'}
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