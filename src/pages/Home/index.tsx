import React from "react";
import Banner from "./components/Banner";
import Leaderboard from "./components/Leaderboard";
import Personalized from "./components/Personalized";
import PersonalizedNewSong from "./components/PersonalizedNewSong";
import "./index.scss";

function Home() {
  return (
    <div className="home--wrapper">
      <Banner />
      <Personalized />
      <PersonalizedNewSong />
      <Leaderboard />
    </div>
  );
}

export default Home;
