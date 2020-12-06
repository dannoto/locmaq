import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Sign from '../screens/Sign'
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import CellPhone from '../screens/CellPhone';
import Termos from '../screens/Termos';
import Busca from '../screens/Busca';

const AuthStack = createStackNavigator();

function AuthRoutes() {
    return (
        <AuthStack.Navigator
        initialRouteName="Sign"
    >
        <AuthStack.Screen name="Sign" component={Sign} options={{headerShown: false}}/>
        <AuthStack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
        <AuthStack.Screen name="SignUp" component={SignUp} options={{headerShown: false}}
        />
        <AuthStack.Screen name="CellPhone" component={CellPhone} options={{headerShown: false}}/>
        <AuthStack.Screen name="Termos" component={Termos} options={{
            headerTintColor: '#222',
            headerBackTitleVisible: false,
            headerTitle: 'Termos'
        }}
        />
        <AuthStack.Screen name="Busca" component={Busca} options={{headerShown: false}}/>

    </AuthStack.Navigator>
    )
}

export default AuthRoutes;