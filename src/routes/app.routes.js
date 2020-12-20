import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Home from '../screens/Home';
import Busca from '../screens/Busca';
import Negociacoes from '../screens/Negociacoes';
import Conta from '../screens/Conta';

const Tab = createBottomTabNavigator();

function AppRoutes() {

    return (
        <Tab.Navigator
        tabBarOptions={{
            style:{
                backgroundColor: '#ffa500',
                height: 60,
                paddingTop: 5,
                paddingBottom: 5  
            },
            showLabel: false,
            showIcon: true,
            activeTintColor: '#222',
            inactiveTintColor: '#fff',
        }}
        >
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color, size}) => (
                <Entypo name="home" color={color} size={30}/>
            )}}/>
            <Tab.Screen name="Busca" component={Busca} options={{tabBarIcon: ({color, size}) => (
                <EvilIcons name="search" color={color} size={40}/>
            )}}/>
            <Tab.Screen name="Negociações" component={Negociacoes} options={{tabBarIcon: ({color, size}) => (
                <EvilIcons name="comment" color={color} size={40}/>
            )}}/>
            <Tab.Screen name="Conta" component={Conta} options={{tabBarIcon: ({color, size}) => (
                <EvilIcons name="user" color={color} size={40}/>
            )}}/>
        </Tab.Navigator>
    );
}

export default AppRoutes;
