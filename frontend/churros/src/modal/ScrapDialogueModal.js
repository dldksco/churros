import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { api } from "../axios-instance/api";

const ScrapDialogueBackdrop = ({ onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75"
      onClick={onClose}
    />
  );
};

const ScrapListItem = ({ articleId, folderIdx, folderName, isScrapped }) => {
  return (
    <div className="flex flex-row w-full h-max my-2">
      {isScrapped ? (
        <IoCheckbox size={25} className="text-blue-800" />
      ) : (
        <IoSquareOutline size={25} />
      )}
      <p
        className="text-base font-bold px-4"
        style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
      >{folderName}</p>
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

const ScrapDialogueContent = ({ articleId, onClose }) => {
  const [loading, setLoading] = useState(true);
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

  // fetch data
  useEffect(() => {
    fetchData();
  }, []);

//   const dummyItems = [
//     {
//       articleId: 1,
//       folderIdx: 2,
//       folderName: "정치",
//       isScrapped: true,
//     },
//     {
//       articleId: 1,
//       folderIdx: 3,
//       folderName: "시사",
//       isScrapped: false,
//     },
//     {
//       articleId: 1,
//       folderIdx: 2,
//       folderName: "IT",
//       isScrapped: true,
//     },
//     {
//       articleId: 1,
//       folderIdx: 2,
//       folderName: "과학",
//       isScrapped: false,
//     },
//     {
//         articleId: 1,
//         folderIdx: 2,
//         folderName: "정치",
//         isScrapped: true,
//       },
//       {
//         articleId: 1,
//         folderIdx: 3,
//         folderName: "시사",
//         isScrapped: false,
//       },
//       {
//         articleId: 1,
//         folderIdx: 2,
//         folderName: "IT",
//         isScrapped: true,
//       },
//       {
//         articleId: 1,
//         folderIdx: 2,
//         folderName: "과학",
//         isScrapped: false,
//       },
//       {
//         articleId: 1,
//         folderIdx: 2,
//         folderName: "과학",
//         isScrapped: false,
//       },
//       {
//         articleId: 1,
//         folderIdx: 2,
//         folderName: "과학",
//         isScrapped: false,
//       },
//   ];

  return (
    <div className="fixed flex flex-col w-80 h-128 p-2 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
      <p className="w-full h-12 p-2">스크랩하기</p>
      <ScrapList items={scrapList}/>
      <div className="w-full h-12 p-2">새 스크랩 폴더</div>
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
