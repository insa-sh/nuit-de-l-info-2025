import React from "react";
import Image from "next/image";

interface LeaderboardRowProps {
  rank: number;
  username: string;
  date: string;
  score: number;
}

export default function LeaderboardRow({
  rank,
  username,
  date,
  score,
}: LeaderboardRowProps) {
  // Définir l'icône selon le rang
  const getRankIcon = () => {
    if (rank === 1) return "🏆";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const icon = getRankIcon();

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-background-raised rounded-[20px] w-full">
      {/* Icône de rang (pour top 3) */}
      <div className="flex items-center gap-6 flex-1">
        {icon && (
          <span className="text-[32px] w-[40px] text-center">{icon}</span>
        )}
        {!icon && <div className="w-[40px]" />}

        {/* Username */}
        <p className="text-white text-[20px] md:text-[24px] font-normal font-pixelify">
          {username}
        </p>
      </div>

      {/* Date */}
      <p className="text-white text-[16px] md:text-[20px] font-normal flex-1 text-center hidden md:block font-pixelify">
        {date}
      </p>

      {/* Score avec emoji */}
      <div className="flex items-center gap-3 justify-end">
        <Image src="/images/coin.png" alt="Coin" width={24} height={24} />
        <p className=" text-[20px] md:text-[24px] font-normal font-pixelify text-fill-yellow">
          {score}
        </p>
      </div>
    </div>
  );
}
