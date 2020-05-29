import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Main from './screens/main';
import SignIn from './screens/signin';
import SignUp from './screens/signup';
import Stage_User from './screens/stage_user';
import Stage_Enterprise from './screens/stage_enterprise';
import PessoasInteressadas from './screens/pessoas_interessadas';
import Config_User from './screens/config_user';
import Config_Enterprise from './screens/config_enterprise';

export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Main}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/stageuser' component={Stage_User}/>
        <Route path='/stageenterprise' component={Stage_Enterprise}/>
        <Route path='/interessadas' component={PessoasInteressadas}/>
        <Route path='/config_user' component={Config_User}/>
        <Route path='/config_enterprise' component={Config_Enterprise}/>
      </Switch>
    </BrowserRouter>
  )
}