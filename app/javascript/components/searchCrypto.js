import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


class searchCrypto extends React.Component {
  constructor(){
    super();

    this.state = {
      symbol: ''
    }
  }

  handleInput(event){
    console.log(event.target.value);

    this.setState( {code: event.target.value });
  }

  handleSubmit(event){

    let symbol = this.props.match.params.symbol;

    event.preventDefault();
    this.props.history.push(`/searchCryptoResults/${this.state.code}`);

  }

  render(){
    return(
      <div className="bodySearchCrypto">
      <div class="cryptoBody">
      <h3 className="searchCryptoNow">&nbsp;</h3>
      <form className="cryptoForm" onSubmit={ ev => this.handleSubmit(ev) }>
        <p id="searchCryptoTitle">Search CryptoCurrency</p>
      <input id="SearchCryptoForm" placeholder="Lookup CryptoCurrency" type="text" onChange={ ev => this.handleInput(ev)}/>
      <input type="submit" value="search" className="searchCryptoFormButton"/>
      </form>
      </div>
      </div>


        );
      }
    }


  export default searchCrypto
