import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
import Detalhes from '../screens/Detalhes';
import Chat from '../screens/Chat';
import Chat2 from '../screens/Chat2';
import Categorias from '../screens/Forms/Categorias';
import CategoriaServico from '../screens/Forms/CategoriaServico';
import Subcategorias from '../screens/Forms/Subcategorias';
import SubcategoriasServicos from '../screens/Forms/SubcategoriasServicos';
import FormularioServicos from '../screens/Forms/FormularioServicos';
import FormMP96RRAkNan7K7LKHJs from '../screens/Forms/Formularios/FormularioBritadeiras/FormMP96RRAkNan7K7LKHJs'; //Britadores
import FormMOYhVnn30sqWae8P2GK from '../screens/Forms/Formularios/FormularioCaminhoes/FormMOYhVnn30sqWae8P2GK'; //Caminhões
import FormMOYhb9TriP8ideQfsOc from '../screens/Forms/Formularios/FormularioEscavadeiras/FormMOYhb9TriP8ideQfsOc'; //Escavadeiras
import FormMOYheKfAJRaaIkK4iNN from '../screens/Forms/Formularios/FormularioEmpilhadeiras/FormMOYheKfAJRaaIkK4iNN'; //Empilhadeiras
import FormMOYhhGcyYZ48yNzorkY from '../screens/Forms/Formularios/FormularioCompactadores/FormMOYhhGcyYZ48yNzorkY'; //Compactadores
import FormMOYhjWTHG77Uf6JCH7W from '../screens/Forms/Formularios/FormularioTratores/FormMOYhjWTHG77Uf6JCH7W'; //Tratores
import FormMOYhrOgzF4rJwl6v7Z2 from '../screens/Forms/Formularios/FormularioUsinasdeAsfalto/FormMOYhrOgzF4rJwl6v7Z2'; //Usina de Asfalto
import FormMOYiJQ9nhcKzGiBotsr from '../screens/Forms/Formularios/FormularioGuidastes/FormMOYiJQ9nhcKzGiBotsr'; //Guindastes
import FormMP966g82MJ3W_1v_dUc from '../screens/Forms/Formularios/FormularioPlataformasAerea/FormMP966g82MJ3W_1v_dUc'; //Plataformas Aérea
import FormMQCn08fEkfPwhfOVxWr from '../screens/Forms/Formularios/FormularioMartelosHidraulico/FormMQCn08fEkfPwhfOVxWr'; //Martelos Hidraúlico
import FormMP96Or2Unms_Wf1gWlI from '../screens/Forms/Formularios/FormularioManipuladoresTelescopico/FormMP96Or2Unms_Wf1gWlI'; //Manipuladores Telescópico
import FormMS_1nckQCjTj0B2xnyR from '../screens/Forms/Formularios/FormularioUsinasdeConcreto/FormMS_1nckQCjTj0B2xnyR'; //Usina de Concreto
import FormMS_450BFVjKcUXa_K_8 from '../screens/Forms/Formularios/FormularioPerfuratriz/FormMS_450BFVjKcUXa_K_8'; //Perfuratriz
import SegundoFormBritador from '../screens/Forms/Formularios/FormularioBritadeiras/SegundoFormBritador'; //Segunda parte do formulário Britadores
import SegundoFormCaminhao from '../screens/Forms/Formularios/FormularioCaminhoes/SegundoFormCaminhao'; //Segunda parte do formulário Caminhões
import SegundoFormEscavadeira from '../screens/Forms/Formularios/FormularioEscavadeiras/SegundoFormEscavadeira'; //Segunda parte do formulário Escavadeiras
import SegundoFormEmpilhadeira from '../screens/Forms/Formularios/FormularioEmpilhadeiras/SegundoFormEmpilhadeira'; //Segunda parte do formulário Empilhadeiras
import SegundoFormCompactador from '../screens/Forms/Formularios/FormularioCompactadores/SegundoFormCompactador'; //Segunda parte do formulário Compactadores
import SegundoFormTrator from '../screens/Forms/Formularios/FormularioTratores/SegundoFormTrator'; //Segunda parte do formulário Tratores
import SegundoFormUsina from '../screens/Forms/Formularios/FormularioUsinasdeAsfalto/SegundoFormUsina'; //Segunda parte do formulário Usina de Asfalto
import SegundoFormGuindaste from '../screens/Forms/Formularios/FormularioGuidastes/SegundoFormGuindaste'; //Segunda parte do formulário Guindastes
import SegundoFormPlataforma from '../screens/Forms/Formularios/FormularioPlataformasAerea/SegundoFormPlataforma'; //Segunda parte do formulário Plataformas Aérea
import SegundoFormMartelo from '../screens/Forms/Formularios/FormularioMartelosHidraulico/SegundoFormMartelo'; //Segunda parte do formulário Martelos Hidraúlico
import SegundoFormManipulador from '../screens/Forms/Formularios/FormularioManipuladoresTelescopico/SegundoFormManipulador'; //Segunda parte do formulário Manipuladores Telescópico
import SegundoFormUsinaConcreto from '../screens/Forms/Formularios/FormularioUsinasdeConcreto/SegundoFormUsinaConcreto'; //Segunda parte do formulário Usina de Concreto
import SegundoFormPerfuratriz from '../screens/Forms/Formularios/FormularioPerfuratriz/SegundoFormPerfuratriz'; //Segunda parte do formulário Perfuratriz
import EditCaminhao from '../screens/Forms/FormEdicao/EditCaminhao'; //Página de edição dos formulários Caminhões

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
            inactiveTintColor: '#fff'
        }}
        >
            <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color, size}) => (
                <Entypo name="home" color={color} size={30}/>)
            }}/>
            <Tab.Screen name="Busca" component={Busca} options={{tabBarIcon: ({color, size}) => (
                <EvilIcons name="search" color={color} size={40}/>)
            }}/>
            <Tab.Screen name="Anuncie" component={Anuncie} options={{tabBarIcon: ({color, size}) => (
                <Ionicons name="megaphone-outline" color={color} size={31}/>)
            }}/>
            <Tab.Screen name="Negociações" component={Negociacoes} options={{tabBarIcon: ({color, size}) => (
                <EvilIcons name="comment" color={color} size={40}/>)
            }}/>
            <Tab.Screen name="Conta" component={Conta} options={{tabBarIcon: ({color, size}) => (
                <EvilIcons name="user" color={color} size={40}/>)
            }}/>
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
            <Stack.Screen name="Detalhes" component={Detalhes} options={{headerTitle: 'DETALHES', headerTintColor: '#222'}}/>
            <Stack.Screen name="Chat" component={Chat} options={{headerTitle: '', headerTintColor: '#222'}}/>
            <Stack.Screen name="Chat2" component={Chat2} options={{headerTitle: '', headerTintColor: '#222'}}/>
            <Stack.Screen name="Categorias" component={Categorias} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="CategoriaServico" component={CategoriaServico} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="Subcategorias" component={Subcategorias} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SubcategoriasServicos" component={SubcategoriasServicos} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormularioServicos" component={FormularioServicos} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/> 
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
            <Stack.Screen name="FormMS_1nckQCjTj0B2xnyR" component={FormMS_1nckQCjTj0B2xnyR} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="FormMS_450BFVjKcUXa_K_8" component={FormMS_450BFVjKcUXa_K_8} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormCaminhao" component={SegundoFormCaminhao} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormEscavadeira" component={SegundoFormEscavadeira} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormEmpilhadeira" component={SegundoFormEmpilhadeira} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormCompactador" component={SegundoFormCompactador} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormTrator" component={SegundoFormTrator} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormUsina" component={SegundoFormUsina} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormGuindaste" component={SegundoFormGuindaste} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormPlataforma" component={SegundoFormPlataforma} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormMartelo" component={SegundoFormMartelo} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormManipulador" component={SegundoFormManipulador} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormBritador" component={SegundoFormBritador} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormUsinaConcreto" component={SegundoFormUsinaConcreto} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="SegundoFormPerfuratriz" component={SegundoFormPerfuratriz} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
            <Stack.Screen name="EditCaminhao" component={EditCaminhao} options={{headerTitle: "", headerTintColor: '#fff', headerStyle: { backgroundColor: '#ffa500'}}}/>
       </Stack.Navigator>
    )
}