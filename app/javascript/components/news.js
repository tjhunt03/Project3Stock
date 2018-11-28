import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class news extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      newsInfo: {}
    };
  }



  componentDidMount(){

    axios.get(`https://newsapi.org/v2/top-headlines?sources=financial-post&apiKey=4c8573b100734643aa631547e12c4979
`)
    .then( response => {
      console.log( response.data );
      this.setState({ newsInfo: response.data });
    })

    .catch( console.warn );
  }




  render(){
    if (!this.state.newsInfo.articles){
      return(<div>loading...</div>)

    }

    return(

      <div className="yourNewsBorder">
        <div>
        <h1 className="newsTitle H">Top News Headlines</h1>


        { this.state.newsInfo.articles.map(n => <li className="newsTitle"><h5 className="yourNewsTitle"> </h5><a href={n.url}>{n.title}</a>
      <div className="newsDescription"><h5 className="yourNewsTitle"> </h5>{n.description}</div>{n.urlToImage}</li>)}
      </div>
    </div>
    )
  }
};

export default news;
