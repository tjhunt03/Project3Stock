import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Bar, Line, Pie} from 'react-chartjs-2';

class searchCryptoResults extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      cryptoInfo: [],
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
    };

  }

  //timeseries methods
  displayDayHistory(event){

    //end of url is defined in axios get request

    const url = `https://min-api.cryptocompare.com/data/histohour?tsym=USD&limit=24&fsym=`;
    this.getChartData(url);
  }

  displayWeekHistory(event){

    const url = `https://min-api.cryptocompare.com/data/histohour?tsym=USD&limit=189&fsym=`;
    this.getChartData(url);


  }

  displayMonthHistory(event){

    const url = `https://min-api.cryptocompare.com/data/histoday?tsym=USD&limit=30&fsym=`;
    this.getChartData(url);


  }



  //convert date format

  timestampToDateString(timestamp){
    var a = new Date(timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year; // + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }


  //pass in the  url method into getchartdata method to show time series.
  getChartData( url ){

    let symbol = this.props.match.params.symbol;
    console.log(symbol);

    //url gets passed from method timeseries methods
    axios.get(url + symbol)
      .then( response => {
        console.log(response.data);

        this.setState({cryptoInfo: response.data.Data })


      const dates = [];
      const openPrices = [];
      const closePrices = [];
      response.data.Data.forEach(c => {
        dates.push( this.timestampToDateString(c.time) );
        openPrices.push(c.open);
        closePrices.push(c.close);
      });

      //pushing the info onto charts
      console.log('dates', dates,'open', openPrices, 'close', closePrices);
      const chartData = {...this.state.ChartData};
      chartData.labels = dates;
      chartData.datasets[0].data = openPrices;
      chartData.datasets[1].data = closePrices;
      this.setState({ChartData: chartData});

    })
    .catch(console.warn);

  }

  componentDidMount(){

    // make API request when component mounts, using this default URL for the API when chart first loads (week)
    this.getChartData('https://min-api.cryptocompare.com/data/histoday?tsym=USD&limit=7&fsym=');

  }


render(){

  if(!this.state.cryptoInfo[0]){
      return(<div>loading...</div>)
  }


  let symbol = this.props.match.params.symbol;
  return(
      <div className="chartCryptoContainer">
      <div className="containerCryptoChart">
      <div className="cryptoChart">
        <button className="cryptoButtons" onClick={ev => this.displayDayHistory(ev)}>Day</button>
        <button className="cryptoButtons" onClick={ev => this.displayWeekHistory(ev) }>Week</button>
        <button className="cryptoButtons" onClick={ev => this.displayMonthHistory(ev) }>Month</button>

          <h5 className="cryptoSymbol">Name: {symbol}</h5>
        <Line
          data={this.state.ChartData}
          options={{}}

          />

        </div>
      </div>
      <div className="cryptoInfo">

        <h6 className="cryptoTitle">NAME: {symbol} </h6>


        <h6 className="cryptoStats">OPEN: </h6>{this.state.cryptoInfo[0].open} <br></br>

          <h6 className="cryptoStats">CLOSE: </h6>{this.state.cryptoInfo[  this.state.cryptoInfo.length -1  ].close}
        <br></br>
        <h6 className="cryptoStats">VOLUME: </h6>{this.state.cryptoInfo[0].volumefrom}



        </div>
    </div>

  );

}



}

export default searchCryptoResults
