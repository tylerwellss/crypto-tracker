import React, { Component } from 'react';
import * as Mock24HourData from './Mock24HourData.json'
import './CoinChart.css';
var Linechart = require("react-chartjs").Line;


class LineChart extends Component {
  state = {
    timeframe: '24h'
  };

  render() {
    // Set up graph data
    let graphLabels = [];
    let graphData = [];
    for (let i = 0; i < Mock24HourData.price.length; i++) {
      if (Mock24HourData.price[i][0] % 88 === 0) {
        console.log(Mock24HourData.price[i])
        graphLabels.push(new Date(Mock24HourData.price[i][0]).toLocaleString('en-US').split(',')[1])
        graphData.push(Mock24HourData.price[i][1])
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

    return (
      <div>
        <h3>Chart ({this.state.timeframe})</h3>
        <Linechart data={data} options={chartOptions} width="900" height="350"/>
      </div>
    );
  };
};

export default LineChart;