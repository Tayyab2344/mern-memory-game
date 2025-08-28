import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import GamePage from "../../pages/GamePage.";
import LeaderboardPage from "../../pages/LeaderPage";
import MyGamesPage from "../../pages/Mygamepage";
import HomePage from "../../pages/HomePage";
import Header from "../header/Navbar";

const Layout = () => {
  const location = useLocation();
  const hideHeader = location.pathname === "/";

  return (
    <>
      {!hideHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/my-games" element={<MyGamesPage />} />
        </Routes>
      </main>
    </>
  );
};

export default Layout;
