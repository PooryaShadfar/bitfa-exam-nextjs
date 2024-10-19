import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const maxVisiblePages = 3; // Show at most 3 pages at a time

	// Calculate the range of pages to display
	let startPage = Math.max(1, currentPage - 1);
	const endPage = Math.min(totalPages, currentPage + 1);

	// Handle cases where the start or end page is outside the visible range
	if (endPage - startPage < maxVisiblePages - 1) {
		startPage = Math.max(1, endPage - (maxVisiblePages - 1));
	}

	const pageNumbers = [];
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	// Function to handle "Previous" button click
	const handlePrevious = () => {
		onPageChange(currentPage - 1);
	};

	// Function to handle "Next" button click
	const handleNext = () => {
		onPageChange(currentPage + 1);
	};

	return (
		<nav>
			<ul className="pagination">
				{/* Previous button */}
				{currentPage > 1 && (
					<li className="page-item">
						<a className="page-link" onClick={handlePrevious}>
							Previous
						</a>
					</li>
				)}
				{/* First page (only show when current page is bigger than 9) */}
				{currentPage >= 9 && (
					<li className="page-item">
						<a className="page-link" onClick={() => onPageChange(1)}>
							1
						</a>
					</li>
				)}
				{/* ... (Ellipsis) for skipped pages bigger than 9 */}
				{(currentPage  >= 9 ) && (
					<li className="page-item disabled">
						<a className="page-link">...</a>
					</li>
				)}
				{/* Page numbers */}
				{pageNumbers.map((number) => (
					<li key={number} className={number === currentPage ? 'page-item active' : 'page-item'}>
						<a className="page-link" onClick={() => onPageChange(number)}>
							{number}
						</a>
					</li>
				))}

				{/* ... (Ellipsis) for skipped pages */}
				{(endPage < totalPages && currentPage !== totalPages) && (
					<li className="page-item disabled">
						<a className="page-link">...</a>
					</li>
				)}

				{/* Last page (only show when not on the last page) */}
				{endPage < totalPages && currentPage !== totalPages && (
					<li className="page-item">
						<a className="page-link" onClick={() => onPageChange(totalPages)}>
							{totalPages}
						</a>
					</li>
				)}
				{/* Next button */}
				{currentPage < totalPages && (
					<li className="page-item">
						<a className="page-link" onClick={handleNext}>
							Next
						</a>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Pagination;
