import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom';
import Home from './Home'
import SearchStock from './SearchStock'
import SearchStockResults from './SearchStockResults'
import Profile from './Profile'
import news from './news'
import searchCrypto from './searchCrypto'
import searchCryptoResults from './searchCryptoResults'

class Routes extends React.Component {
  render(){
    return (

      <Router>
        <div>
        <Route exact path ="/" component={Home} />
        <Route exact path ="/SearchStock" component={SearchStock} />
        { <Route exact path ="/SearchStockResults/:code" component={SearchStockResults} /> }
        <Route exact path ="/Profile" component={Profile} />
        <Route exact path ="/news" component={news} />
        <Route exact path ="/searchCrypto" component={searchCrypto} />
        <Route exact path ="/searchCryptoResults/:symbol" component={searchCryptoResults} />
        </div>
      </Router>



    )
  }
}

  export default Routes
