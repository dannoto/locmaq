import React, { useState, useEffect, useRef, useContext } from 'react';
import { Alert, Platform } from 'react-native';
import { Background, Container, Logo, TextTitulo, AreaInput, TituloInput, Input, IconButton, CustomButton, InputCaracter, CustomButtonText, SignMessageButton, SignMessageButtonText, SignMessage, SignMessageText } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextInputMask } from 'react-native-masked-text';
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


    //Validação CNPJ
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g,'');
        if(cnpj == '') return false;    
        if (cnpj.length != 14)
            return false;
         
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
                 
        // Valida DVs
        let tamanho = cnpj.length - 2
        let  numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for ( let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
                 
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
                   
        return true; 
        }

        function handleSignUp() {
            if (empresa.length < 1) {
                errors.empresa = Alert.alert('Opps!', 'Informe seu Nome da Empresa.')
            }  
            else if (validarCNPJ(cnpj) == false) {
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