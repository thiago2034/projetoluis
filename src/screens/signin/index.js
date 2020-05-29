import React, { useState } from 'react';

import Axios from 'axios';

import { useHistory } from 'react-router-dom';

import Switch from 'react-switch';

import './index.css';

export default function SignIn(){
  const history = useHistory();
  const [checked , setChecked] = useState(false);
  const [switch_color, setSwitch_color] = useState('#white');
  const [text_input_user, text_input_userSet] = useState('Usuário');

  const toggler = ()=>{
    if(checked){
      setChecked(false);
      setSwitch_color('#white');
      text_input_userSet('Usuário');
    }else{
      setChecked(true);
      setSwitch_color('white');
      text_input_userSet('Empresa');
    }
  }

  function handleLogin(){
    const inputs = document.querySelectorAll('input');

    if(!inputs[0].value || !inputs[1].value){
      alert('Campo vazio');
      return;
    }

    if(checked){
      handleLoginEmpresa(inputs);
    }else{
      handleLoginUser(inputs);
    }
  }

  async function handleLoginEmpresa(input_array){
    const empresas = await Axios.get('http://localhost:3333/empresas');

    const empresa_atual = empresas.data.find(empresa => empresa.login === input_array[0].value);

    if(!empresa_atual){
      alert('Empresa não encontrado');
      return;
    }

    if(input_array[1].value !== empresa_atual.senha){
      alert('Falha ao fazer Login');
      return;
    }

    localStorage.setItem('empresa_id',empresa_atual.id);

    history.push('/stageenterprise');
  }

  async function handleLoginUser(input_array){
    const users = await Axios.get('http://localhost:3333/pessoas',);

    const user_atual = users.data.find(usuario => usuario.login === input_array[0].value);

    if(!user_atual){
      alert('Usuario não encontrado');
      return;
    }

    if(input_array[1].value !== user_atual.senha){
      alert('Falha ao fazer Login');
      return;
    }

    localStorage.setItem('user_id',user_atual.id);

    history.push('/stageuser');
  }

  return(
    <>
      <div className='central signin'>
        <section className='projeto_social_section'>
          <h1>
            <a href='/' className='nome_projeto' >Projeto Social</a></h1>
        </section>


        <section className='sec_login'>
          <div>

          <input type="text"  placeholder={`${text_input_user}`}/>
          <input type="password" placeholder='Senha'/>


          <section className='switch_section'>
            <Switch
              onChange={toggler}
              checked={checked}
            />
            <h2 style={{color:`${switch_color}`}}>Sou uma empresa</h2>
          </section>

          <button
            className='button_login'
            onClick={handleLogin}>
            Entrar
          </button>

          </div>
        </section>
      </div>
    </>
  )
}
