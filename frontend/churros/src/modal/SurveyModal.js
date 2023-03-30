import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userInfoState } from "../store/user";

const SurveyBackdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75" />
  );
};

const SurveyContent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [submitButtonActive, setSubmitButtonActive] = useState(false);
  const [selectCount, setSelectCount] = useState(0);

  const setUserInfo = useSetRecoilState(userInfoState);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // axios request shoud be send

    setIsOpen(false);

    setTimeout(() => {
      setUserInfo((prev) => ({
        ...prev,
        isUserInterestsInitialized: true,
      }));
    }, 600);
  };

  useEffect(() => {
    setIsOpen(true);
  }, [])

  return (
    <div
      className={`fixed top-[10%] left-[25%] w-1/2 h-4/5 z-50 ${
        isOpen ? "" : "translate-y-[1080px]"
      } transition delay-300 ease-in-out`}
    >
      <div className="flex flex-col w-full h-full justify-start bg-white">
        <header className="inline-block w-full h-fit mt-4 mb-2 p-4">
          <p
            className="left-10 text-5xl p-1"
            style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
          >
            관심있는 기사를 모두 선택해주세요
          </p>
        </header>
        <section className="flex-1 grid grid-cols-3 gap-4 mt-2 mb-2 px-8 py-4">
          <div key="1">
            Sample Article
          </div>
          <div key="2">
            Sample Article
          </div>
          <div key="3">
            Sample Article
          </div>
          <div key="4">
            Sample Article
          </div>
          <div key="5">
            Sample Article
          </div>
          <div key="6">
            Sample Article
          </div>
        </section>
        <footer className="flex flex-row justify-end items-center mt-2 p-4">
          <button onClick={handleSubmit} className="w-32 h-16">
            완료
          </button>
        </footer>
      </div>
    </div>
  );
};

const SurveyModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <SurveyBackdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <SurveyContent />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default SurveyModal;
