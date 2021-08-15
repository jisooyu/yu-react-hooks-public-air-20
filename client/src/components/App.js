import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import { fetchUser} from '../actions';

import Header from './Header';
import Display from './Display';
import Landing from './Landing';
import AddForm from './AddForm';

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchUser())
  },[])
 
  return (
    <div>
      <div className="app">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/display" component={ Display } />
            <Route exact path="/add" component={ AddForm }  />
          </div>
        </BrowserRouter>
      </div>
  </div>  
  )
}

export default App;