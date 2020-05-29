import React from 'react';

import { Link } from 'react-router-dom';

import './index.css';

export default function Main(){
  return (
    <>
    <div className='central'>
      <section className='sec_welcome'>
        <h1>Bem vindo ao Projeto Social</h1>

        <div>
          <Link to='/signin' className='button'>Fazer Login</Link>
          <Link to='/signup' className='button'>Cadastrar</Link>
        </div>
      </section>
    </div>
    </>
  )
}
