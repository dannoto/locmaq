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
                celular: '',
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
                    celular: value.user.celular,
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
                celular: '',
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
                    celular: value.user.celular,
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
                    celular: snapshot.val().celular,
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

    // // Inserindo Categorias
    // useEffect (() => {
    //     async function dados() {
    //         let categorias = firebase.database().ref('categorias');
    //         let chave = categorias.push().key;
    //         await categorias.child(chave).set({ 
    //            categoria: 'Serviços'
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
    //            nome: 'Outro',
    //            servico: '-MS2rbqavp5zN_3QZsSK'
    //         });  
    //     }

    //     dados();
    // }, []);

    // Inserindo Equipamentos - Britadores
    async function cadastrarBritador(condicao, fabricante, ano, modelo, caracteristica, capacidade, peso, potencia, seguro, infoAdicionais, 
        estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let britador = await firebase.database().ref('equipamentos');
        let chave = britador.push().key;

        britador.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            modelo: modelo,
            ano: ano,
            caracteristica: caracteristica,
            capacidade: capacidade,
            peso: peso,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Caminhões
    async function cadastrarCaminhao(condicao, fabricante, ano, modelo, tipo, tracao, consumo, hodometro, horimetro, capacidade, potencia, seguro, infoAdicionais, 
        estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {
    
        let caminhao = await firebase.database().ref('equipamentos');
        let chave = caminhao.push().key;

        caminhao.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            modelo: modelo,
            ano: ano,
            tipo: tipo,
            tracao: tracao,
            consumo: consumo,
            hodometro: hodometro,
            horimetro: horimetro,
            capacidade: capacidade,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Compactadores
    async function cadastrarCompactador(condicao, fabricante, modelo, ano, caracteristica, tipo, motorizacao, consumo, peso, horimetro, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let compactador = await firebase.database().ref('equipamentos');
        let chave = compactador.push().key;

        compactador.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            modelo: modelo,
            ano: ano,
            caracteristica: caracteristica,
            tipo: tipo,
            motorizacao: motorizacao,
            consumo: consumo,
            peso: peso,
            horimetro: horimetro,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Empilhadeiras
    async function cadastrarEmpilhadeira(condicao, fabricante, modelo, ano, caracteristica, tipo, capacidade, altura, peso, potencia, seguro, infoAdicionais, 
        estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let empilhadeira = await firebase.database().ref('equipamentos');
        let chave = empilhadeira.push().key;

        empilhadeira.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            caracteristica: caracteristica, 
            tipo: tipo, 
            capacidade: capacidade,
            altura: altura,
            peso: peso, 
            potencia: potencia,
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Escavadeiras
    async function cadastrarEscavadeira(condicao, fabricante, modelo, ano, caracteristica, tipo, tracao, consumo, peso, horimetro, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let escavadeira = await firebase.database().ref('equipamentos');
        let chave = escavadeira.push().key;

        escavadeira.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            caracteristica: caracteristica, 
            tipo: tipo, 
            tracao: tracao, 
            consumo: consumo,
            peso: peso,
            horimetro: horimetro,
            potencia: potencia,
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Guindastes
    async function cadastrarGuindaste(condicao, fabricante, modelo, ano, caracteristica, capacidade, lanca, potencia, seguro, infoAdicionais, 
        estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let guindaste = await firebase.database().ref('equipamentos');
        let chave = guindaste.push().key;

        guindaste.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            caracteristica: caracteristica, 
            capacidade: capacidade, 
            lanca: lanca,
            potencia: potencia,
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Manipuladores Telescópico
    async function cadastrarManipulador(condicao, fabricante, modelo, ano, consumo, peso, lanca, horimetro, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let manipulador = await firebase.database().ref('equipamentos');
        let chave = manipulador.push().key;

        manipulador.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            consumo: consumo, 
            peso: peso, 
            lanca: lanca,
            horimetro: horimetro,
            potencia: potencia,
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Martelos Hidraúlico
    async function cadastrarMartelo(condicao, fabricante, modelo, ano, peso, seguro, infoAdicionais, estado, 
        cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let martelo = await firebase.database().ref('equipamentos');
        let chave = martelo.push().key;

        martelo.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            peso: peso, 
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Plataformas Aérea
    async function cadastrarPlataforma(condicao, fabricante, modelo, ano, caracteristica, capacidade, altura, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let plataforma = await firebase.database().ref('equipamentos');
        let chave = plataforma.push().key;

        plataforma.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            caracteristica: caracteristica, 
            capacidade: capacidade,
            altura: altura,
            potencia: potencia,
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Tratores
    async function cadastrarTrator(condicao, fabricante, modelo, ano, consumo, peso, horimetro, potencia, seguro, infoAdicionais, 
        estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let trator = await firebase.database().ref('equipamentos');
        let chave = trator.push().key;

        trator.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,  
            modelo: modelo, 
            ano: ano,
            consumo: consumo,
            peso: peso,
            horimetro: horimetro,
            potencia: potencia,
            seguro: seguro, 
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Usinas de Asfalto
    async function cadastrarUsina(condicao, fabricante, ano, modelo, caracteristica, capacidade, peso, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora,  usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let usina = await firebase.database().ref('equipamentos');
        let chave = usina.push().key;

        usina.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            modelo: modelo,
            ano: ano,
            caracteristica: caracteristica,
            capacidade: capacidade,
            peso: peso,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2,
        });
    }

    // Inserindo Equipamentos - Usinas de Concreto
    async function cadastrarUsinaConcreto(condicao, fabricante, ano, modelo, caracteristica, tipo, capacidade, peso, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2) {

        let usinaConcreto = await firebase.database().ref('equipamentos');
        let chave = usinaConcreto.push().key;

        usinaConcreto.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            modelo: modelo,
            ano: ano,
            caracteristica: caracteristica,
            tipo: tipo,
            capacidade: capacidade,
            peso: peso,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Equipamentos - Perfuratriz
    async function cadastrarPerfuratriz(condicao, fabricante, modelo, ano, caracteristica, perfuracao, peso, potencia, seguro, 
        infoAdicionais, estado, cidade, preco, precoHora, usuario, subcategoria, categoria, codigoProduto, imagem0, imagem1, imagem2,) {

        let perfuratriz = await firebase.database().ref('equipamentos');
        let chave = perfuratriz.push().key;

        perfuratriz.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            fabricante: fabricante,
            modelo: modelo,
            ano: ano,
            caracteristica: caracteristica,
            perfuracao: perfuracao,
            peso: peso,
            potencia: potencia,
            seguro: seguro,
            infoAdicionais: infoAdicionais,
            estado: estado,
            cidade: cidade,
            preco: preco,
            precoHora: precoHora,
            categoria: categoria,
            subcategoria:subcategoria,
            codigoProduto: codigoProduto,
            imagem0: imagem0,
            imagem1: imagem1,
            imagem2: imagem2
        });
    }

    // Inserindo Serviços
    async function cadastrarServicos(condicao, titulo, estado, cidade, descricao, usuario, subcategoria, categoria, codigoServico, imagem0, imagem1) {

        let servicos = await firebase.database().ref('servicos');
        let chave = servicos.push().key;

        servicos.child(chave).set({
            usuario: usuario,
            condicao: condicao,
            titulo: titulo,
            estado: estado,
            cidade: cidade,
            descricao: descricao,
            subcategoria:subcategoria,
            categoria: categoria,
            codigoServico: codigoServico,
            imagem0: imagem0,
            imagem1: imagem1
        });
    }

        // Enviar Mensagem Suporte
        async function mensagemSuporte(assunto, mensagem, usuario) {

            let suporte = await firebase.database().ref('suporte');
            let chave = suporte.push().key;
    
            suporte.child(chave).set({
                assunto: assunto,
                mensagem: mensagem,
                usuario: usuario
            });
        }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, cadastrarPF, cadastrarPJ, logar, sair, cadastrarBritador, cadastrarCaminhao, cadastrarCompactador, cadastrarEmpilhadeira, 
        cadastrarEscavadeira, cadastrarGuindaste, cadastrarManipulador, cadastrarMartelo, cadastrarPlataforma, cadastrarTrator, cadastrarUsina, cadastrarUsinaConcreto, cadastrarPerfuratriz,
        cadastrarServicos, mensagemSuporte
        }}>
        {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
