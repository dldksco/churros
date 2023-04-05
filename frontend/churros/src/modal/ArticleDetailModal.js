import ReactDOM from "react-dom";
import { Fragment } from "react";
import { api } from "../axios-instance/api";
import { useState, useEffect } from "react";

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
  useEffect(() => {
    fetchData(articleLocation[0]);
  }, [articleLocation]);
  const fetchData = async (url) => {
    try {
      const response = await api.get(`/news/call`, {
        params: {
          url: url,
        },
      });

      const htmlContent = response.data["html"];

      htmlContent.replace(/data-src=/g, "src=");
      console.log(htmlContent);
      setHtmlObject(
        <div
          dangerouslySetInnerHTML={{
            __html: htmlContent.replace(/data-src=/g, "src="),
          }}
        />
      );
    } catch (error) {
      console.log(error);
    }
  };

  const modalHolderStyle = {
    position: "fixed",
    top: "10vh",
    left: "10%",
    width: "80%",
    height: "90vh",
    zIndex: 100,
    overflow: "hidden",
  };
  return (
    <div style={modalHolderStyle}>
      <div className="flex flex-row w-full justify-between">
        <span>header</span>
        <div onClick={hideDetail}>닫기</div>
      </div>
      <div className="flex flex-col w-full h-full justify-start bg-white">
        <section className="overflow-y-auto">{htmlObject}</section>
      </div>
      <footer>footer</footer>
    </div>
  );
};

const ArticleDetailModal = ({ url, hideDetail }) => {
  console.log(url);
  console.log(typeof url);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ArticleDetailBackdrop hideDetail={hideDetail} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ArticleDetailContent url={url} hideDetail={hideDetail} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ArticleDetailModal;
