import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { useSetRecoilState } from "recoil";
import { userInfoState } from "../store/user";

const SearchBackdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75" />
  );
};

const SearchContent = () => {
  const [searchWord, setSearchWord] = useState("");


  return (
    <div className="fixed left-[10%] w-4/5 h-4/5 z-50 translate-y-[1080px] transition transform delay-300 ease-in-out">
          <p
            className="left-10 text-5xl p-1"
            style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
          >
            검색하세요
          </p>
        <input type="text" value="searchWord"></input>
    </div>
  );
};

const SearchModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <SearchBackdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <SearchContent />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default SearchModal;
