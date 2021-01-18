import React from 'react';
import styled from 'styled-components/native';

export const Background = styled.ScrollView`
    background-color: #ffa500;
    flex: 1;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    padding: 0 40px;
`;

export const Logo = styled.Image`
    width: 60%;
    margin-left: 20%;
    padding: 10px;
    margin-top: 40px;
`;

export const TextTitulo = styled.Text`
    font-size: 18px;
    color: #fff;
    margin-bottom: 30px;
    text-align: center;
`;

export const TituloInput = styled.Text`
    font-size: 18px;
    color: #fff;
    margin-top: 10px;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#d2d2d2'
})`
    width: 100%;
    font-size: 20px;
    color: #222;
`;

export const IconButton = styled.TouchableOpacity` 
    margin-right: 5px;
`;

export const CustomButton = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background-color: transparent;
    border: 2px solid #fff;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

export const CustomButtonText = styled.Text`
    font-size: 22px;
    color: #fff;
    font-weight: bold;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #fff;
    text-align: center;
`;

export const InputCaracter = styled.Text`
    font-size: 17px;
    color: #fff;
    margin-top: 5px;
`;

export const SignMessage = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 20px;
`;

export const SignMessageText = styled.Text`
    font-size: 18px;
    color: #fff;
`;
