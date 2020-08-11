import React, { useState, useEffect } from 'react';
import { View, Image, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import landingImage from '../../assets/images/landing.png';

import style from './styles';

import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

export default function Landing(){
  const {navigate} = useNavigation();
  const[totalConntections, setTotalConnections] = useState( 0 )

  useEffect(() => {
    api.get('connectios').then(response => {
      const {total} = response.data;
      setTotalConnections(total);

    });
  }, [])
  function handleNavigationToGiveClassesPage(){
    navigate('GiveClasses');
  }
  
  function handleNavigationToStudyPages(){
    navigate('Study');
  }

  return(
    <View style={style.container}>
      <Image source={landingImage} style={style.banner}/>
      <Text style={style.title} >
        Seja Bem vindo, {'\n'}
        <Text style={style.titleBold} >
          O que deseja fazer?
        </Text>
      </Text>

      <View style={style.buttonsContainer}>
        <RectButton onPress={handleNavigationToStudyPages}
         style={[style.button, style.buttonPrimary]} >
          <Image source={studyIcon}/>
          <Text style={style.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton onPress={handleNavigationToGiveClassesPage}
         style={[style.button, style.buttonSecondary]} >
          <Image source={giveClassesIcon}/>
          <Text style={style.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={style.totalConnections}>
        Total de {totalConntections} conexões já realizadas {' '}
        <Image source={heartIcon}  />
      </Text>
    </View>
  );
}