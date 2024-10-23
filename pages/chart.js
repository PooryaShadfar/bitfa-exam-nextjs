import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import WalletChart from "@/components/WalletChart";
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
					// console.log("tokenData: ",token);
					token["Buy Times"].forEach(buyTime => {
						const month = new Date(buyTime.time).getMonth() + 1;
						const monthKey = `2024-${month.toString().padStart(2, '0')}`; // Format month (e.g., 2024-09)
						if (!monthlyData[monthKey]) {
							monthlyData[monthKey] = { buyCount: 0, sellCount: 0, buyVolume: 0, sellVolume: 0 };
						}
						monthlyData[monthKey].buyCount++;
						monthlyData[monthKey].buyVolume += token["Buy Amount (USD)"]; // Assuming "Buy Amount (USD)" is the volume for each buy

					});
					token["Sell Times"].forEach(sellTime => {
						const month = new Date(sellTime.time).getMonth() + 1;
						const monthKey = `2024-${month.toString().padStart(2, '0')}`;
						if (!monthlyData[monthKey]) {
							monthlyData[monthKey] = { buyCount: 0, sellCount: 0, buyVolume: 0, sellVolume: 0 };
						}
						monthlyData[monthKey].sellCount++;
						monthlyData[monthKey].sellVolume += token["Sell Amount (USD)"];
					});
				});

				const labels = Object.keys(monthlyData);
				const datasets = [
					{
						label: "Buy Count",
						data: labels.map(month => monthlyData[month].buyVolume),
						yAxisID: "left-y-axis",
						backgroundColor: 'green',
						type: 'bar',
						order: 1,
					},
					{
						label: "Sell Count",
						data: labels.map(month => monthlyData[month].sellVolume),
						yAxisID: "left-y-axis",
						backgroundColor: 'red',
						type: 'bar',
						order: 1,
					},
					{
						label: 'Buy/Sell Count',
						data: labels.map(month => monthlyData[month].buyCount + monthlyData[month].sellCount),
						xAxisID: 'left-x-axis',
						borderColor: 'blue',
						type: 'line',
						order: 0,
					}
				];

				setChartData({ labels, datasets });
				// console.log("datasets",datasets)
			} else {
				console.error("Wallet data not found!");
			}
		}
	}, [walletAddress]);

	return (
		<div className="wallet-chart-area">
			<h1 className="wallet-title">
				Wallet Chart: {walletAddress}
			</h1>
			<div className="wallet-chart-section">
				{chartData && (
					<WalletChart data={chartData} />
				)}
			</div>
		</div>
	);
};

export default ChartPage;
