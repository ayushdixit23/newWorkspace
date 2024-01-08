import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({ length, postPerPage, currentPage, setCurrentPage }) => {
  let page = [];
  const totalPages = Math.ceil(length / postPerPage);

  // Function to generate an array of page numbers
  const generatePageArray = () => {
    const maxButtons = 5;
    const maxPagesToShow = Math.min(totalPages, maxButtons);
    const middleIndex = Math.ceil(maxPagesToShow / 2);

    if (currentPage <= middleIndex) {
      for (let i = 1; i <= maxPagesToShow; i++) {
        page.push(i);
      }
    } else if (currentPage > totalPages - middleIndex) {
      for (let i = totalPages - maxPagesToShow + 1; i <= totalPages; i++) {
        page.push(i);
      }
    } else {
      for (
        let i = currentPage - Math.floor(maxPagesToShow / 2);
        i <= currentPage + Math.floor(maxPagesToShow / 2);
        i++
      ) {
        page.push(i);
      }
    }
  };

  generatePageArray();

  return (
    <>
      <div className="flex justify-between items-center p-3">
        <div className="text-sm text-[#667085]">Showing 1-10 from 100</div>
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
            disabled={currentPage === 1}
            className="text-lg"
          >
            <BsChevronLeft />
          </button>

          <div className="flex justify-center gap-2 items-center my-5">
            {page.map((p, i) => (
              <div
                key={i}
                onClick={() => setCurrentPage(p)}
                className={`text-white gap-2 p-2 px-5 rounded-md ${
                  p === currentPage
                    ? "bg-[#0066FF] text-white shadow-2xl border-2"
                    : "bg-[#0066FF]/20 text-[#0066FF] border"
                }`}
              >
                {p}
              </div>
            ))}

            {totalPages > 5 && currentPage + Math.floor(5 / 2) < totalPages && (
              <div className="text-black gap-2 rounded-md cursor-not-allowed">
                ...
              </div>
            )}
          </div>

          <button
            onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
            disabled={currentPage === totalPages}
            className="text-lg"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
