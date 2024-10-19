import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import LineChart from "@/components/LineChart";
import data from "@/data/valuable_wallets_sample.json";

const ChartPage = () => {
	const [chartData, setChartData] = useState(null);
	const searchParams = useSearchParams();
	const walletAddress = searchParams?.get('walletAddress');

	useEffect(() => {
		if (walletAddress) {
			const foundWallet = data.find(wallet => wallet.walletAddress === walletAddress);
			if (foundWallet) {
				const monthlyData = {};
				foundWallet.HotTokenHolders.forEach(token => {
					console.log("tokenData: ",token);
					token["Buy Times"].forEach(buyTime => {
						const month = new Date(buyTime.time).getMonth() + 1;
						const monthKey = `2024-${month.toString().padStart(2, '0')}`; // Format month (e.g., 2024-09)
						if (!monthlyData[monthKey]) {
							monthlyData[monthKey] = { buyCount: 0, sellCount: 0, buyVolume: 0, sellVolume: 0 };
						}
						// console.log("Buy Count: ",monthKey + " : " + monthlyData[monthKey].buyVolume)
						monthlyData[monthKey].buyCount++;
						monthlyData[monthKey].buyVolume += token["Num of Buy Times"];
					});
					token["Sell Times"].forEach(sellTime => {
						const month = new Date(sellTime.time).getMonth() + 1;
						const monthKey = `2024-${month.toString().padStart(2, '0')}`;
						if (!monthlyData[monthKey]) {
							monthlyData[monthKey] = { buyCount: 0, sellCount: 0, buyVolume: 0, sellVolume: 0 };
						}
						// console.log("Sell Count: ",monthKey + " : " + monthlyData[monthKey].sellVolume)
						monthlyData[monthKey].sellCount++;
						monthlyData[monthKey].sellVolume += token["Num of Sell Times"];
					});
				});

				const labels = Object.keys(monthlyData);
				const datasets = [
					{
						label: "Buy Count",
						data: labels.map(month => monthlyData[month].buyCount),
						yAxisID: "left-y-axis",
						backgroundColor: 'green',
						type: 'bar'
					},
					{
						label: "Sell Count",
						data: labels.map(month => monthlyData[month].sellCount),
						yAxisID: "left-y-axis",
						backgroundColor: 'red',
						type: 'bar'
					},
					{
						label: 'Buy/Sell Count',
						data: labels.map(month => monthlyData[month].buyVolume ) + (month => monthlyData[month].sellVolume),
						xAxisID: 'right-x-axis',
						borderColor: 'blue',
						type: 'line'
					}
				];

				setChartData({ labels, datasets });
			} else {
				console.error("Wallet data not found!");
			}
		}
	}, [walletAddress]);

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
				padding: 10,
				titleColor: "#333",
				bodyFontSize: "14",
				borderWidth: 0.6,
				borderColor: "#ccc",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				min: 0,
				max: 120,
				stepSize: 5,
				position: 'left',
				id: 'left-y-axis',

			},
		},
	};

	return (
		<div>
			<h1>Wallet Chart: {walletAddress}</h1>
			{chartData && (
				<LineChart data={chartData} options={options} />
			)}
		</div>
	);
};

export default ChartPage;
