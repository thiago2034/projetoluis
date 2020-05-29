import React,{ useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';

import Axios from 'axios';

import './index.css';

export default function Stage_enterprise(){
  const [projetos, setProjetos] = useState([]);
  const [enterpriseId,setEnterpriseId] = useState('');
  const [empresa_name,setEnterpriseName] = useState('');

  const [interessado,setInteressado] = useState([]);

  const history = useHistory();

  function logout(){
    localStorage.removeItem('empresa_id');
    history.push('/');
  }

  useEffect(()=>{
    async function initial(){ 
      const todosProjetos = await Axios.get('http://localhost:3333/projetos');
      const todasEmpresas = await Axios.get('http://localhost:3333/empresas');
      const pessoas = await Axios.get('http://localhost:3333/pessoas');

      const storage_id = localStorage.getItem('empresa_id');
      const security_key = localStorage.getItem('security_key');

      const empresa = todasEmpresas.data.find(usuario => usuario.id == storage_id);
      
      setInteressado(pessoas.data.filter(interessado => interessado.id == JSON.parse(atob(security_key)).ukey));

      setEnterpriseId(storage_id);

      setEnterpriseName(empresa.nome);

      setProjetos(todosProjetos.data.filter(projeto=> projeto.empresa_id == storage_id));
    }

    initial();

  },[]);

  async function cadastrar_projeto(){
    const inputs = document.querySelectorAll('input');

    const data = {
      nome:inputs[0].value,
      description:inputs[1].value,
      cidade:inputs[2].value,
      estado:inputs[3].value,
      empresa_id:enterpriseId,
    }

    try{
      await Axios.post('http://localhost:3333/projetos',data);
      alert('Projeto cadastrado com sucesso !');
    }catch(err){
      alert('Ocorreu um erro durante o precesso !');
    }

  }

  function toggleInteressados(){

    const section_interessados = document.querySelector('.interessados');

    section_interessados.classList.toggle('hidden');
  }

  return(
    <>
      
  
      <div className="stage-enterprise-central">
        <div className="header">
          <section className='welcome_enterprise'>
          <h2>Bem vindo {empresa_name}</h2>
          </section>
          
          <section className='buttons_header'>
            <button 
              onClick={toggleInteressados}
              >
                Pessoas interessadas
              </button>

            <button onClick={()=>{history.push('/config_enterprise')}}>Config</button>
            <button onClick={logout}>Logout</button>
          </section>
          
        </div>

        <div className="interessados hidden">
          <ul>
            
            {interessado.map(user => (
              <li key={user.id}>

                  <strong>NOME:</strong>
                  <p>{user.nome}</p>
                  <strong>CONTATO:</strong>
                  <p>{user.email}</p>
                  <strong>CIDADE:</strong>
                  <p>{user.cidade}</p>
                  <strong>ESTADO:</strong>
                  <p>{user.estado}</p>

              </li>              
            ))}
          </ul>
        </div>

        <div className="content_enterprise">
          <section className='cadastrar_projeto' >
            <h1>Cadastrar-se em novo projeto</h1>

            <section className='cadastrar_projeto_inputs'>
              <input type="text" placeholder='Nome do projeto'/>
              <input type="text" placeholder='Descrição'/>
              <input type="text" placeholder='Cidade'/>
              <input type="text" placeholder='Estado'/>
              <button onClick={cadastrar_projeto}>Cadastrar</button>
            </section>

          </section>
          <ul>
            {projetos.map(projetos => (
              <li key={projetos.id}>
                <section className='projetos_content'>
                  <strong>EMPRESA:</strong>
                  <p>{projetos.nome}</p>

                  <strong>Descrição:</strong>
                  <p>{projetos.description}</p>

                  <strong>CIDADE:</strong>
                  <p>{projetos.cidade}</p>
                </section>
              </li>              
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}