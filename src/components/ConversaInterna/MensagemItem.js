import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MensagemItem({data, me}){

  return(
    <View style={styles.container}>
      {(data.uid == me) ? 
        (
          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end'}}>
            <View style={[styles.areaMensagem, {backgroundColor: '#dddddd'}]}>
            <Text style={{alignSelf: 'flex-end', fontSize: 17}}>{data.m}</Text>
              <Text style={{alignSelf: 'flex-end', fontSize: 14, marginTop: 5}}>{data.date} às {data.hours}</Text>
            </View>

            <View style={styles.areaPerfil}>
            {/* {avatar != '' ?
                <Image style={styles.imgPerfil} source={{uri: avatar.url}}/>
                : */}
                <Ionicons
                    name={'md-person-circle'}
                    size={55}
                    color='#bbb'        
                /> 
            {/* } */}
            </View>
          </View>
          
        ) :
        (
          <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start'}}>
            <View style={styles.areaPerfil}>
              {/* {avatar != '' ?
                <Image style={styles.imgPerfil} source={require('../../assets/caminhao.jpg')}/>
                : */}
                <Ionicons
                    name={'md-person-circle'}
                    size={55}
                    color='#ffa500'       
                /> 
              {/* } */}
            </View>

            <View style={[styles.areaMensagem, {backgroundColor: '#ffa500'}]}>
              <Text style={{alignSelf: 'flex-start', fontSize: 17}}>{data.m}</Text>
              <Text style={{alignSelf: 'flex-start', fontSize: 14, marginTop: 5}}>{data.date} às {data.hours}</Text>
            </View>
          </View>
        )
      }
    </View>
    
  );
}

const styles = StyleSheet.create ({
  container: {
    paddingHorizontal: 10,
    marginTop: 5
  },
  areaMensagem: {
    padding: 12,
    alignSelf: 'baseline',
    maxWidth: '80%',
    marginHorizontal: 10,
    marginTop: 5,
    borderRadius: 10
  },
  imgPerfil: {
    width: 55, 
    height: 55, 
    borderRadius: 23,
    borderWidth: 3, 
    borderColor: '#ffa500', 
    borderRadius: 27
  }
})