import React, { useState, FormEvent } from 'react';

import "./styles.css";

import PageHeader from '../../components/Page-header';
import TeacherItem, { Teacher } from '../../components/Teacher-item';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';

function TeachersList(){

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");


  async function handleSearchSubmit(e: FormEvent){
    e.preventDefault();
    const response = await api.get('classes', {
      params: {
        subject,
        weekDay,
        time
      }
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={handleSearchSubmit}>
        <Select name="subject" label="Matéria"
          value={subject}
          options={[
            { value: 'Artes', label: 'Artes' },
            { value: 'Matemática', label: 'Matemática' },
            { value: 'Ciências', label: 'Ciências' },
            { value: 'História', label: 'História' },
            { value: 'Português', label: 'Portugues' },
            { value: 'Ed. Física', label: 'Ed. Física' },
            { value: 'Física', label: 'Física' },
            { value: 'Química', label: 'Química' },
            { value: 'Geográfia', label: 'Geográfia' },
            { value: 'Biologia', label: 'Biologia' },
          ]}
          onChange={e => {setSubject(e.target.value)}}/>
          <Select name="week_day" label="Dia da Semana"
          value={weekDay}
          options={[
            { value: '0', label: 'Domingo' },
            { value: '1', label: 'Segunda-feira' },
            { value: '2', label: 'Terça-feira' },
            { value: '3', label: 'Quarta-feira' },
            { value: '4', label: 'Quinta-feira' },
            { value: '5', label: 'Sexta-feira' },
            { value: '6', label: 'Sábado' }
          ]}
          onChange={e => {setWeekDay(e.target.value)}}/>
          <Input type="time" name="time" label="Hora"
            value={time}
            onChange={e => {setTime(e.target.value)}}/>
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacherItem: Teacher) => {
          return <TeacherItem key={teacherItem.id} teacher={teacherItem}/>
        })}
      </main>
    </div>
  );
}

export default TeachersList;