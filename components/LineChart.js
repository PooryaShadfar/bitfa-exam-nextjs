import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const LineChart = ({ data, options }) => {
	return (
		<div>
			<Bar data={data} options={options} height="500" width="750"/>
		</div>
	);
};

export default LineChart;
