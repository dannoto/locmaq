import React from 'react';
import { View, Text } from 'react-native';

export default function Categories({data}){
    return(
        <View>
          <View>
            <Text>{data.name}</Text>
          </View>
        </View>
    );
}