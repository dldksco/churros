import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { IoCheckbox, IoSquareOutline, IoAddOutline } from "react-icons/io5";
import { api } from "../axios-instance/api";

const dummyItems = [
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "정치",
    isScrapped: true,
  },
  {
    articleId: 1,
    folderIdx: 3,
    folderName: "시사",
    isScrapped: false,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "IT",
    isScrapped: true,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "과학",
    isScrapped: false,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "정치",
    isScrapped: true,
  },
  {
    articleId: 1,
    folderIdx: 3,
    folderName: "시사",
    isScrapped: false,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "IT",
    isScrapped: true,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "과학",
    isScrapped: false,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "과학",
    isScrapped: false,
  },
  {
    articleId: 1,
    folderIdx: 2,
    folderName: "과학",
    isScrapped: false,
  },
];

const ScrapDialogueBackdrop = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75"
      onClick={onClose}
    />
  );
};

const ScrapListItem = ({ articleId, folderIdx, folderName, isScrapped }) => {
  const [scrapped, setScrapped] = useState(isScrapped);

  const toggleCheckbox = (e) => {
    e.preventDefault();
    setScrapped((prev) => !prev);
  };

  useEffect(() => {}, [scrapped]);

  return (
    <div className="flex flex-row w-full h-max my-2 px-4">
      <div onClick={toggleCheckbox}>
        {scrapped ? (
          <IoCheckbox size={25} className="text-blue-800" />
        ) : (
          <IoSquareOutline size={25} />
        )}
      </div>
      <p
        className="text-base font-bold px-4"
        style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
      >
        {folderName}
      </p>
    </div>
  );
};

const ScrapList = ({ items }) => {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      {items.map(({ articleId, folderIdx, folderName, isScrapped }) => {
        return (
          <ScrapListItem
            articleId={articleId}
            folderIdx={folderIdx}
            folderName={folderName}
            isScrapped={isScrapped}
          />
        );
      })}
    </div>
  );
};

const ScrapFolderAddForm = ({ onMenuClose }) => {
  return (
    <div
      className="absolute top-0 left-0 flex flex-row justify-between items-center w-full h-full p-2 z-60 bg-stone-200 rounded-lg"
      onClick={onMenuClose}
    >
      <div className="p-1 mr-2 flex-1 h-5/6">
      <input className="w-full h-full rounded-lg" onClick={(e) => e.stopPropagation()}/>
      </div>
      <div className="p-1 bg-stone-300 rounded-lg hover:bg-stone-500">
      <IoAddOutline size={25}/>
      </div>
    </div>
  );
};

const ScrapDialogueContent = ({ articleId, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setFormOpen] = useState(false);
  const [scrapList, setScrapList] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const r = await api.get("/scrap");
      const { folder } = r.data;

      setScrapList(
        folder.map(async ({ folderIdx, folderName }) => {
          const s = await api.get(`/scrap/${folderIdx}`);
          const { articles } = s.data;

          return {
            articleId: articleId,
            folderIdx: folderIdx,
            folderName: folderName,
            isScrapped: articles?.includes(articleId),
          };
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openForm = (e) => {
    e.preventDefault();
    setFormOpen(true);
  }

  const closeForm = (e) => {
    e.preventDefault();
    setFormOpen(false);
  }

  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="fixed flex flex-col w-72 h-auto rounded-lg p-2 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
      <div className="flex w-full h-10 justify-start items-center mb-2 px-2">
        <p
          className="text-xl"
          style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
        >
          스크랩하기
        </p>
      </div>
      <ScrapList items={dummyItems} />
      <div className="relative w-full h-14 p-2 mt-2">
        <div
          className="flex flex-row justify-start items-center w-full h-full"
          onClick={openForm}
        >
          <IoAddOutline size={25} />
          <p
            className="mx-2"
            style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
          >
            새 스크랩 폴더 만들기
          </p>
        </div>
        {isFormOpen && (
          <ScrapFolderAddForm
            onMenuClose={closeForm}
          />
        )}
      </div>
    </div>
  );
};

const ScrapDialogueModal = ({ target, onClose }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ScrapDialogueBackdrop onClose={onClose} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ScrapDialogueContent articleId={target} onClose={onClose} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ScrapDialogueModal;
