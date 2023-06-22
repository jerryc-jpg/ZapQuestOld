import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store';
import { Link } from 'react-router-dom';
import EVStation_IL from './EVStation_IL.json';

const Stations = ()=> {
  //console.log(EVStation_IL);
  

  return (
    <div>
      <h1>Stations</h1>
      <pre>
        {
          JSON.stringify(EVStation_IL, null, 2)
        }
      </pre>
    </div>
  );
};

export default Stations;
