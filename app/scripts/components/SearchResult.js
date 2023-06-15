import React, { useEffect, useState } from "react";
import { useGetSearchedProductsMutation } from "../Redux/Services";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

const SearchResult = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [getSearchedProducts, { isLoading, data, isSuccess }] =
    useGetSearchedProductsMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchedText = params.get("searchedText");

  useEffect(() => {
    if (searchedText) {
      getSearchedProducts({ searchTerm: searchedText, page: 1, limit: 12 });
    } else {
      navigate("/");
    }
  }, [searchedText]);

  if (isLoading) {
    return (
      <div id="lds-ring-wrapper">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section id="product-section">
        <div className="container">
          <div className="product-slider">
            <div className="product-card">
              {data?.data?.map((item) => {
                return (
                  <div key={item.id} className="card-wrapper">
                    <div className="img-wrapper">
                      <img src={`${item.picture}`} alt="picture" />
                    </div>
                    <p className="item-text">{item.name}</p>
                    <b>{item.price}</b>
                    <br></br>
                    <button className="add-cartbtn">ADD TO BAG</button>
                  </div>
                );
              })}
            </div>
          </div>
          <Pagination
            onChangePage={({ currentPage }) => {
              setCurrentPage(currentPage);
              getSearchedProducts({
                searchTerm: searchedText,
                page: currentPage,
                limit: 12,
              });
            }}
            itemLength={data?.totalCount || 0}
            currentPage={currentPage}
          />
        </div>
      </section>
    </>
  );
};
export default SearchResult;
