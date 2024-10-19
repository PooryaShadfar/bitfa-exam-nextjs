import React from 'react';
import Link from 'next/link';
const Table = ({ data, onSort, sortColumn, sortOrder }) => {
	return (
		<table className="table">
			<thead>
				<tr>
					<th onClick={() => onSort('netProfit')}>
						Net Profit
						{sortColumn === 'netProfit' && (
							<span className={`sort-icon ${sortOrder === 'asc' ? 'asc' : 'desc'}`} />
						)}

					</th>
					<th onClick={() => onSort( 'walletAddress')}>Wallet Address</th>
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={index}>
						<td>{item.netProfit}</td>
						<td>
							<Link href={`/chart?walletAddress=${item.walletAddress}`}>
								<span className="wallet-address">{item.walletAddress}</span>
								<span className="link-to"></span>
							</Link>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
