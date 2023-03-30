import ReactDOM from "react-dom";
import { Fragment } from "react";
import { useRecoilValue } from "recoil";
import api from "../axios-instance/api";

const ArticleDetailBackdrop = () => {};

const ArticleDetailContent = async ({ url, articleId }) => {
  const [htmlObject, setHtmlObject] = useState();

  const regex = "/article/(.*?)?";
  const articleLocation = url.match(regex);

  console.log(articleLocation);
  try {
    const response = await api.get(`/news/call`, {
      headers: {
        Accept: "application/json",
      },
      params: {
        url: articleLocation,
      },
    });

    const htmlContent = response.data["url"];
    console.log(htmlContent?.slice(0, 20));

    htmlContent.replace(/data-src=/g, "src=");
    setHtmlObject(
      <div
        dangerouslySetInnerHTML={{
          __html: htmlContent?.replace(/data-src=/g, "src="),
        }}
      />
    );
  } catch (error) {
    console.log(error);
  } finally {
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
        <div className="flex flex-col w-full h-full justify-start bg-white">
          <section className="overflow-y-auto">{htmlObject}</section>
          <footer>footer</footer>
        </div>
      </div>
    );
  }
};

const ArticleDetailModal = ({ url }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <ArticleDetailBackdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ArticleDetailContent />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ArticleDetailModal;
