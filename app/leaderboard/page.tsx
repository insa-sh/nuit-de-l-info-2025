import React from 'react'
import Link from 'next/link'
import LeaderboardRow from '@/components/LeaderboardRow'

export default function leaderboard() {
  // Données du leaderboard (à remplacer par des vraies données de l'API plus tard)
  const leaderboardData = [
    { rank: 1, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 2, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 3, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 4, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 5, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 6, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 7, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
    { rank: 8, username: 'BAPTISTE', date: '08/12/2023 12:30', score: 3000 },
  ]

  return (
    <div 
      className='flex flex-col gap-6 items-center justify-start p-7 min-h-screen'
      style={{ backgroundColor: 'var(--color-background-base)' }}
    >
      {/* Header */}
      <div className='flex items-center justify-between w-full max-w-[1200px]'>
        <Link href="/" className='flex gap-4 items-center' style={{ textDecoration: 'none' }}>
          <div className='bg-[#d9d9d9] w-[61px] h-[61px]' />
          <p 
            className='text-white text-[24px] md:text-[32px] font-normal'
            style={{ fontFamily: 'var(--font-pixelify-sans)' }}
          >
            NDIR Advisor
          </p>
        </Link>
      </div>

      {/* Titre Leaderboard */}
      <h1 
        className='text-white text-[40px] md:text-[64px] font-normal mt-8 mb-4'
        style={{ fontFamily: 'var(--font-pixelify-sans)' }}
      >
        Leaderboard
      </h1>

      {/* Liste du leaderboard */}
      <div className='flex flex-col gap-4 w-full max-w-[1200px]'>
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

      {/* Footer */}
      <p 
        className='font-bold text-white text-[14px] mt-8'
        style={{ fontFamily: 'var(--font-anonymous-pro)' }}
      >
        Crédits
      </p>
    </div>
  )
}
