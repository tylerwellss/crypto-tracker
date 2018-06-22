import React, { Component } from 'react';
import './CoinChart.css';
import axios from 'axios';
// import * as MockData from './Mock24HourData.json'
import Spinner from '../Shared/Spinner/Spinner';
import Button from '@material-ui/core/Button';

var Linechart = require("react-chartjs").Line;


class LineChart extends Component {
  state = {
    timeFrame: '1 Day',
    graphData: undefined,
    loading: true
  };

  componentDidMount() {
    console.log(this.props.coinData.id)
    this.updateChartData('1day')
  }

  updateChartData = (timespan, limiter) => {
    this.setState({loading: true})
    let graphLabels = [];
    let graphData = [];
    axios.get('http://coincap.io/history/' + timespan + '/' + this.props.coinData.id) // timespan: 1d, 7d, 30d, 90d, 185d, 365d
      .then(response => {
        this.setState({graphData: response.data.price});
        this.setState({loading:false})
        for (let i = 0; i < this.state.graphData.length; i++) {
          console.log(this.state.graphData[i][0])
          if (this.state.graphData[i][0] % 50000000 === 0) {
            graphLabels.push(new Date(this.state.graphData[i][0]).toLocaleString('en-US').split(',')[1])
            graphData.push(this.state.graphData[i][1])
          }
        }
      })
      .catch(err => {
        this.setState({loading: false})
        throw err;
      })
  }

  handleTimeChange = (timeframe) => {
    switch (timeframe) {
      case '1d':
        this.setState({timeFrame: '1 Day'})
        this.updateChartData('1day', 88)
        return;
      case '7d':
        this.setState({timeFrame: '7 Days'})
        this.updateChartData('7day', 8888)
        return;
      case '30d':
        this.setState({timeFrame: '30 Days'})
        this.updateChartData('30day', 99999)
        return;
      case '90d':
        this.setState({timeFrame: '90 Days'})
        return;
      case '185d':
        console.log('185d selected');
        this.setState({timeFrame: '185 Days'})
        return;
      case '365d':
        console.log('365d selected');
        this.setState({timeFrame: '365 Days'})
        return;
      default: 
        return;
    }
  }

  render() {
    let graphLabels = [];
    let graphData = [];
    // Productiuon:
    if (this.state.graphData) {
      for (let i = 0; i < this.state.graphData.length; i++) {
        if (this.state.graphData[i][0] % 88 === 0) {
          graphLabels.push(new Date(this.state.graphData[i][0]).toLocaleString().split(',')[0])
          graphData.push(this.state.graphData[i][1])
        }
      }
    }
    
    const chartOptions = {
      response: true,
      maintainAspectRatio: true,
      scaleShowGridLines : false,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
    }

    const data = {
      labels: graphLabels,
      datasets: [
        {
          label: "Prices",
          fillColor: "rgba(127, 180, 232, 0.2)",
          strokeColor: "#0074D9",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: graphData
        },
      ]
    };
    let chart = undefined;
    if (!this.state.loading) {
      chart = <Linechart data={data} options={chartOptions} width="900" height="350"/>
    } else {
      chart = <div style={{'textAlign':'center'}}><Spinner /></div>
    }

    return (
      <div>
        <div className="FlexRow">
          <h3>{this.state.timeFrame}</h3>
          <Button onClick={() => this.handleTimeChange('1d')} variant="outlined" size="small" className="Button MarginLeft active">1d</Button>
          <Button onClick={() => this.handleTimeChange('7d')} variant="outlined" size="small" className="Button">7d</Button>
          <Button onClick={() => this.handleTimeChange('30d')} variant="outlined" size="small" className="Button">30d</Button>
          <Button onClick={() => this.handleTimeChange('90d')} variant="outlined" size="small" className="Button">90d</Button>
          <Button onClick={() => this.handleTimeChange('185d')} variant="outlined" size="small" className="Button">185d</Button>
          <Button onClick={() => this.handleTimeChange('365d')} variant="outlined" size="small" className="Button">365d</Button>
        </div>
        <div>
          {chart}
        </div>
      </div>
    );
  };
};

export default LineChart;

// TODO: 
// Conditionally color % changes in coin page