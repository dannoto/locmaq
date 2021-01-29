import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import firebase from '../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default function Anuncios({data}){

  const navigation = useNavigation();
  const modelo = data.modelo + ' / ' + data.ano;
  const user = firebase.auth().currentUser;
  
  const foto1 = '0-' + data.codigoProduto + '.jpeg';
  const foto2 = '1-' + data.codigoProduto + '.jpeg';
  const foto3 = '2-' + data.codigoProduto + '.jpeg';
  const foto4 = '3-' + data.codigoProduto + '.jpeg';
  const foto5 = '4-' + data.codigoProduto + '.jpeg';
  const foto6 = '5-' + data.codigoProduto + '.jpeg';
  

  async function deleteEquipamentos() {
    await firebase.database().ref('equipamentos').child(data.key).remove();

    await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto1).delete();
    if(data.imagem1 !== "") {
      await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto2).delete();
    }
    if(data.imagem2 !== "") {
      await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto3).delete();
    }
    if(data.imagem3 !== "") {
      await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto4).delete();
    }
    if(data.imagem4 !== "") {
      await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto5).delete();
    }
    if(data.imagem5 !== "") {
      await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto6).delete();
    }

    Alert.alert("", "EXCLUÍDO COM SUCESSO!")
  }

  function Edit() {
    if(data.categoria = "Britadores") {
      // navigation.navigate ('EditBritador', {key: data.key, subnome: data.subcategoria})
      alert('Britadores')
    }
    if(data.categoria = "Caminhões") {
      navigation.navigate ('EditCaminhao', {key: data.key, subnome: data.subcategoria})
    }
    if(data.categoria = "Compactadores") {
      // navigation.navigate ('EditCompactador', {key: data.key, subnome: data.subcategoria})
      alert('Compactadores')
    }
    if(data.categoria = "Empilhadeiras") {
      // navigation.navigate ('EditEmpilhadeira', {key: data.key, subnome: data.subcategoria})
      alert('Empilhadeiras')
    }
    if(data.categoria = "Escavadeiras") {
      // navigation.navigate ('EditEscavadeira', {key: data.key, subnome: data.subcategoria})
      alert('Escavadeiras')
    }
    if(data.categoria = "Guindastes") {
      // navigation.navigate ('EditGuindaste', {key: data.key, subnome: data.subcategoria})
      alert('Guindastes')
    }
    if(data.categoria = "Maninpuladores Telescópico") {
      // navigation.navigate ('EditManinpuladorTelescopico', {key: data.key, subnome: data.subcategoria})
      alert('Maninpuladores Telescópico')
    }
    if(data.categoria = "Martelos Hidraúlico") {
      // navigation.navigate ('EditMarteloHidraulico', {key: data.key, subnome: data.subcategoria})
      alert('Martelos Hidraúlico')
    }
    if(data.categoria = "Perfuratriz") {
      // navigation.navigate ('EditPerfuratriz', {key: data.key, subnome: data.subcategoria})
      alert('Perfuratriz')
    }
    if(data.categoria = "Plataformas Aérea") {
      // navigation.navigate ('EditPlataformaAerea', {key: data.key, subnome: data.subcategoria})
      alert('Plataformas Aérea')
    }
    if(data.categoria = "Tratores") {
      // navigation.navigate ('EditTratores', {key: data.key, subnome: data.subcategoria})
      alert('Tratores')
    }
    if(data.categoria = "Usinas de Asfalto") {
      // navigation.navigate ('EditUsinadeAsfalto', {key: data.key, subnome: data.subcategoria})
      alert('Usinas de Asfalto')
    }
    if(data.categoria = "Usinas de Concreto") {
      // navigation.navigate ('EditUsinadeConcreto', {key: data.key, subnome: data.subcategoria})
      alert('Usinas de Concreto')
    }
  }

  function filterNome(nome) {
    if(nome.length < 18) {
      return nome;
    }
    return `${nome.substring(0, 18)}...`;
  }

  function filterPreco(preco) {
    if(preco.length < 20) {
      return preco;
    }
    return `${preco.substring(0, 20)}...`;
  }

  function onClickModal() {
    Alert.alert("ATENÇÃO","TEM CERTEZA DE QUE DESEJA EXCLUIR ESSE ANÚNCIO?", [
      {
        text: "EXCLUIR", onPress: () => deleteEquipamentos()
      },
      {
        text: "CANCELAR", style: "cancel"
      }
    ])
  }

  return(
    <View style={styles.areaAnuncios}>

      <View>
        <Image style={styles.img} source={{uri: data.imagem0}}/>
      </View>

      <View>
        <Text style={styles.subcategoria}>{filterNome(data.subcategoria)}</Text>
        <Text style={styles.modelo}>{modelo}</Text>

        {data.condicao == 'ALUGUEL' ?
          (
              <Text style={styles.preco}>{filterPreco('Diária ' + data.precoDiaria)}</Text>
          ) :
          (
              <Text style={styles.preco}>{filterPreco(data.preco)}</Text>
          )
        }

        <Text style={styles.condicao}>{data.condicao}</Text>

        <View style={styles.areaBtn}>
          <TouchableOpacity style={[styles.btn, {marginRight: 10}]} onPress={Edit}>
            <Text style={styles.txtBtn}>EDITAR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => onClickModal()}>
            <Text style={styles.txtBtn}>APAGAR</Text>
          </TouchableOpacity> 
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  areaAnuncios: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    padding: 20
  },
  areaBtn: {
    flexDirection: 'row',
  },
  btn: {
    width: '34%',
    backgroundColor: '#ffa500',
    marginTop: 8,
    borderRadius: 5,
    padding: 6,
  },
  txtBtn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subcategoria: {
    color: '#222',
    fontSize: 16,
    marginLeft: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  modelo: {
    color: '#222',
    fontSize: 17,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  condicao: {
    color: '#ffa500',
    fontSize: 17,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  preco: {
    color: '#222',
    fontSize: 17,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  img: {
    width: 180,
    height: 150,
    borderWidth: 3,
    borderColor: '#ffa500',
    marginRight: 10
  }
})