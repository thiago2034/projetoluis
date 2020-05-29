import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './index.css';

export default function Config_user(){
  const history = useHistory();


  function toggle(who){
    const inputs = setInputs();

    if(who == 'pessoal'){
      inputs[0].classList.toggle('hidden');
      inputs[1].classList.toggle('hidden');
      inputs[2].classList.toggle('hidden');
    }else if(who == 'endereço'){
      inputs[3].classList.toggle('hidden');
      inputs[4].classList.toggle('hidden');
    }
  }

  function setInputs(){
    return document.querySelectorAll('input');
  }

  async function update(){
    const inputs = setInputs();

    const id = localStorage.getItem('user_id');

    const data = new Object();

    data.id = id;

    for(let item of inputs){
      let name = item.name
      if(item.value){
        data[`${name}`] = item.value
      }
    }

    try{
      await Axios.put('http://localhost:3333/pessoas',data);
      alert('Atualizado com sucesso');
    }catch(err){
      console.log(err);
    }

  }

  return(
    <>
      <div className='config_user'>
        <div className='header_config_user'>
          <h1>CONFIGURAÇÃO USUÁRIO</h1>
        </div>

        <div className='content_config_user'>
          <section className='buttons_config_user'>
            <button onClick={()=>{history.goBack()}}>Voltar para Home</button>
            <button onClick={()=>{toggle('pessoal')}}>Informações Pessoais</button>
            <button onClick={()=>{toggle('endereço')}}>Endereço</button>
          </section>

          <section className='sections_input_config_user' >
            <section className='input_pessoal_config_user'>
              <input type='text' name='nome' placeholder='Nome'/>
              <input type='password' name='senha' placeholder='Senha'/>
              <input type='email' name='email' placeholder='Email'/>
            </section>

            <section className='input_address_config_user'>
              <input type='text' name='cidade' placeholder='Cidade'/>
              <input type='text' name='estado' placeholder='Estado'/>
            </section>

            <button onClick={update}>Atualizar</button>
          </section>

        </div>
      </div>
    </>
  )
}
