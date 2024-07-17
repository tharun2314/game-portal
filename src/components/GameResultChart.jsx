import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import Header from "./NotFound/Header";
import MultipleSelect from '../components/Dropdown.jsx';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Box, Typography } from "@mui/material";
import Axios from "../Axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Games = {
  'Snake': 1,
  'Shooter': 2,
  'Mario-Jump': 3,
  'Car-Game': 4
}

const GameResultChart = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [games,setGames]=useState('Snake')


  // useEffect(() => {
  //   Axios.get("/api/get-graph-data")
  //     .then((res) => {
  //       const { pieChartScores, lineChartScores } = res.data;

  //       setPieChartData(pieChartScores);
  //       setLineChartData(lineChartScores);
  //     })
  //     .catch(() => {
  //       console.error("Failed to load graph results");
  //     });
  // }, []);

  const options = {
    index: "y", // Swap axes for horizontal bar chart
    scales: {
      x: {
        ticks: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        // reverse: true,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) => {
            return lineChartData[context[0].dataIndex]?.game;
          },
        },
      },
    },
  };
  const handleDropdownChange = (event) => {
    const { target: { value } } = event;
    console.log(value);
    setGames(
        typeof value === 'string' ? value.split(',') : value,
    );
};
useEffect(()=>{
  
Axios.get(`/api/get-graph-data?top=10&game_id=${Games[games]}`).then(({ data }) => {
  const { pieChartScores, lineChartScores } = data;

  setPieChartData(pieChartScores);
  setLineChartData(lineChartScores);
}).catch(({ response }) => {
  console.log(response.data.message);
});

},[games])

  const chartData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Scores",
        data: lineChartData.map((x) => x.score),
        borderColor: "#36a2eb",
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const pieData = {
    labels: ["snake", "space-shooter", "car", "mario"],
    datasets: [
      {
        label: "Pie chart",
        data: pieChartData,
        backgroundColor: ["#ff9f3f", "#ffcd57", "#4bc0c0", "#36a2eb"],
      },
    ],
  };

  const pieOptions = {
    type: "pie",
    data: pieData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Pie Chart",
        },
      },
    },
  };

  return (
    <>
      <Header />
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
            <Typography sx={{ display: "flex", fontSize: 30 }}>
            Game results
          </Typography>
          
        </Box>
        <MultipleSelect items={['Snake', 'Shooter', 'Mario-Jump', 'Car-Game']} DropdownValue={games} DropdownName={`Game`} handleDropdownChange={handleDropdownChange} />
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <Box height={800} width={800}>
            <Line data={chartData} options={options} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {" "}
              <Typography>Last 10 games</Typography>
            </Box>
          </Box>
          <Box height={400} width={400}>
            <Pie data={pieData} options={pieOptions} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {" "}
              <Typography>Overall games</Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default GameResultChart;
