"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement // Register the BarElement for Bar charts
);

function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataOnLoad = async () => {
      try {
        const response = await fetch("http://192.168.31.184:5000/report");
        const result = await response.json();
        setData(JSON.parse(result["message"]));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchDataOnLoad();
  }, []);

  const handlePrint = () => {
    window.print(); // Trigger the print dialog
  };

  if (!data) {
    return <div>Loading...</div>; // Display loading state
  }

  // Prepare data for charts
  const lineChartData = {
    labels: data.visualization_data.line_chart_fluency.map(
      (entry) => `Response ${entry.response}`
    ),
    datasets: [
      {
        label: "Fluency Score",
        data: data.visualization_data.line_chart_fluency.map(
          (entry) => entry.fluency_score
        ),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: Object.keys(data.visualization_data.bar_chart_mistakes),
    datasets: [
      {
        label: "Mistakes Count",
        data: Object.values(data.visualization_data.bar_chart_mistakes),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Clarity Score", "Communication Score"],
    datasets: [
      {
        data: [
          data.visualization_data.pie_chart_communication_clarity.clarity_score,
          data.visualization_data.pie_chart_communication_clarity
            .communication_score,
        ],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-8xl font-bold mb-4">Interview Analytics</h1>

      {/* Display Interview Report */}
      <div className="mb-8">
        <h2 className="text-4xl mt-2 font-semibold">Interview Report</h2>
        <div className="text-2xl mt-2">
          <p>
            <strong>Role:</strong> {data["Interview Report"].role}
          </p>
          <p>
            <strong>Scenario:</strong> {data["Interview Report"].Scenario}
          </p>
        </div>
      </div>

      {/* Fluency Chart */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold">Fluency Score per Response</h2>
        <Line data={lineChartData} options={{ responsive: true }} />
      </div>

      {/* Mistakes Chart */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold">Mistakes Count</h2>
        <Bar data={barChartData} options={{ responsive: true }} />
      </div>

      {/* Display Mistakes */}
      <div className="mb-8">
        <h2 className="text-4xl  font-semibold">Suggested Improvements</h2>
        <ul className="list-disc pl-5">
          {data.mistakes.map((mistake, index) => (
            <li className="mt-3 ml-12 text-2xl" key={index}>
              {mistake}
            </li>
          ))}
        </ul>
      </div>

      {/* Communication and Clarity Scores Chart */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold">
          Communication and Clarity Scores
        </h2>
        <Pie data={pieChartData} options={{ responsive: true }} />
      </div>

      {/* Display Scores */}
      <div className="mb-8">
        <h2 className="text-4xl  font-semibold">Scores</h2>
        <p className="text-2xl mt-2">
          <strong>&emsp;&emsp;Clarity:</strong> {data.scores.clarity}
        </p>
        <p className="text-2xl mt-2">
          <strong>&emsp;&emsp;Confidence:</strong> {data.scores.confidence}
        </p>
        <p className="text-2xl mt-2">
          <strong>&emsp;&emsp;Accuracy:</strong> {data.scores.accuracy}
        </p>
      </div>

      {/* Display Suggested Improvements */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold">Suggested Improvements</h2>
        <ul className="list-disc text-2xl mt-2 pl-5">
          {data.suggested_improvements.map((improvement, index) => (
            <li className="mt-3 ml-12 text-2xl" key={index}>
              {improvement}
            </li>
          ))}
        </ul>
      </div>

      {/* Display Benchmark Comparison */}
      <div className="mb-8">
        <h2 className="text-4xl font-semibold">Benchmark Comparison</h2>
        <p className="text-2xl mt-2">
          <strong>&emsp;&emsp;Average Fluency:</strong>{" "}
          {data.benchmark_comparison.average_fluency}
        </p>
        <p className="text-2xl mt-2">
          <strong>&emsp;&emsp;Average Clarity:</strong>{" "}
          {data.benchmark_comparison.average_clarity}
        </p>
        <p className="text-2xl mt-2">
          <strong>&emsp;&emsp;Average Accuracy:</strong>{" "}
          {data.benchmark_comparison.average_accuracy}
        </p>
      </div>

      {/* Display Summary */}
      <div className="mt-8">
        <h2 className="text-4xl font-semibold">Summary</h2>
        <p className="text-2xl mt-2">{data.summary}</p>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="mb-4 mt-8 p-2 bg-blue-500 text-white rounded"
      >
        Print Report
      </button>
    </div>
  );
}

export default AnalyticsPage;
