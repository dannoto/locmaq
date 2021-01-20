import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HeaderBackButton } from '@react-navigation/stack';

import MensagemItem from '../../components/ConversaInterna/MensagemItem';

export default ({route, navigation}) => {

  const navigacao = useNavigation();
  const {proprietario, produto, interessado} = route.params;
  const chatArea = React.useRef(null);
  const { user } = useContext( AuthContext );

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
  const [dadosProprietario,setDadosProprietario] = useState('');



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

 
  
  useEffect(() => {  
      navigation.setOptions({
          headerLeft: ({ onPress }) => (
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  <HeaderBackButton onPress={ onPress }/>

                  <View>
                      {dadosProprietario != '' ?
                      <Image style={styles.imgPerfil} source={{uri:dadosProprietario }}/>
                      :
                      <Ionicons
                          name={'md-person-circle'}
                          size={55}
                          color='#ffa500'        
                      /> 
                      }
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

      async function jaExisteConversa() {
          await firebase.database().ref('chats').orderByChild('produto').equalTo(produto).once('value')
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
          let firebasex = await firebase.database().ref('chats');
          let chave = firebasex.push().key;
        

          // Criando Chat
  
          firebasex.child(chave).set({
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
          let prop = await firebase.database().ref('users').child(proprietario.codigo);          
          prop.child('chats').child(chave).set(chave).then(function() {
                    
              
              // console.log('deu bom proprietario');
            }).catch(function(error) {
              // console.log('deu ruim proprietario');
              // console.log(error);
            
            });
          //  Criando Chat Interessado
          let inter = await firebase.database().ref('users').child(interessado);          
          inter.child('chats').child(chave).set(chave).then(function() {
            
        
            criarPrimeiraMensagem(chave);
                    
          }).catch(function(error) {
          //   console.log('deu ruim interessado');
          //   console.log(error);
          
          });

          
          

      }

      async function criarPrimeiraMensagem(chaveChat) {
            // Criando primeira mensagem do interessado               
            let firebase_talk = await firebase.database().ref('chats').child(chaveChat).child('conversas');
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

  async function getDadosProprietario() {
    await firebase.database().ref('users').child(proprietario.codigo).on('value', (snapshot) => {
    

        // snapshot.forEach((childItem) => {
        //   let data = {
           
        //     nome: childItem.val().nome,
        //     cpf: childItem.val().cpf,
        //     email: childItem.val().email,
        //     // avatar: childItem.val().avatar,
        //   };

          setDadosProprietario(snapshot.val().avatar.url);

       
  
        // })
       
         
    })
}

      
      jaExisteConversa();
      getDadosProprietario()
  
     
    
    



    
      
      
      
  }, []);

console.log(dadosProprietario)


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