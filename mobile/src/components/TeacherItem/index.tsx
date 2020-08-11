import React, { useState } from 'react';

import style from './styles';
import { View, Image, Text, Linking, AsyncStorage } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartIconOutline from '../../assets/images/icons/heart-outline.png';
import unFavoriteIconOutline from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import api from '../../services/api';

export interface Teacher{
  id: number,
  name: string,
  avatar: string,
  whatsapp: string,
  bio: string,
  subject: string,
  cost: number,
}

interface TeacherProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherProps> = ({teacher, favorited}) => {
  const [isFavorites, setIsFavorites] = useState(favorited);

  function handleLinkToWhatsApp(){
    api.post('connections', {
      user_id: teacher.id
    })
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    
  }

  async function handleToggleFavorite(){
    const favorites = await AsyncStorage.getItem('Favorites');
    let favoritesArray = [];
      
    if(favorites){
      favoritesArray = JSON.parse(favorites);
    }
    
    if(isFavorites){
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher)=> {
        return teacherItem.id === teacher.id
      });

      favoritesArray.splice(favoriteIndex, 1);
      setIsFavorites(false);
    }else{
      favoritesArray.push(teacher);

      setIsFavorites(true);
    }
    await AsyncStorage.setItem('Favorites', JSON.stringify(favoritesArray));
  }

  return (
    <View style={style.container}>
      <View style={style.profile}>
        <Image 
          style={style.avatar}
          source={{ uri: teacher.avatar}}/>
        
        <View style={style.profileInfo}>
          <Text style={style.name}>{teacher.name}</Text>
          <Text style={style.subject}>{teacher.subject}</Text>
        </View>
      </View>
      <Text style={style.bio}>
        {teacher.bio}
      </Text>

      <View style={style.footer}>
        <Text style={style.price}>
          Preço/hora {'    '}
          <Text style={style.priceValue}>R$ {teacher.cost}</Text>
        </Text>
        <View style={style.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              style.favoriteButton, 
              isFavorites ? style.favorited : {}]}>
            {isFavorites ? 
              <Image source={unFavoriteIconOutline}/> : 
              <Image source={heartIconOutline}/>
            }
            
          </RectButton>
          
          <RectButton onPress={handleLinkToWhatsApp}
            style={style.contactButton}>
            <Image source={whatsappIcon}/>
            <Text style={style.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;