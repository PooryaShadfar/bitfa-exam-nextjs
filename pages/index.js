import React, { useState } from 'react';
import Table from '../components/Table';
import Pagination from '../components/Pagination';
import data from '../data/valuable_wallets_sample.json';

const TablePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5);
	// Limit to the first 50 items
	const [sortedData, setSortedData] = useState(data.slice(0, 50));
	const [sortColumn, setSortColumn] = useState('netProfit');
	const [sortOrder, setSortOrder] = useState('asc');

	// Filter data by networkId (after limiting to 50)
	const filteredData = sortedData.filter(item => item.networkId === 'eth');

	// Calculate pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleSort = (column) => {
		const isAscending = sortColumn === column && sortOrder === 'asc';
		const newSortOrder = isAscending ? 'desc' : 'asc';
		setSortOrder(newSortOrder);
		setSortColumn(column);

		const sorted = [...filteredData].sort((a, b) => {
			if (a[column] < b[column]) {
				return isAscending ? -1 : 1;
			}
			if (a[column] > b[column]) {
				return isAscending ? 1 : -1;
			}
			return 0;
		});
		setSortedData(sorted);
	};

	return (
		<div>
			<h1>Wallet Data&#39;s</h1>
			<Table data={currentItems} onSort={handleSort} sortColumn={sortColumn} sortOrder={sortOrder} />
			<Pagination
				itemsPerPage={itemsPerPage}
				totalItems={filteredData.length}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	);
};

export default TablePage;
