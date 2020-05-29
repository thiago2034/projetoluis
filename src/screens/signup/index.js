import React, { useState } from 'react';

import Axios from 'axios';

import { useHistory } from 'react-router-dom';

import Switch from 'react-switch';

import './index_up.css';

export default function SignUp(){
  const history = useHistory();
  const [checked , setChecked] = useState(false);
  const [switch_color, setSwitch_color] = useState('#e02041');
  const [type,setType] = useState('email');
  const [placeholder,setPlaceholder] = useState('Email')

  const toggler = ()=>{
    if(checked){
      setChecked(false);
      setSwitch_color('#e02041');
      setType('email');
      setPlaceholder('Email');
    }else{
      setChecked(true);
      setSwitch_color('green');
      setType('text');
      setPlaceholder('Projeto');
    }

  }

  function handleCadastro(){
    const inputs = document.querySelectorAll('input');

    for(let item = 0; item < inputs.length; item++){
      if(!inputs[item].value){
        alert('Campo vazio');
        return;
      }
    }

    if(checked){
      handleCadastroEmpresa(inputs);
    }else{
      handleCadastroUser(inputs);
    }
  }

  async function handleCadastroEmpresa(input_array){
    const empresas = await Axios.get('http://localhost:3333/empresas');

    const check_name = empresas.data.find(empresa => empresa.nome === input_array[0].value);
    const check_login = empresas.data.find(empresa => empresa.login === input_array[1].value);

    if(check_name){
      alert('Nome já cadastrado');
      return;
    }else if(check_login){
      alert('Login já cadastrado')
      return;
    }

    const data = {
      nome:input_array[0].value,
      login:input_array[1].value,
      senha:input_array[2].value,
      projeto:input_array[3].value,
      cidade:input_array[4].value,
      estado:input_array[5].value
    }

    await Axios.post('http://localhost:3333/empresas',data);

    history.push('/signin');
  }

  async function handleCadastroUser(input_array){
    const usuarios = await Axios.get('http://localhost:3333/pessoas');

    const check_name = usuarios.data.find(usuario => usuario.nome === input_array[0].value);
    const check_login = usuarios.data.find(usuario => usuario.login === input_array[1].value);

    console.log(usuarios);

    if(check_name){
      alert('Nome já cadastrado');
      return;
    }else if(check_login){
      alert('Login já cadastrado')
      return;
    }

    const data = {
      nome:input_array[0].value,
      login:input_array[1].value,
      senha:input_array[2].value,
      email:input_array[3].value,
      cidade:input_array[4].value,
      estado:input_array[5].value}

    await Axios.post('http://localhost:3333/pessoas',data);

    history.push('/signin');

  }

  return(
    <>
      <div className='central_signup'>
        <section className='projeto_social_section'>
          <h1>
            <a href='/' >Projeto Social</a></h1>
        </section>


        <section className='sec_login'>
          <h1>CADASTRO</h1>

          <div>

          <input type="text" placeholder='Nome'/>
          <input type="text" placeholder='Login'/>
          <input type="text" placeholder='Senha'/>
          <input type={`${type}`} placeholder={`${placeholder}`}/>
          <input type="text" placeholder='Cidade'/>
          <input type="text" placeholder='Estado'/>

          <section className='switch_section'>
            <Switch
              onChange={toggler}
            />
            <h2 style={{color:`${switch_color}`}}>Sou uma empresa</h2>
          </section>

          <button
            className='button_login'
            onClick={handleCadastro}>
            Cadastrar
          </button>

          </div>
        </section>
      </div>
    </>
  )
}
