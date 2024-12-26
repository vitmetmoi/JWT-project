import './App.scss';
import React, { useEffect, useState } from 'react';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
import AppRoute from './routes/AppRoute';
function App() {

  return (
    <Router>
      <div className="App">
        <div className='App-header'><Nav></Nav></div>
        <div className='App-body'>
          <AppRoute></AppRoute>
        </div>


        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />


      </div>
    </Router>


  );
}

export default App;
