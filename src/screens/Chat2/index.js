import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderBackButton } from '@react-navigation/stack';

import MensagemItem from '../../components/ConversaInterna/MensagemItem'

export default function Chat({ navigation }) {

    const [mensagens, setMensagens] = useState([
        {key: 1, uid: 123, date: '17/01/2021', hours: '14:51', m: 'Oi, tudo bem?'},
        {key: 2, uid: 456, date: '17/01/2021', hours: '14:51', m: 'Tudo bem, e vc?'},
        {key: 3, uid: 123, date: '17/01/2021', hours: '14:51', m: 'Estou bem também'},
        {key: 4, uid: 123, date: '17/01/2021', hours: '14:51', m: 'Fzd?'},
        {key: 5, uid: 123, date: '17/01/2021', hours: '14:51', m: 'Novidades?'},
        {key: 6, uid: 456, date: '17/01/2021', hours: '14:51', m: 'Trabalhando, ñ tenho nvd'},
        {key: 7, uid: 123, date: '17/01/2021', hours: '14:51', m: 'Legal'},
        {key: 8, uid: 123, date: '17/01/2021', hours: '14:51', m: 'Tchau'}
    ]);
    const [mensagem, setMensagem] = useState('');
    
    const chatArea = React.useRef(null);

    function filterTitulo(titulo) {
        if(titulo.length < 25) {
            return titulo;
        }
        return `${titulo.substring(0, 25)}...`;
    }

    function filterNome(nome) {
        if(nome.length < 28) {
            return nome;
        }
        return `${nome.substring(0, 28)}...`;
    }

    useEffect (() => {
        navigation.setOptions({
            headerLeft: ({ onPress }) => (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <HeaderBackButton onPress={ onPress }/>

                    <View>
                        {/* {avatar != '' ?
                        <Image style={styles.imgPerfil} source={require('../../assets/Logo.png')}/>
                        : */}
                        <Ionicons
                            name={'md-person-circle'}
                            size={55}
                            color='#ffa500'        
                        /> 
                        {/* } */}
                    </View>

                    <View style={{marginLeft: 10}}>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}>{filterTitulo('FABRICANTE - MODELO - ANO')}</Text>
                        <Text style={{fontSize: 14}}>{filterNome('MONNIK JESUS DA SILVA')}</Text>
                    </View>
                </View>
            ),
            headerRight: () => (
                <View>
                    <TouchableOpacity>
                        <Feather  
                            style={{marginRight: 10}}
                            name='more-vertical'
                            size= {30}
                            color='#222'
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [])

    function sendMessage () {
        alert(mensagem)

        setMensagem('')
    }

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : ''}
            enabled>
                
                <FlatList
                    style={styles.chatArea}
                    ref={chatArea}
                    onContentSizeChange={() => {chatArea.current.scrollToEnd({animated:true})}}
                    onLayout={() => {chatArea.current.scrollToEnd({animated:true})}}
                    data={mensagens}
                    renderItem={({item}) => (<MensagemItem data={item} me={123}/>)}
                />

                <View style={styles.sendArea}>
                    <TextInput 
                        style={styles.sendInput} 
                        placeholder='Digite uma mensagem'
                        placeholderTextColor= '#777'
                        value={mensagem}
                        onChangeText={(text) => setMensagem(text)}
                        keyboardType={'default'}
                        autofocus={true}
                    />

                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Ionicons  
                            style={{marginRight: 10}}
                            name='send'
                            size= {28}
                            color='#1f73b7'
                        />
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1
    },
    chatArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    sendArea: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: '#d2d2d2'
    },
    sendInput: {
        height: 50,
        flex: 1,
        marginLeft: 10,
        fontSize: 17
    },
    sendButton: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgPerfil: {
        width: 50, 
        height: 50, 
        borderRadius: 23,
        borderWidth: 3, 
        borderColor: '#ffa500', 
        borderRadius: 25
    }
})


// import React, { useState, useEffect, useRef, isValidElement } from 'react';
// import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from 'react-native';
// import { GiftedChat } from 'react-native-gifted-chat';
// import firebase from '../../services/firebaseConnection'

// export default function Chat() {

//     const usuario = {
//         _id: 1,
//         name: 'Maria',
//         avatar: 'url'
//     }

//     const mensagens = [];

//     // const mensagens = [ 
//     //     { 
//     //         _id: 1,
//     //         text: 'Olá',
//     //         createdAt: new Date().getTime(),
//     //         usuario: {
//     //             _id: 2,
//     //             name: 'João',
//     //             avatar: 'url1'
//     //         }
//     //     },
//     //     { 
//     //         _id: 2,
//     //         text: 'Tudo bem?',
//     //         createdAt: new Date().getTime(),
//     //         usuario: {
//     //             _id: 2,
//     //             name: 'João',
//     //             avatar: 'url1'
//     //         }
//     //     },
//     //     { 
//     //         _id: 1,
//     //         text: 'Olá lllllllllllll',
//     //         createdAt: new Date().getTime(),
//     //         usuario: {
//     //             _id: 2,
//     //             name: 'João',
//     //             avatar: 'url1'
//     //         }
//     //     },
//     // ]

//     // useEffect(() => {
//     //     //Adicionando nova mensagem
//     //     async function updateMessages() {
//     //         await firebase.database().ref('messages').limitToLast(20).on('child_added', (snapshot) => {
//     //             const {text, usuario, createdAt, _id} = snapshot.val();
//     //             const message = {text, usuario, createdAt, _id}
//     //             // console.log('Adicionei uma mensagem')
//     //         })
//     //     }
//     //     updateMessages()
//     // }, []);


//     function onSendMessage(messages) {
//     //     messages.forEach((messages) => {
//     //         messages.createdAt = new Date().getTime();
//     //         await firebase.database().ref('messages').push(messages);
            
//     //     });
//     console.log('messages')
//     }

//     return (
//         <View style={styles.container}>
//             <GiftedChat 
//                 user={usuario} 
//                 messages={mensagens} 
//                 onSend={onSendMessage} 
//                 placeholder={'Digite uma mensagem'}
//                 alwaysShowSend
//                 isLoadingEarlier
//                 isTyping
//             />
//             {
//                 Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
//             }
//         </View>
        
//     );
// }

// const styles = StyleSheet.create ({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff'
//     }
// })