import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Sign from '../screens/Sign'
import SignIn from '../screens/SignIn';
import SignUpOption from '../screens/SignUpOption';
import SignUpPF from '../screens/SignUpPF';
import SignUpPJ from '../screens/SignUpPJ';
import Codigo from '../screens/Verificacao/Codigo';
import Telefone from '../screens/Verificacao/Telefone';
import Termos from '../screens/Termos';

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator
        initialRouteName="Sign"
        >
            <AuthStack.Screen name="Sign" component={Sign} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignUpOption" component={SignUpOption} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignUpPF" component={SignUpPF} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignUpPJ" component={SignUpPJ} options={{headerShown: false}}/>
            <AuthStack.Screen name="Codigo" component={Codigo} options={{headerShown: false}}/>
            <AuthStack.Screen name="Telefone" component={Telefone} options={{headerShown: false}}/>
            <AuthStack.Screen name="Termos" component={Termos} options={{
                headerTintColor: '#222',
                headerBackTitleVisible: false,
                headerTitle: 'Termos'
            }}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;