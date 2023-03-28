import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Main from "./pages/Main"
import LikesPage from "./pages/LikesPage";
import KakaoRedirectHandler from "./pages/KakaoRedirectHandler";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Main />} />
          <Route path="likes" element={<LikesPage />} />
          <Route path="scraps/:idx" element={<h1>스크랩 폴더</h1>} />
          <Route path="search" element={<h1>검색 페이지</h1>} />
        </Route>
        <Route path="/kakao/handler" element={<KakaoRedirectHandler />}/>
      </Routes>
    </Router>
  );
}

export default App;
