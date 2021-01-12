import React, { useState, useEffect, useRef, isValidElement } from 'react';
import { View, Text } from 'react-native';
import firebasex from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default ({route}) => {

    const navigation = useNavigation();
    const {proprietario, produto, interessado} = route.params;

 



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
            // setChild(chave);

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
                // console.log('deu bom interessado');
                
            }).catch(function(error) {
            //   console.log('deu ruim interessado');
            //   console.log(error);
            
            });

        }

       
        jaExisteConversa();
     
      
      
       
       
       
    }, []);

    return (
        <View>
            <Text> produto {produto}</Text>
              <Text> proprietario {proprietario.nome} - {proprietario.codigo}</Text>
                <Text> interessado {interessado}</Text>
        </View>
    );
}