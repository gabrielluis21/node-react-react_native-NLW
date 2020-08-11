import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import "./styles.css";
import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/Page-header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeachersForm(){

  const history = useHistory();

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  
  const [scheduleItens, setScheduleItens] = useState([{
    week_day: 0, from: '',to: ''
  }]);

  function addNewScheduleItem(){
    setScheduleItens([
      ...scheduleItens,
      {week_day:0, from: '',to: '' }
    ]);
  }
  function setScheduleItemValue(position: number, field: string, value:string){
    const updatedScheduleItens = scheduleItens.map((scheduleItem, index)=>{
      if(index === position){
        return {...scheduleItem, [field]: value}
      }
      return scheduleItem;
    });

    setScheduleItens(updatedScheduleItens);
  }

  function handleSubmit(e: FormEvent){
    e.preventDefault();
    api.post("classes", {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItens
    }).then(response => {
      alert('Cadastro feito com sucesso!');
      history.push("/");
    }).catch(err => {
      alert('Falha ao Cadastrar!');
    });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader title="Que incrivel que você quer dar aulas!"
        description="O primeiro passo é preencher este formulário de inscrição"
      />
      <main>        
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input name="name" label="Nome completo"
              value={name} onChange={(e)=>{setName(e.target.value)}}/>
            <Input name="avatar" label="Avatar"
              value={avatar} onChange={(e)=>{setAvatar(e.target.value)}}/>
            <Input name="whatsapp" label="Whatsapp"
              value={whatsapp} onChange={(e)=>{setWhatsapp(e.target.value)}}/>
            <Textarea name="bio" label="Biografia" 
              value={bio} onChange={(e)=>{setBio(e.target.value)}}/>
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>
            <Select name="subject" label="Matéria"
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
              value={subject} onChange={(e)=>{setSubject(e.target.value)}}/>
            <Input name="cost" label="Custo da sua hora/aula"
              value={cost} onChange={(e)=>{setCost(e.target.value)}}/>
          </fieldset>
        
          <fieldset>
            <legend>
              Horários disponíveis 
              <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
            </legend>

            {scheduleItens.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select name="week_day" label="Dia da Semana"
                    value={scheduleItem.week_day}
                    onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
                    options={[
                      { value: '0', label: 'Domingo' },
                      { value: '1', label: 'Segunda-feira' },
                      { value: '2', label: 'Terça-feira' },
                      { value: '3', label: 'Quarta-feira' },
                      { value: '4', label: 'Quinta-feira' },
                      { value: '5', label: 'Sexta-feira' },
                      { value: '6', label: 'Sábado' }
                    ]}
                  />
                  <Input name="from" label="Das" type="time"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, "from", e.target.value)}/>
                  <Input name="to" label="Até" type="time" 
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, "to", e.target.value)}/>
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Atenção"/>
              Importante!<br></br>
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeachersForm;