import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons';
// import Icon from 'react-native-vector-icons/Entypo';

import Home from '../screens/Home';
import Busca from '../screens/Busca';
import Negociacoes from '../screens/Negociacoes';
import Conta from '../screens/Conta';

const Tab = createBottomTabNavigator();
    
const Icons = {

    Busca: {
        name: 'search',
        size: 40,
    },
    Negociações: {
        name: 'comment'
    },
    Conta: {
        name: 'user'
    },
}

function AppRoutes() {

    return (
        <Tab.Navigator
        screenOptions={ ({route}) => ({
            tabBarIcon: ({color, size}) => {
                const {name} = Icons[route.name];
                return <Icon name={name} color={color} size={30}/>
            }
        })}
        tabBarOptions={{
            style:{
                backgroundColor: '#ffa500',
                height: 60,
                paddingTop: 5,
                paddingBottom: 5  
            },
            showLabel: false,
            showIcon: true,
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
        }}
        >
            {/* <Tab.Screen name="Home" component={Home} options={{}}/> */}
            <Tab.Screen name="Busca" component={Busca}/>
            <Tab.Screen name="Negociações" component={Negociacoes}/>
            <Tab.Screen name="Conta"   component={Conta}/>
        </Tab.Navigator>
    );
}

export default AppRoutes;
