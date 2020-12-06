import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Cadastrar Usuário
    async function cadastrar(nome, cpf, email, password) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                nome: nome,
                email: email,
                cpf: cpf
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: nome,
                    cpf: value.user.cpf,
                    email: value.user.email
                };
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error) => {
            if(error.code === 'auth/weak-password'){
                Alert.alert("Oops!", "Sua senha deve ter pelo menos 6 caracteres.");
                return;
            }
            if(error.code === 'auth/email-already-in-use'){
                Alert.alert('Oops!', 'E-mail já cadastrado.');
                return;
            }
            // if(error.code === 'auth/-already-in-use'){
            //     Alert.alert('Oops!', 'E-mail já cadastrado.');
            //     return;
            // }
            if(error.code === 'auth/invalid-email'){
                Alert.alert('Oops!', 'E-mail inválido.')
            }
        })
    }

    //Logar Usuário
    async function logar(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).once('value')
            .then((snapshot) => {
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    cpf: snapshot.val.cpf,
                    email: value.user.email
                };
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error) => {
            if(error.code){
            Alert.alert('Oops!', 'E-mail e/ou Senha inválido(s).');
            return;
            }
        })
    }

    //Salvar dados Login
    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    //Verificar Login
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadStorage();
    }, []);

     //Sair
     async function sair(data) {
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
    }
   
    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, cadastrar, logar, sair }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;