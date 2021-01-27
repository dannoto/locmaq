import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firebase from '../services/firebaseConnection';
import { useNavigation } from '@react-navigation/native';

export default function Anuncios({data, modalvisible, setModalVisible}){

  console.log(data)
  const navigation = useNavigation();
  const modelo = data.modelo + ' / ' + data.ano;
  const user = firebase.auth().currentUser;
  const foto1 = '0-' + data.codigoProduto + '.jpeg';
  const foto2 = '1-' + data.codigoProduto + '.jpeg';
  const foto3 = '2-' + data.codigoProduto + '.jpeg';
  const foto4 = '3-' + data.codigoProduto + '.jpeg';
  const foto5 = '4-' + data.codigoProduto + '.jpeg';
  const foto6 = '5-' + data.codigoProduto + '.jpeg';
  const [loading, setLoading] = useState(false);

  async function deleteEquipamentos() {
    // await firebase.database().ref('equipamentos').child(data.key).remove();

    // await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto1).delete();
    // if(data.imagem1 !== "") {
    //   await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto2).delete();
    // }
    // if(data.imagem2 !== "") {
    //   await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto3).delete();
    // }
    // if(data.imagem3 !== "") {
    //   await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto4).delete();
    // }
    // if(data.imagem4 !== "") {
    //   await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto5).delete();
    // }
    // if(data.imagem5 !== "") {
    //   await firebase.storage().ref().child('equipamentos').child(user.uid).child(data.codigoProduto).child(foto6).delete();
    // }

    // setModalVisible(false)
    console.log(data.key)
    }

  function Edit() {
    if(data.categoria = "Caminhões") {
      navigation.navigate ('EditCaminhao', {key: data.key, subnome: data.subcategoria})
    }
  }

  function filterNome(nome) {
    if(nome.length < 15) {
      return nome;
    }
    return `${nome.substring(0, 15)}...`;
  }

  function filterPreco(preco) {
    if(preco.length < 20) {
      return preco;
    }
    return `${preco.substring(0, 20)}...`;
  }

  function CloseModal() { 
    setModalVisible(false)
  };

  function onClickModal() {
    // setModalVisible(true);
    Alert.alert("","TEM CERTEZA DE QUE DESEJA EXCLUIR ESSE ANÚNCIO?", [
      {
        text: "EXCLUIR", onPress: () => console.log(data.key), 
      },
      {
        text: "CANCELAR", style: "cancel"
      }
    ], 
    { cancelable: false}
    )
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


           <TouchableOpacity style={styles.btn} onPress={() => onClickModal(data.key)}>
              <Text style={styles.txtBtn}>APAGAR</Text>
               </TouchableOpacity> 

               <Modal animationType="fade" transparent={true} visible={modalvisible} onRequestClose={() => {}}>
                <View style={styles.modalWindow}>
                    <View style={styles.modalBody}>
                        <TouchableOpacity style={styles.areaBtnModalClose} onPress={CloseModal}>
                            <AntDesign
                            style={{marginRight: 20, marginBottom: 5}}
                            name='closecircleo'
                            size= {34}
                            color="#fff"
                            />
                        </TouchableOpacity>

                        <Text style={styles.txtBtnModalTitulo}>TEM CERTEZA DE QUE DESEJA EXCLUIR ESSE ANÚNCIO?</Text>
                        <Text style={styles.txtBtnModalTitulo}>{data.key}</Text>

                        <TouchableOpacity style={styles.areaBtnModal} onPress={() => deleteEquipamentos()}>
                            <Text style={styles.txtBtnModal}>EXCLUIR</Text>
                        </TouchableOpacity>
                    </View>
                </View> 
              </Modal>
           
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
    backgroundColor: '#ffa500',
    marginTop: 14,
    borderRadius: 5,
    padding: 6
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
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
  img: {
    width: 180,
    height: 150,
    borderWidth: 3,
    borderColor: '#ffa500',
    marginRight: 10
  },
  modalWindow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBody:{
    width: 350,
    height: 230,
    backgroundColor: '#ffa500',
    borderRadius: 10
  },
  tituloModal: {
    fontSize: 20,
    color: '#222',
    marginTop: 20,
    fontWeight: 'bold'
  },
  areaBtnModal: {
    width: '80%',
    marginLeft: '10%',
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  txtBtnModal: {
    fontSize: 22,
    color: '#ffa500',
    fontWeight: 'bold'
  },
  txtBtnModalTitulo: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  areaBtnModalClose: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row-reverse'
  }
})