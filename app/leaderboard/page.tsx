import React from "react";
import Link from "next/link";
import LeaderboardRow from "@/components/LeaderboardRow";
import Header from "@/components/Header";
import Button from "@/components/Button";

export default async function leaderboard() {
  const leaderboard = await fetch("http://localhost:3001/scoreboard");
  const leaderboardJson = await leaderboard.json();

  // Trier par score décroissant et ajouter les rangs
  const sortedLeaderboard = leaderboardJson
    .sort((a: any, b: any) => b.currency - a.currency)
    .map((entry: any, index: number) => ({
      rank: index + 1,
      username: entry.username,
      date: new Date(entry.created_at).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      score: entry.currency,
    }));

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

      <Button
        href="/game"
        variant="primary"
        className="text-[16px] sm:text-[20px] md:text-[24px] w-full sm:w-auto"
      >
        Retour au jeu
      </Button>
      

      {/* Liste du leaderboard */}
      <div className="flex flex-col gap-4 w-full max-w-[1200px]">
        {sortedLeaderboard.length > 0 ? (
          sortedLeaderboard.map((entry: any) => (
            <LeaderboardRow
              key={entry.rank}
              rank={entry.rank}
              username={entry.username}
              date={entry.date}
              score={entry.score}
            />
          ))
        ) : (
          <div className="text-white text-center text-2xl font-pixelify mt-8">
            Pas encore de joueurs dans le leaderboard !
          </div>
        )}
      </div>
    </div>
  );
}
