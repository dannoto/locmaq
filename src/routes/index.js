import React, { useContext } from 'react';
import { Background, Container, Logo, LoadingIcon } from './styles';
import { AuthContext } from '../contexts/auth';
import { useNavigation } from '@react-navigation/native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {

  const { user, signed, loading } = useContext( AuthContext );
  const navigation = useNavigation();

  if(loading) {
      return (
        <Background>
            <Container>
                <Logo source={require('../assets/Logo.png')}/>
                <LoadingIcon size={"large"} color={"#ffffff"}/>
            </Container>
        </Background>
      );
  }

  return (
    // signed ? <AppRoutes/> : <AuthRoutes/>
      signed ? user.verificado ? navigation.navigate('Telefone') : <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;