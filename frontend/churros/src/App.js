import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Main from "./pages/Main"
import Likes from "./pages/Likes";
import Search from "./pages/Search";
import Scraps from "./pages/Scraps";
import KakaoRedirectHandler from "./pages/KakaoRedirectHandler";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Home />}>
          <Route index element={<Main />} />
          <Route path="likes" element={<Likes />} />
          <Route path="scraps/:idx" element={<Scraps />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="/kakao/handler" element={<KakaoRedirectHandler />}/>
      </Routes>
    </Router>
  );
}

export default App;
