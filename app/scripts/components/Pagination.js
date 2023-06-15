import React, { useState, useEffect } from "react";

const Pagination = ({
  itemLength = 12,
  rowsPerPage = 12,
  onChangePage,
  currentPage,
}) => {
  const [pager, setPager] = useState();
  const [initialPage, setInitialPage] = useState(1);

  useEffect(() => {
    if (itemLength > 0) {
      if (currentPage !== 1) {
        setPage(currentPage, true);
      } else {
        setPage(initialPage, true);
      }
      setInitialPage(1);
    }
    // eslint-disable-next-line
  }, [itemLength]);

  const setPage = (page, initial = false) => {
    let tmppager = pager;
    console.log("Page Val", page);
    // get new pager object for specified page
    tmppager = getPager(itemLength, page, rowsPerPage);

    // update state
    setPager(tmppager);

    console.log(tmppager)

    if (!initial)
      // call change page function in parent component
      onChangePage(tmppager);
  };

  const getPager = (totalItems, currentPage, pageSize) => {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 10;

    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 4) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = [...Array(endPage + 1 - startPage).keys()].map(
      (i) => startPage + i
    );
    

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages,
    };
  };


  return (
    <div className="pagination-container">
      <h4 className="total-records">Total Records: {itemLength}</h4>
      <div className="btn-pagination-container">
        {pager?.totalPages > 4 ? (
          <button
            disabled={pager?.currentPage === 1}
            onClick={() => setPage(1)}
            className="btn-firstpage btn-pagnation"
          >
            {"<<"}
          </button>
        ) : (
          <></>
        )}
        <button
          disabled={pager?.currentPage === 1}
          onClick={() => setPage((pager?.currentPage || 1) - 1)}
          className="btn-firstButton btn-pagnation"
        >
          {"<"}
        </button>

        {(pager?.pages || [])?.map((page, index) => (
            
          <button
            key={index}
            onClick={() => setPage(page)}
            className={pager.currentPage===page?"btn-pagnation btn-selected":"btn-pagnation"}
            
          >
            {page}
          </button>
        ))}
        <button
          disabled={(pager?.currentPage || 1) === (pager?.endPage || 1)}
          onClick={() => setPage((pager?.currentPage || 1) + 1)}
          className="btn-pagnation"
        >   
          {">"}
        </button>
        {pager?.totalPages > 4 ? (
          <button
            disabled={(pager?.currentPage || 1) === (pager?.endPage || 1)}
            onClick={() => setPage(pager?.totalPages)}
           className="btn-lastpage btn-pagnation"
          >
            {">>"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Pagination;
