import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { accessTokenState } from "../store/auth";
import { userInfoState } from "../store/user";
import SampleArticle from "../components/article/SampleArticle";

const SurveyBackdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75" />
  );
};

const SurveyContent = () => {
  // Recoil state
  const setUserInfo = useSetRecoilState(userInfoState);
  const resetAccessToken = useResetRecoilState(accessTokenState);

  // state
  const [isOpen, setIsOpen] = useState(false);
  const [sampleArticles, setSampleArticles] = useState([]);
  const [submitButtonActive, setSubmitButtonActive] = useState(false);

  const fetchSampleArticles = async () => {
    try {
      const response = await test.get("/news/sample");
      const { result, articleIds } = response.data;

      console.log(result);
      console.log(articleIds);

      setSampleArticles(
        articleIds.map((id, idx) => ({
          index: idx,
          articleId: id,
          selected: false,
        }))
      );
      console.log(sampleArticles);
    } catch ({ response, message }) {
      
      const { status, statusText } = response;

      console.log(
        `ErrCode: ${status}\nStatusText: ${statusText}\nMessage: ${message}`
      );

      switch (status) {
        case 401:
          resetAccessToken();
          break;
        default:
          break;
      }
    }
  };
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

  // 컴포넌트 마운트 시 isOpen 상태를 변경시킨다
  // 모달 창 Slide Up transition 실행된다
  useEffect(() => {
    fetchSampleArticles();
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const count = sampleArticles.filter(({ selected }) => selected).length;

    if (count > 0) setSubmitButtonActive(true);
    else setSubmitButtonActive(false);
  }, [sampleArticles]);

  const updateSelectedSampleArticles = (idx) => {
    setSampleArticles((prev) => {
      return prev.map((item) => {
        if (item.idx !== idx) return item;
        return { ...item, selected: !item.selected };
      });
    });
  };
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
          {sampleArticles.map(({ idx, articleId, selected }) => (
            <div
              key={idx}
              onClick={() => updateSelectedSampleArticles(idx)}
              className={`${selected ? "bg-stone-500" : "bg-white"}`}
            >
              <SampleArticle articleId={articleId} />
            </div>
          ))}
        </section>
        <footer className="flex flex-row justify-end items-center mt-2 p-4">
          <button
            onClick={handleSubmit}
            className={`w-32 h-16 text-xl rounded-2xl ${
              submitButtonActive
                ? "text-gray-500 bg-stone-300 pointer-events-none"
                : "text-white bg-orange-400"
            }`}
            style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
          >
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
