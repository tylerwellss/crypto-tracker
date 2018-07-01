import React, { Component } from 'react';
import './CoinChart.css';
import axios from 'axios';
import Spinner from '../Shared/Spinner/Spinner';
import Button from '@material-ui/core/Button';

var Linechart = require("react-chartjs").Line;

class LineChart extends Component {
  state = {
    timeFrame: '1 Day',
    graphData: [],
    loading: true,
    limiter: 88,
    dateSlice: 0
  };

  componentDidMount() {
    this.updateChartData('1day', 13, 1);
  }

  updateChartData = (timespan, limiter, dateSlice) => {
    this.setState({loading: true})
    axios.get('https://coincap.io/history/' + timespan + '/' + this.props.coinData.id) // timespan: 1d, 7d, 30d, 90d, 180d, 365d
      .then(response => {
        this.setState({graphData: response.data.price, loading:false, limiter: limiter, dateSlice: dateSlice})
        })
      .catch(err => {
        this.setState({loading: false})
        throw err;
      })
  }

  handleTimeChange = (timespan) => {
    switch (timespan) {
      case '1d':
        this.setState({timeFrame: '1 Day'})
        this.updateChartData('1day', 13, 1)
        return;
      case '7d':
        this.setState({timeFrame: '7 Days'})
        this.updateChartData('7day', 100, 0)
        return;
      case '30d':
        this.setState({timeFrame: '30 Days'})
        this.updateChartData('30day', 45, 0)
        return;
      case '90d':
        this.setState({timeFrame: '90 Days'})
        this.updateChartData('90day', 80, 0);
        return;
      case '180d':
        this.setState({timeFrame: '180 Days'})
        this.updateChartData('180day', 60, 0)
        return;
      case '365d':
        this.setState({timeFrame: '365 Days'})
        this.updateChartData('365day', 20, 0)
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
        if (i % this.state.limiter === 0) {
          graphLabels.push(new Date(this.state.graphData[i][0]).toLocaleString().split(',')[this.state.dateSlice])
          graphData.push(this.state.graphData[i][1])
        }
      }
    }
    
    const chartOptions = {
      response: true,
      bezierCurve : false,
      pointDot : true,
      pointDotStrokeWidth : 4,
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
      chart = (
      <div>
        <Linechart data={data} options={chartOptions} width="900" height="350"/>
        <p style={{'textAlign':'center'}}>Data provided by <a href="https://coincap.io">CoinCap.io</a></p>
      </div>
      )
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
          <Button onClick={() => this.handleTimeChange('180d')} variant="outlined" size="small" className="Button">180d</Button>
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