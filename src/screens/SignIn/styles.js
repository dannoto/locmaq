import React from 'react';
import styled from 'styled-components/native';

export const Background = styled.View`
    background-color: #ffa500;
    flex: 1;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 40px;
`;

export const Logo = styled.Image`
    width: 60%;
    padding: 10px;
`;

export const TextTitulo = styled.Text`
    width:100%;
    font-size: 15px;
    color: #fff;
    margin-bottom: 30px;
    text-align: center;
`;

export const AreaInput = styled.View`
    flex-direction: row;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom: 20px;
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
    margin-top: 10px;
    margin-bottom: 60px;
`;

export const CustomButtonText = styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
`;

export const ForgetButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
`;

export const ForgetButtonText = styled.Text`
    font-size: 18px;
    color: #fff;
`;