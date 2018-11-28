import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

// import '../styles/SearchStock';

class SearchStock extends React.Component {


    constructor(){
      super();

      this.state = {
        code: ''
      }
    }

    handleInput( event ){
      console.log( event.target.value );

      this.setState({ code: event.target.value });
    }

    handleSubmit( event ){

      let ticker = this.props.match.params.code;


      event.preventDefault(); // prevent form submit from causing reload of page
      this.props.history.push(`/SearchStockResults/${this.state.code}`);
    }

    render(){
      return (
        <div className="bodySearchStock">
        <div class="stockBody" >
        <h2 id="searchStockTitle">Search Stock</h2>
        <form onSubmit={ ev => this.handleSubmit(ev) }>
        <input id="SearchForm" placeholder="Lookup Quote" type="text" onChange={ ev => this.handleInput(ev) }/>
        <input type="submit" value="Search" className="searchFormButton"/>
        </form>
        </div>
        </div>
      );
    }
  }



export default SearchStock
