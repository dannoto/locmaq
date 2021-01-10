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
    //            nome: 'Trator Agrícola',
    //            categoria: '-MOYhjWTHG77Uf6JCH7W'
    //         });  
    //     }

    //     dados();
    // }, []);

    // Inserindo Equipamentos - Caminhão
    async function cadastrarEquipamentosCaminhao(
        condicao, 
        fabricante, 
        ano, 
        modelo, 
        tipo, 
        tracao, 
        consumo, 
        hodometro, 
        horimetro, 
        capacidade, 
        seguro, 
        fabricantebau, 
        anobau, 
        dimensoesbau,
        fabricantetanque,
        anotanque,
        capacidadetanque,
        fabricantecarroceria,
        anocarroceria,
        capacidadecarroceria,
        fabricantecacamba,
        anocacamba,
        capacidadecacamba,
        cacamba,
        fabricantecomboio,
        anocomboio,
        modelocomboio,
        capacidadecomboio,
        larguraplataforma,
        alturaplataforma,
        capacidadesilo, 
        modeloplataforma,
        capacidadepoliguidaste,
        poliguidaste,
        estado, 
        cidade, 
        preco,
        precoDiaria,
        precoSemanal,
        precoMensal, 
        usuario, 
        subcategoria, 
        categoria,
        imagensURL) {

        let caminhao = await firebase.database().ref('equipamentos');
        let chave = caminhao.push().key;

        caminhao.child(chave).set({
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
            capacidade: capacidade,
            seguro: seguro,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoDiaria: precoDiaria,
            precoSemanal: precoSemanal,
            precoMensal: precoMensal,
            fabricanteBau: fabricantebau,
            anoBau: anobau,
            dimensoesBau: dimensoesbau,
            fabricanteTanque: fabricantetanque,
            anoTanque: anotanque,
            capacidadeTanque: capacidadetanque,
            fabricanteCarroceria: fabricantecarroceria,
            anoCarroceria: anocarroceria,
            capacidadeCarroceria: capacidadecarroceria,
            fabricanteCacamba: fabricantecacamba,
            anoCacamba: anocacamba,
            capacidadeCacamba: capacidadecacamba,
            caracteristicasCacamba: cacamba,
            fabricanteComboio: fabricantecomboio,
            anoComboio: anocomboio,
            modeloComboio: modelocomboio,
            modeloPlataforma: modeloplataforma,
            capacidadePoliguidaste: capacidadepoliguidaste,
            capacidadeComboio: capacidadecomboio,
            larguraPlataforma:larguraplataforma,
            alturaPlataforma:alturaplataforma,
            capacidadesilo: capacidadesilo, 
            caracteristicasPoliguidaste: poliguidaste,
            categoria: categoria,
            subcategoria:subcategoria,
            imagensURL: imagensURL
        });
    }

     // Inserindo Equipamentos - Britador
     async function cadastrarEquipamentosBritador(
        condicao, 
        fabricante, 
        ano, 
        modelo, 
        caracteristica, 
        capacidade,
        peso, 
        seguro, 
        estado, 
        cidade, 
        preco, 
        precoDiaria,
        precoSemanal,
        precoMensal,
        usuario, 
        subcategoria, 
        categoria,
        imagensURL) {

        let britador = await firebase.database().ref('equipamentos');
        let chave = britador.push().key;

        caminhao.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            ano: ano,
            modelo: modelo,
            caracteristica: caracteristica,
            capacidadeProducao: capacidade,
            pesoOperacional: peso,
            seguro: seguro,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoDiaria: precoDiaria,
            precoSemanal: precoSemanal,
            precoMensal: precoMensal,
            categoria: categoria,
            subcategoria:subcategoria,
            imagensURL: imagensURL
        });
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, cadastrar, logar, sair, cadastrarEquipamentosCaminhao, cadastrarEquipamentosBritador }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
