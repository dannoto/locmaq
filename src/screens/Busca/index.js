import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from '../../services/firebaseConnection';
import Categories from '../../components/Categories'

export default () => {

    const [categorias, setCategorias] = useState([]);

    // Buscando Categorias
    useEffect(() => {
        async function getCategories() {
            await firebase.database().ref('categorias').on('value', (snapshot) => {
                setCategorias([]);

                snapshot.forEach((childItem) => {
                    let data = {
                        key: childItem.key,
                        name: childItem.val().categoria
                    };

                    setCategorias(oldArray => [...oldArray, data].sort());
                })
            })
        }

        getCategories();
    }, []);


    return (
        <View>
            <Text>SELECIONE A CATEGORIA</Text>
            <FlatList
                data={categorias}
                renderItem={({item}) => (<Categories data={item}/>)}
                keyExtractor={item => item.key}
            />
      </View>
    );
}

// import React, { Component, useState, useEffect, useRef, isValidElement, useContext } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import firebase from '../../services/firebaseConnection';
// import AsyncStorage from '@react-native-community/async-storage';
// // import {AuthContext} from '../../contexts/auth';



// //  MONNIK SEGUE OBSERVAÇOES NOS COMENTARIOS


// // Eu fiz a funçao aqui ao inves de fazer no auth pra ficar organizado, mas voce pode organizar isso lá e aqui so importar com o AuthContext 
// // igual fez em ./src/Conta/Index.js

// export default function app() {

// // 	// Esta constante na verdade vai precisar receber um array, ou seja ao inves de pegar somente 'categorias/1/nome' eu vou ter que pegar somente
// // 	// 'categorias' e isso vai gerar um lista, array com todas as categorias [...] voce vai colocar isso dentro da const categorias e dps jogar
// // 	 // dentro de um flalist e personalizar e estilizar.
// // 	const [categorias, setCategorias] = []; 






// // 	useEffect( () => {


// // 		async function dados(){
// // 			// Pegando 
// // 			 await firebase.database().ref('categorias').on('value', (snapshot) => {
// // 			 	// Salvando o resultado da consulta no banco de dados dentro da variavel datas
// // 			 	let datas = snapshot.val();
// // 			 	// Colocando todo o array/objeto/lista dentro da const categorias
// // 			 	setCategorias(datas);

// // 			 	// Caso queira ver o resultado da consulta só olhar no prompt de comando verdinho que roda o servidor js e vai ta la o print do console.
// // 			 	// Vai estar  [undefined, {"imagem": "trator.png", "nome": "trator"}, {"imagem": "retro.png", "nome": "retro"}]
// // 			 	console.log(datas);
// // 			 })
// // 		}

// // dados();
// // 	}, []);


	




// 	// return (

// 	// 	// Para exibir o array com as categorias aqui vai ter que fazer o FlaList e passar o dados, não esquece da questao do KeyExtractor
// 	// 	// Vai ter que pensar sobre isso e ver algo referente.
// 	// 	<View style={{marginTop: 25}}>
// 	// 	<FlatList

// 	// 		data = {}
// 	// 		render = {}
// 	// 		keyExtractor = {}
// 	// 	/>
			
		
// 	// 	</View>
// 	// 	)
// }