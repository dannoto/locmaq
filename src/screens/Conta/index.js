import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth'

export default () => {

    const { user, sair } = useContext(AuthContext);

    return (
        <View>
            <Text>Conta</Text>
            <Text>{ user && user.nome }</Text>
            <Button
            title="Sair"
            onPress={() => sair()}
            />
        </View>
    );
}
