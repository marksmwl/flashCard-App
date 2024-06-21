import React from 'react';
import '../styles/box.css'
import Header from '../components/header'
import Login from '../components/login'
import HomePage from './homePage';


function WelcomePage(props:any) {

  return (
      <> 
          <div className='full-screen'>

              <h1 className='centered-text-in' >Flashcards take time, get help from AI.</h1>
                
              <section className='form-outline'>
                  <Login logSetter={props.logSetter}/>
          
              </section>
          
          </div>
      </>
  );
  
}

export default WelcomePage;
