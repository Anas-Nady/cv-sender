import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "./../assets/wrappers/PageBtnContainer";
import { nextArrow, prevArrow } from "../constants/PAGINATION";

const PageBtnContainer = ({ pages, page }) => {
  const pagesNumber = Array.from({ length: pages }, (_, index) => {
    return index + 1;
  });

  const navigateTo = useNavigate();
  const { search, pathname } = useLocation();
  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("pageNumber", pageNumber);
    navigateTo(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${
          activeClass && "active flex justify-center items-center"
        }`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        <span>{pageNumber}</span>
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // first page
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));
    // dots

    if (page > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }
    // one before current page
    if (page !== 1 && page !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: page - 1,
          activeClass: false,
        })
      );
    }
    // current page
    if (page !== 1 && page !== pages) {
      pageButtons.push(
        addPageButton({
          pageNumber: page,
          activeClass: true,
        })
      );
    }
    // one after current page

    if (page !== pages && page !== pages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: page + 1,
          activeClass: false,
        })
      );
    }
    if (page < pages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: pages,
        activeClass: page === pages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper dir="ltr">
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        {prevArrow}
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = page + 1;
          if (nextPage > pages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        {nextArrow}
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
