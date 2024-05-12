import React from "react";
import "./trend.css";
import { Chart as ChartJS } from "chart.js/auto";

import { Bar } from "react-chartjs-2";

function ExpenseTrend({ data }) {
  let totalFood = 0;
  let totalTravel = 0;
  let totalEnter = 0;
  if (data) {
    data.forEach((elem) => {
      if (elem.category === "Food") {
        totalFood += elem.amount;
      }
      if (elem.category === "Travel") {
        totalTravel += elem.amount;
      }
      if (elem.category === "Entertainment") {
        totalEnter += elem.amount;
      }
    });
  }
  const chartData = [
    { name: "Food", value: totalFood },
    { name: "Entertainment", value: totalEnter },
    { name: "Travel", value: totalTravel },
  ];
 
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const barData = {
    labels: chartData.map((item) => item.name),
    datasets: [
      {
        data: chartData.map((item) => item.value),
        backgroundColor: ["#8784D2"],
        label: "",
        borderWidth: 1,
        borderRadius: 20,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
  };
  const option = {
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  return (
    <div className="expGrid">
      <h2>Top Expenses</h2>
      <div className="expCard">
       {data.length > 0 ? ( <div style={{ width: "100%", height: "90%" }}>
          <Bar data={barData} height="318" width="415" options={option} />
        </div>) : (<div className="summary"><p className="noData" style={{color:"#000"}}>No Data Available</p></div>)}
       
      </div>
    </div>
  );
}

export default ExpenseTrend;
