import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Flat({data}){
    return(
      <View>

          <Text>{data.condicao}</Text>
          <Text>{data.fabricante}</Text>
          <Text>{data.ano}</Text>
          <Text>{data.modelo}</Text>
          <Text>{data.tipo}</Text>
          <Text>{data.tracao}</Text>
          <Text>{data.consumo}</Text>
          <Text>{data.hodometro}</Text>
          <Text>{data.horimetro}</Text>
          <Text>{data.capacidade}</Text>
          <Text>{data.seguro}</Text>
          <Text>{data.fabricantebau}</Text>
          <Text>{data.anobau}</Text>
          <Text>{data.dimensoesbau}</Text>
          <Text>{data.fabricantetanque}</Text>
          <Text>{data.anotanque}</Text>
          <Text>{data.capacidadetanque}</Text>
          <Text>{data.fabricantecarroceria}</Text>
          <Text>{data.anocarroceria}</Text>
          <Text>{data.capacidadecarroceria}</Text>
          <Text>{data.fabricantecacamba}</Text>
          <Text>{data.anocacamba}</Text>
          <Text>{data.capacidadecacamba}</Text>
          <Text>{data.cacamba}</Text>
          <Text>{data.fabricantecomboio}</Text>
          <Text>{data.anocomboio}</Text>
          <Text>{data.modelocomboio}</Text>
          <Text>{data.capacidadecomboio}</Text>
          <Text>{data.larguraplataforma}</Text>
          <Text>{data.alturaplataforma}</Text>
          <Text>{data.capacidadesilo}</Text>
          <Text>{data.modeloplataforma}</Text>
          <Text>{data.capacidadepoliguidaste}</Text>
          <Text>{data.poliguidaste}</Text>
          <Text>{data.estado}</Text>
          <Text>{data.cidade}</Text>
          <Text>{data.preco}</Text>
          <Text>{data.precoDiaria}</Text>
          <Text>{data.precoSemanal}</Text>
          <Text>{data.precoMensal}</Text>
          <Text>{data.subcategoria}</Text>
          <Text>{data.categoria}</Text>
      </View>
    );
}

