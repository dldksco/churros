import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { api } from "../axios-instance/api";

const ScrapDialogueBackdrop = ({ onClose }) => {
  return <div className="fixed top-0 left-0 w-full h-screen z-20 bg-black opacity-75" onClick={onClose}/>;
};

const ScrapListItem = ({
  articleId,
  folderIdx,
  folderName,
  alreadyScrapped,
}) => {return <div></div>};

const ScrapList = ({ articleId, items }) => {
  return (
    <div>
      {items.map(({ articleId, folderIdx, folderTitle, alreadyScrapped }) => {
        return (
          <ScrapListItem
            articleId={articleId}
            folderIdx={folderIdx}
            folderTitle={folderTitle}
            alreadyScrapped={alreadyScrapped}
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
            alreadyScrapped: articles?.includes(articleId),
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
    // fetchData();
  }, []);
  return (
    <div className="fixed w-80 h-128 p-2 bg-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50">
      ScrapDialogueContent
    </div>
  );
};

const ScrapDialogueModal = ({ target, onClose }) => {

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ScrapDialogueBackdrop onClose={onClose}/>,
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
