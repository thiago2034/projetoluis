import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './index.css';

export default function Config_Enterprise(){
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
    
    const id = localStorage.getItem('empresa_id');

    const data = new Object();

    data.id = id;
    
    for(let item of inputs){
      let name = item.name;
      if(item.value){
        data[`${name}`] = item.value
      }
    }
    
    try{
      await Axios.put('http://localhost:3333/empresas',data);
      alert('Atualizado com sucesso');
    }catch(err){
      console.log(err);
    }

  }

  async function delete_enterprise(){
    const id = localStorage.getItem('empresa_id');

    try{
      await Axios.delete(`http://localhost:3333/empresas/${id}`);
    }catch(err){
      alert('Falha ao deletar');
      console.log(err);
      return
    }

    alert('Deletado com sucesso !\nRedirecionando para tela principal\n......');
    localStorage.removeItem('empresa_id');
    history.push('/');
  }

  return(
    <>
      <div className='config_enterprise'>
        <div className='header_config_enterprise'>
          <h1>CONFIGURAÇÃO EMPRESA</h1>
        </div>
        
        <div className='content_config_enterprise'>
          <section className='buttons_config_enterprise'>
            <button onClick={()=>{history.goBack()}}>Voltar para Home</button>
            <button onClick={()=>{toggle('pessoal')}}>Informações Pessoais</button>
            <button onClick={()=>{toggle('endereço')}}>Endereço</button>
            <button onClick={delete_enterprise} className='delete'>Deletar Conta</button>
          </section>

          <section className='sections_input_config_enterprise' >
            <section className='input_pessoal_config_enterprise'>
              <input type='text' name='nome' placeholder='Nome'/>
              <input type='text' name='senha' placeholder='Senha'/>
              <input type='projeto' name='projeto' placeholder='Projeto'/>
            </section>

            <section className='input_address_config_enterprise'>
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