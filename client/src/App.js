import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './Store/store'
import './App.css';

import Header from './Components/Header'
import {loginWithToken} from './Store/Actions/auth'
import UserManager from './Components/UserManager';

function App() {

  useEffect(()=>{
    store.dispatch(loginWithToken(localStorage.getItem('jwtToken')))
  },[])

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <div className="container">
          <UserManager />
        </div>
      </div>
    </Provider>
  );
}

export default App;