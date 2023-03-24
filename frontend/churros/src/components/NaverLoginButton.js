import { useEffect } from "react";

const NaverLoginButton = () => {
  const { naver } = window;
  const NAVER_CLIENT_ID = "AYc5QWixliEFjnGd6Llt"; // process.env.NAVER_CLIENT_ID node.js 실행할 떄 설정하거나
  const NAVER_CALLBACK_URL = "https://www.churros.site"; // process.env.NAVER_CALLBACK_URL

  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      isPopup: true,
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });

    naverLogin.init();

    naverLogin.getLoginStatus(async function (status) {
      if (status) {
        console.log("User id: " + naverLogin.user.getEmail());
        console.log("User name: " + naverLogin.user.getName());
        console.log("Access token: " + naverLogin.accessToken);
      } else {
        console.log("Access token is not valid");
      }
    });
  };

  useEffect(() => {
    initializeNaverLogin();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLoginButton;
