import React, { useState} from 'react';

import { View, ScrollView, Text, TextInput, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons';

import style from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

export default function TeacherList(){
  const [isFilterVIsable, setIsFilterVIsable] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorite] = useState<number[]>([]);
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  function loadFavorites(){
    AsyncStorage.getItem('Favorites').then(
      response => {
        if(response){
          const favTeachers = JSON.parse(response);
          const favTeachersIds = favTeachers.map((teacher:Teacher) => {return teacher.id});
          setFavorite(favTeachersIds);
        }
      });
  }

  function handleIsFilterVisable(){
    setIsFilterVIsable(!isFilterVIsable);
  }

  async function handleFiltersSubmit(){
    loadFavorites();
    const response = await api.get('classes', {
      params: {
        subject,
        weekDay,
        time
      }
    });

    setTeachers(response.data);
  }

  

  return(
    <View style={style.container} >
      <PageHeader title="Este são os Proffys disponíveis"
        headerRight={(<BorderlessButton onPress={handleIsFilterVisable}>
          <Feather name="filter" size={20} color="#FFF"/>
        </BorderlessButton>)}
      >
        {isFilterVIsable && (
          <View style={style.searchForm}>
            <Text style={style.label}>Matéria</Text>
            <TextInput value={subject}
              onChangeText={text => setSubject(text)}
              placeholderTextColor="#c1bccc"
              style={style.input}
              placeholder="Qual a matéria"/>

            <View style={style.inputGroup}>
              <View style={style.inputBlock}>
                <Text style={style.label}>Dia da semana</Text>
                <TextInput value={weekDay}
                  onChangeText={text => setWeekDay(text)}
                  placeholderTextColor="#c1bccc"
                style={style.input}
                 placeholder="Qual o dia"/>
              </View>
              <View style={style.inputBlock}>
                <Text style={style.label}>Hora</Text>
                <TextInput value={time}
                  onChangeText={text => setTime(text)}
                  placeholderTextColor="#c1bccc"
                style={style.input}
                 placeholder="Qual horário"/>
              </View>            
            </View>
            <RectButton style={style.submitButton} 
              onPress={handleFiltersSubmit}>
              <Text style={style.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
        
      </PageHeader>

      <ScrollView style={style.teacherList}
        contentContainerStyle={
          {
            paddingHorizontal: 16,
            paddingBottom: 16
          }
        }
      >
        {teachers.map((teacher:Teacher) => <TeacherItem  
        key={teacher.id} 
        teacher={teacher}
        favorited={favorites.includes(teacher.id)}/>)}
        
      </ScrollView>
    </View>
  );
}