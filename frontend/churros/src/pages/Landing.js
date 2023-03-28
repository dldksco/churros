import logo from "../churros-logo.svg";
import CardCarousel from "../components/CardCarousel";
import ImageButton from "../components/ImageButton";
// import api from "../axios-instance/api";

// import NaverLoginButton from "../components/NaverLoginButton";

const Landing = () => {
  const images = [
    {
      id: 1,
      src: "/images/sample-img-00.jpeg",
      alt: "image",
    },
    {
      id: 2,
      src: "/images/churros.jpg",
      alt: "image",
    },
    {
      id: 3,
      src: "/images/newspaper.jpeg",
      alt: "image",
    },
  ];

  const handleKakaoLogin = async (event) => {
    event.preventDefault();

    window.location.href = "https://www.churros.site/api/auth/kakao";
    // try {
    //   await api.get("/auth/kakao");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center pt-5 pb-10 px-10 bg-stone-50">
      <div className="w-2/3 h-full m-3 flex flex-col justify-center items-center">
        <CardCarousel
          images={images}
          className={"w-full h-3/4 flex flex-col justify-center items-center"}
        />
      </div>
      <div className="w-1/5 h-full flex flex-col justify-center m-3 p-1">
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
            src={"/images/kakao_login_medium_narrow.png"}
            alt={"카카오 로그인 버튼"}
            onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;