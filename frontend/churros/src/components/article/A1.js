import CloseButton from "../common/CloseButton";
import HoverBox from "../common/HoverBox";

const A1 = ({ articleId, url, imgUrl, title, description, onClose }) => {
  console.log(articleId);

    const handleArticleDetail = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

  return (
    <div className="flex flex-col w-full h-full justify-start" onClick={handleArticleDetail}>
      {/* 기사 썸네일 */}
      <div className="relative w-full h-3/4 overflow-hidden">
        <img
          className="absolute w-full h-auto left-1/2 transform -translate-x-1/2"
          src={imgUrl}
          alt="alt"
        />
        <CloseButton />
      </div>
      <div className="relative flex flex-col flex-1 justify-start items-center bg-stone-100">
        {/* 기사 타이틀 및 요약 */}
        <div className="flex flex-col w-4/5 h-full justify-center">
          <p
            className="text-5xl text-bold text-center p-1 truncate ..."
            style={{ fontFamily: "Noto Sans KR", fontWeight: 500 }}
          >
            {title}
          </p>
          <p
            className="text-3xl text-bold text-center p-1 truncate ..."
            style={{ fontFamily: "Noto Sans KR", fontWeight: 400 }}
          >
            {description}
          </p>
        </div>
        <HoverBox />
      </div>
    </div>
  );
};

export default A1;
