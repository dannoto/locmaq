import React from 'react';
import styled from 'styled-components/native';

export const Background = styled.ScrollView`
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
    margin-top: 20px;
`;

export const CustomButtonSignUpPF = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background-color: transparent;
    border: 2px solid #fff;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`;

export const CustomButtonTextSignUpPF = styled.Text`
    font-size: 22px;
    color: #fff;
    font-weight: bold;
`;

export const CustomButtonSignUpPJ = styled.TouchableOpacity`
    width: 100%;
    height: 60px;
    background-color: transparent;
    border: 2px solid #fff;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

export const CustomButtonTextSignUpPJ = styled.Text`
    font-size: 22px;
    color: #fff;
    font-weight: bold;
`;