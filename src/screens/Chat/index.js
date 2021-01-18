import React, { useState, useEffect, useRef, isValidElement } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import firebasex from '../../services/firebaseConnection';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';

export default ({route}) => {

    const navigation = useNavigation();
    const {proprietario, produto, interessado} = route.params;
  
    const usuario = {
      _id: 1,
      name: 'Maria',
      avatar: 'url'
  }

  // const mensagens = [];

  const mensagens = [ 
      { 
          _id: 1,
          text: 'Olá',
          createdAt: new Date().getTime(),
          usuario: {
              _id: 2,
              name: 'João',
              avatar: 'url1'
          }
      },
      { 
          _id: 2,
          text: 'Tudo bem?',
          createdAt: new Date().getTime(),
          usuario: {
              _id: 2,
              name: 'João',
              avatar: 'url1'
          }
      },
      { 
          _id: 1,
          text: 'Olá lllllllllllll',
          createdAt: new Date().getTime(),
          usuario: {
              _id: 2,
              name: 'João',
              avatar: 'url1'
          }
      },
  ]

  // useEffect(() => {
  //     //Adicionando nova mensagem
  //     async function updateMessages() {
  //         await firebase.database().ref('messages').limitToLast(20).on('child_added', (snapshot) => {
  //             const {text, usuario, createdAt, _id} = snapshot.val();
  //             const message = {text, usuario, createdAt, _id}
  //             // console.log('Adicionei uma mensagem')
  //         })
  //     }
  //     updateMessages()
  // }, []);


  function onSendMessage(messages) {
  //     messages.forEach((messages) => {
  //         messages.createdAt = new Date().getTime();
  //         await firebase.database().ref('messages').push(messages);
          
  //     });
  console.log('messages')
  }

 



    useEffect(() => {

        async function jaExisteConversa() {
            await firebasex.database().ref('chats').orderByChild('produto').equalTo(produto).once('value')
            .then(function(snapshot) {


                    if(!snapshot.val()) {    

                                criarConversa();
                                console.log('Criou');

                    } else {
                                snapshot.forEach((item) => {
                                       
                                        if (item.val().produto == produto && item.val().proprietario == proprietario.codigo && item.val().interessado == interessado) 
                                        {        

                                            console.log('ja existe, não criou.');  

                                        } else {

                                            criarConversa();                                          
                                            console.log('Criou');                                   
                                        }
                                })
                    }

            }).catch(function(error) {
             
               
              });

        }


   
        async function criarConversa() {
            let firebase = await firebasex.database().ref('chats');
            let chave = firebase.push().key;
          

            // Criando Chat
    
            firebase.child(chave).set({
                proprietario: proprietario.codigo,
                interessado: interessado,
                data:'98',
                produto: produto,
        
            }).then(function() {
                
                // console.log('deu bom chat');
                
              }).catch(function(error) {
                // console.log('deu ruim');
                // console.log(error);
              
              });

            //   Criando Chat Proprietario
            let prop = await firebasex.database().ref('users').child(proprietario.codigo);          
            prop.child('chats').child(chave).set(chave).then(function() {
                      
               
                // console.log('deu bom proprietario');
              }).catch(function(error) {
                // console.log('deu ruim proprietario');
                // console.log(error);
              
              });
            //  Criando Chat Interessado
            let inter = await firebasex.database().ref('users').child(interessado);          
            inter.child('chats').child(chave).set(chave).then(function() {
             
          
              criarPrimeiraMensagem(chave);
                      
            }).catch(function(error) {
            //   console.log('deu ruim interessado');
            //   console.log(error);
            
            });

           
           

        }

        async function criarPrimeiraMensagem(chaveChat) {
             // Criando primeira mensagem do interessado               
             let firebase_talk = await firebasex.database().ref('chats').child(chaveChat).child('conversas');
             let chave_conversa = firebase_talk.push().key;
        
            
             
         
             firebase_talk.child(chave_conversa).set({
                       sender: interessado,
                       receiver:  proprietario.codigo,
                       data: '13 de Jan',
                       mensagem: "Olá Tenho interesse",
                       hora:  new Date().getTime(),
                       visto: 0,
             }).then(function() {
                 console.log('deu bom primeira conversa');
                 
             }).catch(function(error) {
               console.log('deu ruim primeira conversa');
               console.log(error);
             
             });
     
        }

       
        jaExisteConversa();
     
      
      
       
       
       
    }, []);

   
    return (
      <View style={styles.container}>
          <GiftedChat 
              user={usuario} 
              messages={mensagens} 
              onSend={onSendMessage} 
              placeholder={'Digite uma mensagem'}
              alwaysShowSend
              isLoadingEarlier
              isTyping
              textInputStyle = {
                {height: 300}
              }
          />
          {
              Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
          }
      </View>
      
  );
}

const styles = StyleSheet.create ({
  container: {
      flex: 1,
      backgroundColor: '#fff'
  },
  input: {
    height: 100
  }
})