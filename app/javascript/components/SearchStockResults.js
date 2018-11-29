import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Bar, Line, Pie} from 'react-chartjs-2';


class SearchStockResults extends React.Component {

  // state = {}
  constructor(props){
    super(props);


    this.state = {
      stockInfo: {},
      ChartData: {
        labels: [ ],
        datasets: [
          {
            label: 'Open',
            data: [  ],
            backgroundColor:[
              'green	'
            ],

            fill: false


          },
          {
            label: 'Close',
            data: [  ],
            backgroundColor:[
              'red '
            ],
            fill: false,


          }

        ]
      }
    }; //state
  } //constructor



  componentDidMount(){

    const timestampToDateString = timestamp => {
      // var a = new Date(timestamp * 1000);
      const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      // var year = a.getFullYear();
      // var month = months[a.getMonth()];
      // var date = a.getDate();
      // var hour = a.getHours();
      // var min = a.getMinutes();
      // var sec = a.getSeconds();
      // var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;

      let year = new Date(timestamp).getFullYear()
      let month = new Date(timestamp);
      //gets index from months array
      month = months[month.getMonth()];
      let date = new Date(timestamp).getDate()

      return `${date} ${month} ${year}`;
    }

    let ticker = this.props.match.params.code;
    console.log(ticker);
    // get user info
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${ticker},&types=quote,news,chart&range=1m&last=5`)
    .then( response => {
      console.log( response.data );
      this.setState({ stockInfo: response.data });

      const dates = [];
      const openPrices = [];
      const closePrices = [];
      response.data[ticker].chart.forEach(price => {
        dates.push( timestampToDateString(price.date) );
        openPrices.push( price.low );
        closePrices.push( price.high );
      });


      console.log(dates, openPrices, closePrices);
      const chartData = {...this.state.ChartData};
      chartData.labels = dates;
      chartData.datasets[0].data = openPrices;
      chartData.datasets[1].data = closePrices;
      this.setState({ ChartData: chartData  });
    }) //then
    .catch( console.warn );
  } //componentDidMount

  //convert date format



    render(){

      let ticker = this.props.match.params.code;

      if (!this.state.stockInfo[ticker]){
          return(<div>loading...</div>)
      }

      return (
      <div className ="containerStockResults">
        <div className ="container-part1">
        <div className="chart">
          <h5 className="stockName"><strong>NAME: </strong> {this.state.stockInfo[ticker].quote.companyName}</h5>

              <Line
                data={this.state.ChartData}
                options={{}}
                />



            </div>
          <div className="gStockInfo">
            <p><strong>STOCK: </strong> {this.state.stockInfo[ticker].quote.companyName}</p>

            <p><strong>PRICE:</strong> ${this.state.stockInfo[ticker].quote.latestPrice}</p>
            <p><strong>OPEN:</strong> ${this.state.stockInfo[ticker].chart[0].open}</p>

            <p><strong>CLOSE:</strong> ${this.state.stockInfo[ticker].quote.close}</p>
            <p><strong>VOLUME:</strong> {this.state.stockInfo[ticker].chart[0].volume}</p>

          </div>




          </div><br></br>
          <h3 className="newsHeadlineTicker"> NEWS HEADLINES FOR {ticker}</h3>
          <div className="sNews">
            { this.state.stockInfo[ticker].news.map(n =>
              <li className="newsHeadline"><a href={n.url}>{n.headline}</a></li>

            )}
          </div>
        </div>
      );
    }

  }

export default SearchStockResults;
