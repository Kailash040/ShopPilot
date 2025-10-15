import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Chart = ({ type = "bar", data, options, className }) => {
  const Component = type === "line" ? Line : Bar;
  return (
    <div className={className}>
      <Component data={data} options={options} />
    </div>
  );
};

export default Chart;


