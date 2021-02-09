import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Sign from '../screens/Sign'
import SignIn from '../screens/SignIn';
import SignUpOption from '../screens/SignUpOption';
import SignUpPF from '../screens/SignUpPF';
import SignUpPJ from '../screens/SignUpPJ';
import RecuperarSenha from '../screens/RecuperarSenha';
import TelefonePF from '../screens/Verificacao/TelefonePF';
import TelefonePJ from '../screens/Verificacao/TelefonePJ';
import CodigoPF from '../screens/Verificacao/CodigoPF';
import CodigoPJ from '../screens/Verificacao/CodigoPJ';
import Termos from '../screens/Termos';

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator
        initialRouteName="Sign"
        >
            <AuthStack.Screen name="Sign" component={Sign} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
            <AuthStack.Screen name="RecuperarSenha" component={RecuperarSenha} options={{headerTitle: '', headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <AuthStack.Screen name="SignUpOption" component={SignUpOption} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignUpPF" component={SignUpPF} options={{headerShown: false}}/>
            <AuthStack.Screen name="SignUpPJ" component={SignUpPJ} options={{headerShown: false}}/>
            <AuthStack.Screen name="TelefonePF" component={TelefonePF} options={{headerTitle: '', headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <AuthStack.Screen name="TelefonePJ" component={TelefonePJ} options={{headerTitle: '', headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <AuthStack.Screen name="CodigoPF" component={CodigoPF} options={{headerTitle: '', headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <AuthStack.Screen name="CodigoPJ" component={CodigoPJ} options={{headerTitle: '', headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <AuthStack.Screen name="Termos" component={Termos} options={{headerTitle: "TERMOS DE USO", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}
        />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;