import logo from './logo.svg';
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Switch ,Route} from 'react-router-dom';
import { useState } from 'react';
import {useStateValue} from "./Stateprovider"
import Login from "./Login"
function App() {
  const [{user},setuser]=useStateValue();
  return (
    
    <div className="App">
      
      { !user ?(
       <Login/>
      ):
      (
        <div className="app_body">
        <Sidebar/>
          <Switch>
            <Route path="/rooms/:roomId" component={Chat}/>
         </Switch>
        </div>
      )}

    </div>
  );
}

export default App;
