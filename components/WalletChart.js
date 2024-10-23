import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const WalletChart = ( { data }) => {

	// Chart Options
	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				yAlign: "bottom",
				backgroundColor: "#fff",
				bodyColor: "#333",
				padding: 8,
				titleColor: "#333",
				bodyFontSize: "12",
				borderWidth: 0.5,
				borderColor: "#ccc",
			},
		},
		scales: {
			y: {
				order: 1,

				ticks: {
					// it shows right side of data line numbers to be in a legit way if comment this the data will be messy in first POV.

					display: true
				},
				grid: {
					drawBorder: false,
					color: "rgba(0, 0, 0, 0)",
					zeroLineColor: "rgba(0, 0, 0, 0)",
				},
				beginAtZero: true,
				// uncomment below will show the data line messy but in correct way.

				// min: 0,
				// max: 120,
			},
			x:{
				// order: 1,
				ticks: {
					display: false
				},
				grid: {
					drawBorder: false,
					color: "rgba(0, 0, 0, 0)",
					zeroLineColor: "rgba(0, 0, 0, 0)",
				},
			},
			x1:{
				ticks: {
					display: false
				},
				grid: {
					drawBorder: false,
					color: "rgba(0, 0, 0, 0)",
					zeroLineColor: "rgba(0, 0, 0, 0)",
				},
				// order: 1
			}
		},
	};
	return (
		<>
			<Bar data={data} options={options} height="500" width="750"/>
		</>
	);
};

export default WalletChart;
