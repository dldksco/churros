import logo from "../churros-logo.svg";
import ImageCarousel from "../components/ImageCarousel";
import ImageButton from "../components/ImageButton";

const LandingPage = () => {
  const images = [
    {
      id: 1,
      src: "/images/sample-img-00.jpeg",
      alt: "image",
    },
    {
      id: 2,
      src: "/images/btn-naver-login.png",
      alt: "image",
    },
    {
      id: 3,
      src: "/images/btn-naver-login.png",
      alt: "image",
    },
  ];

  const loginHandler = () => {
    console.log("login button clicked");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center pt-5 px-10 pt-5 pb-10">
      <div className="w-3/4 h-full m-3 flex flex-col justify-center items-center">
        {/* <ImageCarousel images={images} className="h-5/6"/> */}
        <ImageCarousel
          images={images}
          className={"w-full h-3/4 flex flex-col justify-center items-center"}
        />
      </div>
      <div className="h-full flex flex-col justify-center m-3 p-1">
        <div className="p-1">
          <img src={logo} alt="logo" />
        </div>
        <div className="mb-3 p-1">
          <p className="text-4xl font-bold text-right">개인 관심사 기반</p>
          <p className="text-4xl font-bold text-right">추천 뉴스</p>
        </div>
        <div className="mb-6 p-1">
          <p className="text-7xl font-bold text-right">츄러스</p>
        </div>
        <div className="flex justify-center p-1">
          <ImageButton
            className="w-40"
            onClick={loginHandler}
            src="/images/btn-naver-login.png"
            alt="btn-naver-login"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
