import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Sign from '../screens/Sign'
import SignIn from '../screens/SignIn';
import SignUpOption from '../screens/SignUpOption';
import SignUpPF from '../screens/SignUpPF';
import SignUpPJ from '../screens/SignUpPJ';
import CellPhone from '../screens/CellPhone';
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
            <AuthStack.Screen name="CellPhone" component={CellPhone} options={{headerShown: false}}/>
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