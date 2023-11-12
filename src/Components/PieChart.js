import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import colorpicker from "../Components/functions/colorpicker";
const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/pieChart?month=${month}`)
      .then((res) => {
        setChartData(getData(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Number of items sold from different categories during the month of ${(month)}`,
      },
    },
  };

  function getData(Data) {
    return {
      labels: Data.map(data => data._id),
      datasets: [
        {
          label: "",
          data: Data.map(data => data.count),
          backgroundColor: colorpicker(Data.length),
          borderWidth: 0,
        },
      ],
    };
  }


  return <div className="pie-chart"> {chartData && <Pie options={options} data={chartData}/>}</div>;
};

export default PieChart;