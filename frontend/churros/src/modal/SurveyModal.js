import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import { Fragment } from "react";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { accessTokenState } from "../store/auth";
import { userInfoState } from "../store/user";
import SampleArticle from "../components/article/SampleArticle";
import { test } from "../axios-instance/api";
import { IoCheckbox } from "react-icons/io5";
import { api } from "../axios-instance/api";

const SurveyBackdrop = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75" />
  );
};

const SelectionHighlighter = () => {
  return (
    <Fragment>
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-black opacity-50 rounded-lg" />
      <IoCheckbox
        size={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-500 z-30"
      />
    </Fragment>
  );
};

const SurveySubmitButton = ({ onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`w-32 h-16 text-xl rounded-2xl ${
        !isActive
          ? "text-gray-500 bg-stone-300 pointer-events-none"
          : "text-white bg-orange-400"
      }`}
      style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
    >
      완료
    </button>
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

  const fetchDummySampleArticles = () => {
    const articles = [169937, 169936, 169935, 169934, 169933, 169932];
    setSampleArticles(
      articles.map((articleId, index) => ({
        index: index,
        articleId: articleId,
        selected: false,
      }))
    );
  };

  const fetchSampleArticles = async () => {
    try {
      const res = await api.get("/news/sample");
      const { result, articleIds } = res.data;

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
    } catch ({ name, code, message, response }) {
      console.log(`[error] ${name} code: ${code} message: ${message}`);

      if (response) {
        const {status} = response;
        switch (status) {
          case 401:
            resetAccessToken();
            break;
          default:
            break;
        }
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    // send user interests info to server
    const selectedArticles = sampleArticles.filter(({ selected }) => selected);
    selectedArticles.forEach(async (item) => {
      try {
        const response = await api.put("/news/read", {
          articleId: item.articleId,
        });
        const { result } = response.data;
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    });

    setIsOpen(false);

    // 모달 transition이 종료된 후 userInfo를 갱신하여 Survey 모달을 언마운트한다
    setTimeout(() => {
      setUserInfo((prev) => ({
        ...prev,
        activate: true,
      }));
    }, 600);
  };

  // 컴포넌트 마운트 시 isOpen 상태를 변경시킨다
  // 모달 창 Slide Up transition 실행된다
  useEffect(() => {
    fetchDummySampleArticles();
    // fetchSampleArticles();
    setIsOpen(true);
  }, []);

  // 샘플 기사가 변경될 때마다 SubmitButtonActive 상태가 갱신된다
  useEffect(() => {
    const count = sampleArticles.filter(({ selected }) => selected).length;

    if (count >= 2) setSubmitButtonActive(true);
    else setSubmitButtonActive(false);
  }, [sampleArticles]);

  const updateSelectedSampleArticles = (idx) => {
    setSampleArticles((prev) => {
      return prev.map((item) => {
        if (item.index !== idx) return item;
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
      <div className="flex flex-col w-full h-full justify-start bg-white rounded-2xl">
        <header className="inline-block w-full h-fit p-4">
          <p
            className="text-4xl p-4"
            style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
          >
            관심있는 기사를 모두 선택해주세요
          </p>
        </header>
        <section className="flex-1 grid grid-cols-3 gap-4 px-8 py-4">
          {sampleArticles.map(({ index, articleId, selected }) => (
            <div
              key={index}
              onClick={() => updateSelectedSampleArticles(index)}
              className="relative"
            >
              {selected && <SelectionHighlighter />}
              <SampleArticle articleId={articleId} />
            </div>
          ))}
        </section>
        <footer className="flex flex-row justify-end items-center p-4">
          <SurveySubmitButton
            onClick={handleSubmit}
            isActive={submitButtonActive}
          />
        </footer>
      </div>
    </div>
  );
};

const SurveyModal = () => {
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
