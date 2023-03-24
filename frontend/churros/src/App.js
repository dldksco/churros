import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/" element={<MainPage />}>
          <Route index element={<h1>추천 기사</h1>} />
          <Route path="likes" element={<h1>좋아요한 기사</h1>} />
          <Route path="scraps/:idx" element={<h1>스크랩 폴더</h1>} />
          <Route path="search" element={<h1>검색 페이지</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
