import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IDataStats } from "../../../toolbox/interfaces/interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Ciudadanos vacunados",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["Hombres", "Mujeres"];

interface IStatsProps {
  dataStats: IDataStats;
}

export const Stats: React.FC<IStatsProps> = (props) => {
  const stats = props.dataStats;
  const data = {
    labels,
    datasets: [
      {
        label: "Menores",
        data: [stats.men.minors, stats.women.minors],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Mayores",
        data: [stats.men.adults, stats.women.adults],
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
