import React, { useContext } from 'react';
import { Background, Container, Logo, LoadingIcon } from './styles';
import { AuthContext } from '../contexts/auth'

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes() {

  const { signed, loading } = useContext( AuthContext );

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
    signed ? <AppRoutes/> : <AuthRoutes/>
  )
}

export default Routes;