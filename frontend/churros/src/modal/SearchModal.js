import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const SearchBackdrop = ({ searchOnClick, searchOffClick }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20"
      onClick={searchOffClick}
    />
  );
};

const SearchContent = ({ searchOnClick, searchOffClick }) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  const searchWordOnChange = (e) => {
    setSearchWord(e.target.value);
    console.log(searchWord);
  };
  const searchGo = (e) => {
    e.preventDefault();
    searchOffClick();
    navigate("/search", {state: searchWord});
    setSearchWord("");
  };
  const modalHolderStyle = {
    position: "fixed",
    top: "10vh",
    left: "25%",
    width: "50%",
    height: "30vh",
    zIndex: 100,
  };
  return (
    <div
      className=""
      style={modalHolderStyle}
    >
      <div class="flex flex-col justify-center bg-white shadow dark:bg-gray-700 bg-white rounded-lg relative">
        <button
          type="button"
          class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <form className="flex items-center">
          <label htmlFor="voice-search" className="sr-only">
            검색
          </label>
          <div className="relative w-[80%] m-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="검색어를 입력해 주세요"
              required
              value={searchWord}
              onChange={searchWordOnChange}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            ></button>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchGo}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            검색
          </button>
        </form>
      </div>
    </div>
  );
};

const SearchModal = ({ searchOnClick, searchOffClick }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <SearchBackdrop
          searchOnClick={searchOnClick}
          searchOffClick={searchOffClick}
        />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <SearchContent
          searchOnClick={searchOnClick}
          searchOffClick={searchOffClick}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default SearchModal;
