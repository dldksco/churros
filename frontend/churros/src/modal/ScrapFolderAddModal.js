import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { IoAddOutline } from "react-icons/io5";
import CloseButton from "../components/common/CloseButton";
import { api } from "../axios-instance/api";
import { useSetRecoilState } from "recoil";
import { scrapFolderListState } from "../store/sidebar-global-state";

const ScrapFolderAddFormContent = ({ onClose }) => {
  const setScrapFolderList = useSetRecoilState(scrapFolderListState);
  const [folderName, setFolderName] = useState("");
  const [formValid, setFormValid] = useState(false);

  const handleInputChange = (e) => {
    setFolderName(e.target.value);
  };

  const createNewScrapFolder = async (folderName) => {
    try {
      const r = await api.post("/scrap/book", {
        folderName: folderName,
      });
      console.log(r);
      const {folderIdx} = r.data;
      setScrapFolderList(prev => [
        ...prev,
        {
            folderIdx: folderIdx,
            folderName: folderName
        }
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setFolderName("");
    }
  };

  useEffect(() => {
    const folderNameLength = folderName.trim().length;
    if (folderNameLength === 0 || folderNameLength > 20) setFormValid(false);
    else setFormValid(true);
  }, [folderName]);

  return (
    <div
      className="absolute flex flex-row justify-between items-center w-64 h-16 p-1 z-60 bg-stone-200 rounded-lg"
      style={{ left: "100%", top: 0 }}
    >
      <CloseButton
        className="absolute top-0 left-0 -translate-x-1/3 -translate-y-1/3"
        onClose={() => {
          setFolderName("");
          onClose();
        }}
      />
      <div className="p-1 mr-1 flex-1 h-5/6">
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full h-full border border-slate-300 rounded-md pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="새 스크랩 폴더 제목..."
          type="text"
          onChange={handleInputChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div
        className={`mr-1 p-1 rounded-lg ${
          formValid
            ? "bg-stone-300 hover:bg-stone-500"
            : "bg-stone-200 pointer-events-none"
        }`}
        onClick={() => createNewScrapFolder(folderName)}
      >
        <IoAddOutline
          size={25}
          className={`${formValid ? "text-black" : "text-gray-100"}`}
        />
      </div>
    </div>
  );
};

const ScrapFolderAddModal = ({ onClose }) => {
  return <ScrapFolderAddFormContent onClose={onClose} />;
};

export default ScrapFolderAddModal;
