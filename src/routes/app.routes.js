import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'

import Home from '../screens/Home';
import Busca from '../screens/Busca';
import Negociacoes from '../screens/Negociacoes';
import Anuncie from '../screens/Anuncie';
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
import Categorias from '../screens/Forms/Categorias';
import Subcategorias from '../screens/Forms/Subcategorias';
import FormMOYhVnn30sqWae8P2GK from '../screens/Forms/Formularios/FormMOYhVnn30sqWae8P2GK'; //Caminhões
import FormMOYhb9TriP8ideQfsOc from '../screens/Forms/Formularios/FormMOYhb9TriP8ideQfsOc'; //Escavadeiras
import FormMOYheKfAJRaaIkK4iNN from '../screens/Forms/Formularios/FormMOYheKfAJRaaIkK4iNN'; //Empilhadeiras
import FormMOYhhGcyYZ48yNzorkY from '../screens/Forms/Formularios/FormMOYhhGcyYZ48yNzorkY'; //Compactadores
import FormMOYhjWTHG77Uf6JCH7W from '../screens/Forms/Formularios/FormMOYhjWTHG77Uf6JCH7W'; //Tratores
import FormMOYhrOgzF4rJwl6v7Z2 from '../screens/Forms/Formularios/FormMOYhrOgzF4rJwl6v7Z2'; //Usina de Asfalto
import FormMOYiJQ9nhcKzGiBotsr from '../screens/Forms/Formularios/FormMOYiJQ9nhcKzGiBotsr'; //Guindastes
import FormMP966g82MJ3W_1v_dUc from '../screens/Forms/Formularios/FormMP966g82MJ3W_1v_dUc'; //Plataformas Aérea
import FormMQCn08fEkfPwhfOVxWr from '../screens/Forms/Formularios/FormMQCn08fEkfPwhfOVxWr'; //Martelos Hidraúlico
import FormMP96Or2Unms_Wf1gWlI from '../screens/Forms/Formularios/FormMP96Or2Unms_Wf1gWlI'; //Manipuladores Telescópico
import FormMP96RRAkNan7K7LKHJs from '../screens/Forms/Formularios/FormMP96RRAkNan7K7LKHJs'; //Britadores
import FormMP9NalqoSxqzv9vJROd from '../screens/Forms/Formularios/FormMP9NalqoSxqzv9vJROd'; //Equipamentos em Geral

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
            <Tab.Screen name="Anuncie" component={Anuncie} options={{tabBarIcon: ({color, size}) => (
                <AntDesign name="notification" color={color} size={30}/>
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
            <Stack.Screen name="Anunciar" component={Anunciar} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SobreAssinatura" component={SobreAssinatura} options={{headerTitle: 'SOBRE A ASSINATURA', headerTintColor: '#222'}}/>
            <Stack.Screen name="Planos" component={Planos} options={{headerTitle: 'CONHEÇA NOSSOS PLANOS', headerTintColor: '#222'}}/>
            <Stack.Screen name="Feedback" component={Feedback} options={{headerTitle: 'ENVIAR FEEDBACK', headerTintColor: '#222'}}/>
            <Stack.Screen name="Erro" component={Erro} options={{headerTitle: 'ENCONTROU ALGUM ERRO?', headerTintColor: '#222'}}/>
            <Stack.Screen name="Perguntas" component={Perguntas} options={{headerTitle: 'PERGUNTAS FREQUENTES', headerTintColor: '#222'}}/>
            <Stack.Screen name="Sobre" component={Sobre} options={{headerTitle: 'SOBRE A LOCMAQ', headerTintColor: '#222'}}/>
            <Stack.Screen name="Termos" component={Termos} options={{headerTitle: 'TERMOS DE USO', headerTintColor: '#222'}}/>
            <Stack.Screen name="Politica" component={Politica} options={{headerTitle: 'POLÍTICA DE PRIVACIDADE', headerTintColor: '#222'}}/>
            <Stack.Screen name="Categorias" component={Categorias} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="Subcategorias" component={Subcategorias} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMOYhVnn30sqWae8P2GK" component={FormMOYhVnn30sqWae8P2GK} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/> 
            <Stack.Screen name="FormMOYhb9TriP8ideQfsOc" component={FormMOYhb9TriP8ideQfsOc} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMOYheKfAJRaaIkK4iNN" component={FormMOYheKfAJRaaIkK4iNN} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMOYhhGcyYZ48yNzorkY" component={FormMOYhhGcyYZ48yNzorkY} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMOYhjWTHG77Uf6JCH7W" component={FormMOYhjWTHG77Uf6JCH7W} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMOYhrOgzF4rJwl6v7Z2" component={FormMOYhrOgzF4rJwl6v7Z2} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMOYiJQ9nhcKzGiBotsr" component={FormMOYiJQ9nhcKzGiBotsr} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMP966g82MJ3W_1v_dUc" component={FormMP966g82MJ3W_1v_dUc} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMQCn08fEkfPwhfOVxWr" component={FormMQCn08fEkfPwhfOVxWr} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMP96Or2Unms_Wf1gWlI" component={FormMP96Or2Unms_Wf1gWlI} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMP96RRAkNan7K7LKHJs" component={FormMP96RRAkNan7K7LKHJs} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMP9NalqoSxqzv9vJROd" component={FormMP9NalqoSxqzv9vJROd} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
       </Stack.Navigator>
    )
}