/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */

import React, { useEffect, useState } from "react";
import { useGetSearchedProductsMutation } from "../Redux/Services";
import { useDebounce } from "use-debounce";
import ProductCard from "./ProductCard";
import { useLocation, useNavigate } from "react-router-dom";

function Menu() {
  /**
   * states for menu items
   * @memberof Menu
   */
  // state for storing the text of searchbar
  const [searchText, setSearchText] = useState(null);
  const [debounceSearchText] = useDebounce(searchText, 300);
  //location hook
  const location = useLocation();
  // navigate hook for navigating to new route
  const navigate = useNavigate();
  // getting function from RTK query hook to get the data from search input
  const [getSearchedProducts, { isSuccess, data }] =
    useGetSearchedProductsMutation();

  // calls onSearch function whenever debounceSearchText changes
  useEffect(() => {
    if (debounceSearchText) onSearch();
  }, [debounceSearchText]);

  // resets the search text when location changes
  useEffect(() => {
    setSearchText(null);
  }, [location]);

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */
  const onSearch = () => {
    const searchedText = debounceSearchText?.trim();
    searchedText &&
      getSearchedProducts({ searchTerm: searchedText, page: 1, limit: 4 });
  };

  // function for navigating to the searched items
  const onNavigate = (e) => {
    if (debounceSearchText) {
      e.preventDefault();
      navigate("/searchResult?searchedText=" + debounceSearchText);
    }
  };

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  return (
    <header className="menu">
      <div className="menu-container">
        <div className="menu-holder">
          <h1>ELC</h1>
          <nav>
            <a href="#" className="nav-item">
              HOLIDAY
            </a>
            <a href="#" className="nav-item">
              WHAT'S NEW
            </a>
            <a href="#" className="nav-item">
              PRODUCTS
            </a>
            <a href="#" className="nav-item">
              BESTSELLERS
            </a>
            <a href="#" className="nav-item">
              GOODBYES
            </a>
            <a href="#" className="nav-item">
              STORES
            </a>
            <a href="#" className="nav-item">
              INSPIRATION
            </a>
            <span style={{ marginLeft: "50px" }}>
              <input
                type="text"
                className="searchBar"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onNavigate(e);
                  }
                }}
              />
            </span>
          </nav>
        </div>
      </div>

      {debounceSearchText && isSuccess && data?.data?.length > 0 && (
        <div className={"showing search-container"}>
          <section id="serach-product-section">
            <div className="container">
              <div className="resulted-text">
                <hr />
                <p>
                  DISPLAYING 4 OF {data.totalCount} RESULTS{" "}
                  <a onClick={onNavigate}>SEE ALL RESULTS</a>
                </p>
                <hr />
              </div>
              <div className="product-wrapper">
                {data?.data?.slice(0, 4).map((item) => (
                  <ProductCard productData={item} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}

export default Menu;
