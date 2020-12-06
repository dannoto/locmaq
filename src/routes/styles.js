import React from 'react';
import styled from 'styled-components/native';

export const Background = styled.SafeAreaView`
    background-color: #ffa500;
    flex: 1;
`;

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled.Image`

`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 60px;
`;
