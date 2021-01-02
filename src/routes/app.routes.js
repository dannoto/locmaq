import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import Home from '../screens/Home';
import Busca from '../screens/Busca';
import Negociacoes from '../screens/Negociacoes';
import Conta from '../screens/Conta';
import Anunciar from '../screens/ScreensConta/Anunciar';
import Erro from '../screens/ScreensConta/Erro';
import Favoritos from '../screens/ScreensConta/Favoritos';
import Feedback from '../screens/ScreensConta/Feedback';
import HistoricoPagamentos from '../screens/ScreensConta/HistoricoPagamentos';
import MeusAnuncios from '../screens/ScreensConta/MeusAnuncios';
import MinhasAssinaturas from '../screens/ScreensConta/MinhasAssinaturas';
import Notificacoes from '../screens/ScreensConta/Notificacoes';
import MeusDados from '../screens/ScreensConta/MeusDados';
import Perguntas from '../screens/ScreensConta/Perguntas';
import Planos from '../screens/ScreensConta/Planos';
import Politica from '../screens/ScreensConta/Politica';
import Sobre from '../screens/ScreensConta/Sobre';
import SobreAssinatura from '../screens/ScreensConta/SobreAssinatura';
import Termos from '../screens/ScreensConta/Termos';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Tabs() {

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

export default function AppRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Conta" component={Tabs} options={{headerShown: false}}/>
            <Stack.Screen name="MeusDados" component={MeusDados} options={{headerTitle: 'MEUS DADOS', headerTintColor: '#222'}}/>
            <Stack.Screen name="MeusAnuncios" component={MeusAnuncios} options={{headerTitle: 'MEUS ANÚNCIOS', headerTintColor: '#222'}}/>
            <Stack.Screen name="MinhasAssinaturas" component={MinhasAssinaturas} options={{headerTitle: 'MINHAS ASSINATURAS', headerTintColor: '#222'}}/>
            <Stack.Screen name="HistoricoPagamentos" component={HistoricoPagamentos} options={{headerTitle: 'HISTÓRICO DE PAGAMENTOS', headerTintColor: '#222'}}/>
            <Stack.Screen name="Notificacoes" component={Notificacoes} options={{headerTitle: 'NOTIFICAÇÕES', headerTintColor: '#222'}}/>
            <Stack.Screen name="Favoritos" component={Favoritos} options={{headerTitle: 'FAVORITOS', headerTintColor: '#222'}}/>
            <Stack.Screen name="Anunciar" component={Anunciar} options={{headerTitle: 'ANUNCIAR', headerTintColor: '#222'}}/>
            <Stack.Screen name="SobreAssinatura" component={SobreAssinatura} options={{headerTitle: 'SOBRE A ASSINATURA', headerTintColor: '#222'}}/>
            <Stack.Screen name="Planos" component={Planos} options={{headerTitle: 'CONHEÇA NOSSOS PLANOS', headerTintColor: '#222'}}/>
            <Stack.Screen name="Feedback" component={Feedback} options={{headerTitle: 'ENVIAR FEEDBACK', headerTintColor: '#222'}}/>
            <Stack.Screen name="Erro" component={Erro} options={{headerTitle: 'ENCONTROU ALGUM ERRO?', headerTintColor: '#222'}}/>
            <Stack.Screen name="Perguntas" component={Perguntas} options={{headerTitle: 'PERGUNTAS FREQUENTES', headerTintColor: '#222'}}/>
            <Stack.Screen name="Sobre" component={Sobre} options={{headerTitle: 'SOBRE A LOCMAQ', headerTintColor: '#222'}}/>
            <Stack.Screen name="Termos" component={Termos} options={{headerTitle: 'TERMOS DE USO', headerTintColor: '#222'}}/>
            <Stack.Screen name="Politica" component={Politica} options={{headerTitle: 'POLÍTICA DE PRIVACIDADE', headerTintColor: '#222'}}/>
        </Stack.Navigator>
    )
}
