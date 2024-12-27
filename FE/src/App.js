import './App.scss';
import React, { useEffect, useState, useContext } from 'react';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
import AppRoute from './routes/AppRoute';
import { Triangle } from 'react-loader-spinner'
import { UserContext } from './store/UserContext';


function App() {
  const { user, login, logout } = useContext(UserContext);

  if (user.isLoading === true) {
    return (
      <>
        <div className='loading-page-container'>
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#6495ED"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          ></Triangle>
          <span className='loading-text'>Loading data...</span>
        </div>

      </>
    )


  }
  else {
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


}



export default App;
