import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "./../assets/wrappers/PageBtnContainer";

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
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
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
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
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
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;

// const PageBtnContainer = ({ pages, page, keyword = "", category = "" }) => {
//   return (
//     <Wrapper>
//       {pages > 1 && (
//         <Pagination className="pagination">
//           {[...Array(pages).keys()].map((x) => (
//             <LinkContainer
//               key={x + 1}
//               to={{
//                 pathname: "/all-companies",
//                 search: `?search=${keyword}&category=${category}&pageNumber=${
//                   x + 1
//                 }`,
//               }}
//             >
//               <Pagination.Item
//                 className={
//                   x + 1 === page ? "pagination-item active" : "pagination-item"
//                 }
//                 action={(x + 1 === page).toString()}
//               >
//                 {x + 1}
//               </Pagination.Item>
//             </LinkContainer>
//           ))}
//         </Pagination>
//       )}
//     </Wrapper>
//   );
// };
// export default PageBtnContainer;
