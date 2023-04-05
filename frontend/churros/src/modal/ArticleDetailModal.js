import ReactDOM from "react-dom";
import { Fragment } from "react";
import { api } from "../axios-instance/api";
import { useState } from "react";

const ArticleDetailBackdrop = ({ hideDetail }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-20"
      onClick={hideDetail}
    ></div>
  );
};

const ArticleDetailContent = ({ url, hideDetail }) => {
  const [htmlObject, setHtmlObject] = useState();

  const regex = /(?<=article\/)(.*?)(?=\?)/;
  const articleLocation = url.match(regex);

  console.log(articleLocation);
  
  try {
    const response = await api.get("/news/call", null, {
      headers: {
        Accept: "application/json",
      },
      params: {
        url: articleLocation[1],
      },
    });

    const htmlContent = response.data["url"];

  const modalHolderStyle = {
    position: "fixed",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "90%",
    zIndex: 100,
    overflow: "hidden",
  };
  return (
    <>
      {htmlObject ? (
        <div style={modalHolderStyle}>
          <div className="flex flex-row justify-between bg-white">
            <span>상세 기사 내용</span>
            <div
              className="p-1 text-gray-500 rounded-lg hover:bg-red-500 transition duration-300 hover:text-white transition duration-300"
              onClick={hideDetail}
            >
              <IoClose size={30} />
            </div>
          </div>
          <div className="flex flex-col w-full h-full justify-start bg-white">
            <section className="overflow-y-auto">{htmlObject}</section>
          </div>
        </div>
      </div>
    );
  }
};

const ArticleDetailModal = ({ url, hideDetail }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ArticleDetailBackdrop hideDetail={hideDetail} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ArticleDetailContent url={url} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ArticleDetailModal;
