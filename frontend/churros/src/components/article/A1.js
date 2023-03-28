const A1 = ({ articleId, url, imgUrl, title, description, onClose }) => {
  console.log(articleId);

  return (
    <a className="flex flex-col w-full h-full justify-start" href={url}>
      <div className="relative w-full h-2/3 overflow-hidden">
        <img
          className="absolute w-full h-auto left-1/2 transform -translate-x-1/2"
          src={imgUrl}
          alt="alt"
        />
      </div>
      <div className="flex flex-col flex-1 justify-start items-center bg-stone-100">
        <div className="flex flex-col w-4/5 h-full justify-center">
          <p className="text-5xl text-bold text-center m-2 truncate ...">
            {title}
          </p>
          <p className="text-3xl text-bold text-center m-2 truncate ...">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default A1;
