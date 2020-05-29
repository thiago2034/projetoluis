import React,{ useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './index.css';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Stage_user(){
  const [empresas, setEmpresas] = useState([]);

  const [projetos,setProjetos] = useState([]);

  const [user_id,setUseId] = useState('');
  const [user_name,setUseName] = useState('');
  const history = useHistory();

  useEffect(() =>{
    async function initial (){
    const data = await Axios.get('http://localhost:3333/empresas');

    setEmpresas(data.data);

    get_user_id();
    }

    initial();

  },[])

  async function get_user_id(){
    const storage_id = localStorage.getItem('user_id');

    const data = await Axios.get('http://localhost:3333/pessoas');

    const user = data.data.find(usuario => usuario.id == storage_id);

    setUseId(user.id);

    setUseName(user.nome);
  }

  async function logout(){
    try{
      localStorage.removeItem('user_id');
      history.push('/');}
    catch(e){
      console.log(e.error)
    }
  }

  async function cadastro_gambiarra(id_empresa){
    const keys = {
      ekey:id_empresa,
      ukey:user_id,
    }

    localStorage.setItem('security_key',btoa(JSON.stringify(keys)));

    console.log(keys)

    alert("Parabéns, você cadastrou com sucesso !")
  }

  async function visualizar_projetos(id_empresa){
    const section_projetos = document.querySelector('.projetos');

    section_projetos.classList.toggle('hidden');

    const todosProjetos = await Axios.get('http://localhost:3333/projetos');

    setProjetos(todosProjetos.data.filter(projeto => projeto.empresa_id == id_empresa));

  }

  return(
    <>
      <div className="stage-user-central">
        <div className="header">
          <section className='welcome'>
            <h2>Bem vindo {user_name}</h2>
          </section>



          <section className='buttons_header'>
            <button onClick={()=>{history.push('/config_user')}}>Config</button>
            <button onClick={logout}>Logout</button>
          </section>

        </div>


        <div className="projetos hidden">
          <ul>

            {projetos.map(projeto => (
              <li key={projeto.id}>
                <strong>PROJETO:</strong>
                <p>{projeto.nome}</p>
                <strong>DESCRIÇÃO:</strong>
                <p>{projeto.description}</p>
                <strong>CIDADE:</strong>
                <p>{projeto.cidade}</p>
                <strong>ESTADO:</strong>
                <p>{projeto.estado}</p>
              </li>
            ))}
          </ul>

          <button onClick={visualizar_projetos}>X</button>
        </div>

        <div className="content">
          <section>
            <h1>Cadastrar-se em novo projeto</h1>

          </section>
          <ul>
            {empresas.map(projetos => (
              <li key={projetos.id}>
                <section className='empresas_content'>
                  <strong>EMPRESA:</strong>
                  <p>{projetos.nome}</p>

                  <strong>PROJETO:</strong>
                  <p>{projetos.projeto}</p>

                  <strong>CIDADE:</strong>
                  <p>{projetos.cidade}</p>
                </section>
                <section className='empresa_button'>
                  <button onClick={()=>visualizar_projetos(projetos.id)}>
                    Visualizar Projetos
                  </button>
                </section>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
