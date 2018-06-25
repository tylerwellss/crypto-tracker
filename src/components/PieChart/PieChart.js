import React from 'react';
import './PieChart.css'

var PieChart = require("react-chartjs").Pie;


const pieChart = (props) => {
  const chartOptions = {
    responsive: true,
  }

  return (

    <div>
      <PieChart data={props.data} chartOptions={chartOptions} width="900" height="350"/>
    </div>
  );
}

export default pieChart;