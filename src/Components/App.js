import React, { useEffect, useState } from 'react';
import Home from './Home';
import Login from './Login';
import Map from './Map';
import Stations from './Stations';
import { useSelector, useDispatch } from 'react-redux';
import { loginWithToken, fetchCart } from '../store';
import { Link, Routes, Route } from 'react-router-dom';
import EVStation_IL from './EVStation_IL.json';

const App = ()=> {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();


  useEffect(()=> {
    dispatch(loginWithToken());
  }, []);

  useEffect(()=> {
    if(auth.id){
      dispatch(fetchCart());
    }
  }, [auth]);
  return (
    <>
      <div>
        <h1>ZapQuest</h1>
            <div>
              <nav>
                <Link to='/'>Home</Link>
                <Link to='/stations'>Stations</Link>
              </nav>
              <Routes>
                <Route path='/stations' element={ <Stations /> } />
              </Routes>
            </div>
            <Map />
      </div>
      <div>
        <pre>
          {
            JSON.stringify(EVStation_IL, null, 2)
          }
        </pre>
      </div>  
    </>
  );
};

export default App;
