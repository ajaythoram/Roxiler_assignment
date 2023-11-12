import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import colorpicker from "../Components/functions/colorpicker";
const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect( () => {
   
     axios
      .get(`http://localhost:8001/barChart?month=${month}`)
      .then((res) => {
        setChartData(getData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      })
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Number of items sold on different price ranges during the month of ${(month)}`,
      },
    },
  };

  function getData(Data) {
    return {
      labels: [
        "0-100",
        "101-200",
        "201-300",
        "301-400",
        "401-500",
        "501-600",
        "601-700",
        "701-800",
        "801-900",
        "901-above",
      ],
      datasets: [
        {
          label: "count",
          data: formatData(Data),
          backgroundColor: colorpicker(Data.length),
          borderWidth: 0,
        },
      ],
    };
  }

  function formatData(data) {
    return data.map((data) => {
      const idx = Math.floor(data._id / 100);
      return data.count;
    });
  }
  return (
    <div className="bar-chart">{chartData && <Bar options={options} data={chartData} />}</div>
  );
};

export default BarChart;