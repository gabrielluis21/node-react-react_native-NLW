import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import style from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

export default function Favorites(){
  const [favorites, setFavorite] = useState([]);

  useFocusEffect(()=>{
    loadFavorites();
  });

  function loadFavorites(){
    AsyncStorage.getItem('Favorites').then(
      response => {
        if(response){
          const favTeachers = JSON.parse(response);
          setFavorite(favTeachers);
        }
      });
  }

  return(
    <View style={style.container}>
      <PageHeader title="Meus Proffys favoritos"/>

      <ScrollView style={style.teacherList}
        contentContainerStyle={
          {
            paddingHorizontal: 16,
            paddingBottom: 16
          }
        }
      >
        {favorites.map((teacherItem: Teacher)=>{
          return <TeacherItem key={teacherItem.id} 
            teacher={teacherItem}
            favorited={true}/>
          })
        }
      </ScrollView>
    </View>
  );
}