import React from 'react';
import { Link } from 'react-router-dom';

import  './style.css'

class Home extends React.Component {

  componentDidMount(){
    // document.body.style.background= 'url(/assets/successmarket.jpg) no-repeat';
    // document.body.style.backgroundSize = 'cover';
    // document.body.style.backgroundRepeat = 'no-repeat';
  }

  render(){
    return(
      <div class="homeContainer">
        <div className ="test"></div>

      <div className="hero">
      <h2 className="slogan">Join the world's leading Stock watching platform today!</h2>

      <div class="HcreateNew">
      <a href="/users/new" class="createNewButton">Create Account</a>
      </div>
      <div class="Hlogin">
      <a href="/login" class="loginButton">Sign in here</a>
      </div>
      <Link to="/"></Link>

      </div>
      </div>
    );
  }
}


export default Home
