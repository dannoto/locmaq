import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ListaConversas({data}){

  function filterTitulo(titulo) {
    if(titulo.length < 30) {
      return titulo;
    }
    return `${titulo.substring(0, 30)}...`;
  }

  function filterNome(nome) {
    if(nome.length < 33) {
      return nome;
    }
    return `${nome.substring(0, 33)}...`;
  }

  function filterMensagem(mensagem) {
    if(mensagem.length < 34) {
      return mensagem;
    }
    return `${mensagem.substring(0, 34)}...`;
  }

    return(
      <View style={styles.container}>
        <TouchableOpacity>
          <View style={styles.areaConversas}>
            
              <View style={styles.areaImg}>
                <Image style={styles.img} source={{uri: data.imagem}}/>
              </View>

              <View style={styles.areaTxt}>
                <Text style={styles.titulo}>{filterTitulo('FABRICANTE - MODELO - ANO')}</Text>
                <Text style={styles.nome}>{filterNome('MONNIK JESUS DA SILVA')}</Text>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.mensagem}>{filterMensagem('Olá, Tudo bem?')}</Text>

                  <View style={styles.areaQtdMensagem}>
                    <Text style={styles.qtdMensagem}>3</Text>
                  </View>
                </View>
                
                <Text style={styles.data}>12/01/2021 às 18:34</Text>
              </View>
          </View>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  areaConversas: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    padding: 10
  },
  areaTxt: {
    flex: 1
  },
  titulo: {
    color: '#222',
    fontSize: 16,
    marginLeft: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  nome: {
    color: '#222',
    opacity: 0.8,
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  mensagem: {
    color: '#222',
    fontSize: 17,
    marginLeft: 5,
    marginTop: 5
  },
  areaQtdMensagem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ffa500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  qtdMensagem: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold'
  },
  data: {
    color: '#222',
    fontSize: 14,
    marginLeft: 5,
    marginTop: 5
  },
  areaImg: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: '#ffa500',
    borderRadius: 40,
    marginRight: 10
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40
  }
})