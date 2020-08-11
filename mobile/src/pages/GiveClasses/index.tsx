import React from 'react';
import style from './styles';
import { View, ImageBackground, Text } from 'react-native';

import giveClassesbgImg from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){
  const navigation = useNavigation();

  function handleGoBackToLandingPage(){
    navigation.goBack();
  }

  return (
    <View style={style.container}>
      <ImageBackground resizeMode="contain"
       source={giveClassesbgImg} style={style.content}>
         <Text style={style.title}>
          Quer Ser um Proffy?
         </Text>
         <Text style={style.description}>
          Para começar você precisa se cadastrar como professor na nossa plataforma web
         </Text>
      </ImageBackground>

      <RectButton onPress={handleGoBackToLandingPage} 
        style={style.okButton}>
        <Text style={style.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
}

export default GiveClasses;