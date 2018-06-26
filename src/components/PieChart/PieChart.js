import React from 'react';
import './PieChart.css'

var PieChart = require("react-chartjs").Pie;


const pieChart = (props) => {
  const chartOptions = {
    responsive: false,
  }

  return (

    <div className="PieChart">
      <PieChart data={props.data} options={chartOptions} width="600" height="350"/>
    </div>
  );
}

export default pieChart;