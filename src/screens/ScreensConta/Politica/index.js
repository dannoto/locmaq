import React, { useState, useEffect, useRef, isValidElement } from 'react';
import { View, Text } from 'react-native';
import firebase from '../../../services/firebaseConnection'

export default () => {

    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState('');


    function createChat (userUid1, userUid2) {
        
        //Criando o próprio CHAT
        let newChat = firebase.database().ref('chats').push();
        newChat.child('members').child(userUid1).set({
            id:userUid1
        });
        newChat.child('members').child(userUid2).set({
            id:userUid2
        });

        //Associando aos envolvidos
        let chatId = newChat.key;

        firebase.database().ref('users').child(userUid1).child('chats')
            .child(chatId).set({
                id:chatId,
                title: 'Nome intengrante'
        });

        firebase.database().ref('users').child(userUid2).child('chats')
            .child(chatId).set({
                id:chatId,
                title: 'Nome intengrante'
        });
    }
    
    return (
        <View>
            <Text>Política de Privacidade</Text>
        </View>
    );
}