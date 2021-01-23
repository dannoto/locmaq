import React, { createContext, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Cadastrar Usuário PF
    async function cadastrarPF( nome, cpf, tipo, avatar, email, password ) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                status: 0,
                plano: 0,
                nome: nome,
                email: email,
                cpf: cpf,
                tipo: tipo,
                verificado: 0,
                limite: 0,
                avatar: avatar
            })
            .then(() => {
                let data = {
                    uid: value.user.uid,
                    nome: value.user.nome,
                    cpf: value.user.cpf,
                    email: value.user.email,
                    tipo: value.user.tipo,
                    limite: value.user.limite,
                    plano: value.user.plano,
                    verificado: value.user.verificado,
                    avatar: value.user.avatar
                };
                setUser(data);
                storageUser(data);
            })
        })
        .catch((error) => {
            if(error.code === 'auth/email-already-in-use'){
                Alert.alert('Oops!', 'E-mail já cadastrado.');
                return;
            }
            if(error.code === 'auth/weak-password'){
                Alert.alert("Oops!", "Sua senha deve ter pelo menos 6 caracteres.");
                return;
            }
            if(error.code === 'auth/invalid-email'){
                Alert.alert('Oops!', 'E-mail inválido.')
            }
        })
    }

    //Cadastrar Usuário PJ
    async function cadastrarPJ( empresa, cnpj, tipo, avatar, email, password ) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('users').child(uid).set({
                status: 0,
                plano: 0,
                empresa: empresa,
                email: email,
                cnpj: cnpj,
                tipo: tipo,
                verificado: 0,
                limite: 0,
                avatar: avatar
            })
            .then(() => {
                let data = {
                    uid: value.user.uid,
                    empresa: value.user.empresa,
                    cnpj: value.user.cnpj,
                    email: value.user.email,
                    tipo: value.user.tipo,
                    limite: value.user.limite,
                    plano: value.user.plano,
                    verificado: value.user.verificado,
                    avatar: value.user.avatar
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
                    cpf: snapshot.val().cpf,
                    empresa: snapshot.val().empresa,
                    cnpj: snapshot.val().cnpj,
                    email: snapshot.val().email,
                    tipo: snapshot.val().tipo,
                    limite: snapshot.val().limite,
                    plano: snapshot.val().plano,
                    status: snapshot.val().status,
                    verificado: snapshot.val().verificado,
                    avatar: snapshot.val().avatar
                }
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

    // //Pegar imagens dos equipamentos no Storage
    // async function getImagens (codigoProduto,userId,index) {
    //     if (index == null) {
    //         let um = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child('0-'+codigoProduto+'.jpeg').getDownloadURL() 
    //         let dois = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child('1-'+codigoProduto+'.jpeg').getDownloadURL() 
    //         let tres = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child('2-'+codigoProduto+'.jpeg').getDownloadURL() 
    //         let quatro = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child('3-'+codigoProduto+'.jpeg').getDownloadURL() 
    //         let cinco = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child('4-'+codigoProduto+'.jpeg').getDownloadURL() 
    //         let seis = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child('5-'+codigoProduto+'.jpeg').getDownloadURL() 

    //         return [{um:um},{dois:dois},{tres:tres},{quatro:quatro},{cinco:cinco},{seis:seis}] 
    //     } 
    //     else {
    //     let um = await firebase.storage().ref('equipamentos/'+userId+'/'+codigoProduto+'').child(index+'-'+codigoProduto+'.jpeg').getDownloadURL() 
    //         return [{um:um}]
    //     }
    // }

    // // Inserindo Categorias
    // useEffect (() => {
    //     async function dados() {
    //         let categorias = firebase.database().ref('categorias');
    //         let chave = categorias.push().key;
    //         await categorias.child(chave).set({ 
    //            categoria: 'Martelos Hidraúlico'
    //         });  
    //     }

    //     dados();
    // }, []);

    // // Inserindo Subcategorias
    // useEffect (() => {
    //     async function dados() {
    //         let subcategorias = firebase.database().ref('subcategorias');
    //         let chave = subcategorias.push().key;
    //         await subcategorias.child(chave).set({ 
    //            nome: 'Trator de Esteira',
    //            categoria: '-MOYhjWTHG77Uf6JCH7W'
    //         });  
    //     }

    //     dados();
    // }, []);

    // Inserindo Equipamentos
    async function cadastrarEquipamentos(condicao, fabricante, ano, modelo, tipo, tracao, caracteristica, peso, consumo, hodometro, horimetro, capacidade, potencia, seguro, 
    infoAdicionais, estado, cidade, preco, precoDiaria, precoSemanal, precoMensal, usuario, subcategoria, categoria, codigoProduto,imagem0,imagem1,imagem2,imagem3,imagem4,imagem5) {


        let equipamentos = await firebase.database().ref('equipamentos');
        let chave = equipamentos.push().key;

        equipamentos.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            ano: ano,
            modelo: modelo,
            tipo: tipo,
            tracao: tracao,
            consumo: consumo,
            hodometro: hodometro,
            horimetro: horimetro,
            caracteristica: caracteristica,
            peso: peso,
            capacidade: capacidade,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoDiaria: precoDiaria,
            precoSemanal: precoSemanal,
            precoMensal: precoMensal,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0:imagem0,
            imagem1:imagem1,
            imagem2:imagem2,
            imagem3:imagem3,
            imagem4:imagem4,
            imagem5:imagem5,

        });
    }

    // // Inserindo Favoritos
    // async function cadastrarEquipamentos() {
    //     let favoritos = await firebase.database().ref('users').child('favoritos');
    //     let chave = favoritos.push().key;
    
    //     favoritos.child(chave).set({
    //         equipamento: ,
    //     });
    // }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, cadastrarPF, cadastrarPJ, logar, sair, cadastrarEquipamentos }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
