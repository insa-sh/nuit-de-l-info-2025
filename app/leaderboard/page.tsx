import React from "react";
import Link from "next/link";
import LeaderboardRow from "@/components/LeaderboardRow";
import Header from "@/components/Header";

export default async function leaderboard() {
  // Données du leaderboard (à remplacer par des vraies données de l'API plus tard)
  const leaderboardData = [
    { rank: 1, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 2, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 3, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 4, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 5, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 6, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 7, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
    { rank: 8, username: "BAPTISTE", date: "08/12/2023 12:30", score: 3000 },
  ];

  const leaderboard = await fetch("http://localhost:3001/scoreboard");
  const leaderboardJson = await leaderboard.json();
  console.log(leaderboardJson);

  return (
    <div className="flex flex-col gap-6 items-center justify-start p-7">
      {/* Header */}
      <div className="flex items-center justify-start w-full">
        <Header />
      </div>

      {/* Titre Leaderboard */}
      <h1 className="text-white text-[40px] md:text-[64px] font-normal mt-8 mb-4 font-pixelify">
        Leaderboard
      </h1>

      {/* Liste du leaderboard */}
      <div className="flex flex-col gap-4 w-full max-w-[1200px]">
        {leaderboardData.map((entry) => (
          <LeaderboardRow
            key={entry.rank}
            rank={entry.rank}
            username={entry.username}
            date={entry.date}
            score={entry.score}
          />
        ))}
      </div>
    </div>
  );
}
