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

    Alert.alert("", "EXCLUÍDO COM SUCESSO!")
  }

  function Edit() {
    navigation.navigate ('EditForm', {key: data.key, subnome: data.subcategoria, catnome: data.categoria})
  }

  function filterNome(nome) {
    if(nome.length < 18) {
      return nome;
    }
    return `${nome.substring(0, 18)}...`;
  }

  function filterModelo(modelo) {
    if(modelo.length < 15) {
      return modelo;
    }
    return `${modelo.substring(0, 15)}...`;
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

      <View style={styles.containerImg}>
        <View style={styles.areaImg}>
          <Image style={styles.img} source={{uri: data.imagem0}}/>
        </View>
      </View>

      <View style={styles.areaInfo}>
        <Text style={styles.subcategoria}>{filterNome(data.subcategoria)}</Text>
        <Text style={styles.modelo}>{filterModelo(modelo)}</Text>
        <Text style={styles.condicao}>{data.condicao}</Text>

        {data.condicao == 'ALUGUEL' ?
          (
              <Text style={styles.preco}>{filterPreco(data.precoHora + ' / Hora')}</Text>
          ) :
          (
              <Text style={styles.preco}>{filterPreco(data.preco)}</Text>
          )
        }

        <View style={styles.areaBtn}>
          <TouchableOpacity style={styles.btn} onPress={Edit}>
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
    padding: 10
  },
  containerImg: {
    width: '50%'
  },
  areaInfo: {
    width: '50%'
  },
  areaBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    width: '48%',
    backgroundColor: '#ffa500',
    marginTop: 14,
    borderRadius: 5,
    padding: 6,
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
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
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  condicao: {
    color: '#ffa500',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  preco: {
    color: '#222',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  areaImg: {
    width: '95%',
    height: 150,
    borderWidth: 3,
    borderColor: '#ffa500'
  },
  img: {
    width: '100%',
    height: 144,
    resizeMode: 'cover'
  }
})