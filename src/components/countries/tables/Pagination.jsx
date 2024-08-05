import chevron from "../../../assets/chevron.svg";
import Icon from "../../base/Icon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    if (endPage - startPage < 4) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const btnStyle = `text-md font-semibold w-8 h-8 rounded-full hover:bg-gray-200`;
  const disabledStyle = `text-gray-400 cursor-not-allowed`;

  return (
    <div className="flex space-x-4 items-center lg:justify-end sm:justify-center">
      <button
        className={`${btnStyle} ${currentPage === 1 ? disabledStyle : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Icon className="p-1" src={chevron} alt="chevron-icon" />

      </button>
      {getPages().map((page) => (
        <button
          className={`${btnStyle} ${page === currentPage ? "bg-teal-500 text-white" : ""}`}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={`rotate-180 ${btnStyle} ${currentPage === totalPages ? disabledStyle : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Icon className="p-1" src={chevron} alt="chevron-icon" />
      </button>
    </div>
  );
};

export default Pagination;
