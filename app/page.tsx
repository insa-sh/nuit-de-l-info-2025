import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function pageAccueil() {
  return (
    <div className='flex flex-col gap-6 items-center justify-center p-7 min-h-screen' style={{ backgroundColor: 'var(--color-background-base)' }}>
      <div className='flex flex-col gap-6 items-center w-full'>
        {/* Header */}
        <div className='flex items-center w-full'>
          <div className='flex gap-4 items-center'>
            <div className='bg-[#d9d9d9] w-[61px] h-[61px]' />
            <p className='text-white text-[32px] font-normal' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              NDIR Advisor
            </p>
          </div>
        </div>

        {/* Hero Section */}
        <div className='flex flex-col gap-6 items-center justify-center px-0 py-16 w-full rounded-[64px] overflow-hidden relative'>
          {/* Background gradients */}
          <div className='absolute inset-0 opacity-10 pointer-events-none' 
            style={{
              background: `
                radial-gradient(30.62% 87.19% at 95.05% 36.08%, rgba(237, 0, 130, 0.90) 0%, rgba(0, 0, 0, 0.90) 100%), radial-gradient(79.37% 101.42% at 9.58% 29.04%, rgba(79, 0, 237, 0.90) 0%, rgba(0, 0, 0, 0.10) 100%), radial-gradient(44.37% 144.05% at 86.95% 93.13%, rgba(166, 95, 236, 0.90) 0%, rgba(0, 0, 0, 0.10) 100%), #1D1E26;
              `
            }}
          />
          
          <div className='relative z-10'>
            <Image 
              src="/images/computer.png" 
              alt="Computer" 
              width={555} 
              height={429}
              className='object-cover'
            />
          </div>
          
          <p className='text-white text-[48px] font-normal relative z-10' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
            NDIR Advisor
          </p>
          
          <div className='flex flex-col items-center relative z-10'>
            <p className='text-white text-[32px] font-normal text-center' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              <span>Apprennez à </span>
              <span className='font-bold underline decoration-solid [text-underline-position:from-font]' style={{ color: '#53ac83' }}>
                responsabiliser
              </span>
              <span> votre parc informatique avec la NDIR !</span>
            </p>
          </div>
          
          <div className='flex gap-6 items-start justify-center relative z-10'>

            <Link href="/game" className='flex items-center justify-center px-8 py-4 rounded-[20px] overflow-hidden' style={{ backgroundColor: 'var(--color-icon-brand)', textDecoration: 'none' }}>
              <p className='text-white text-[24px] font-normal text-center' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              Deviens acteur de ton infrastructure !
              </p>
            </Link>
            
            <Link href="/leaderboard" className='border-2 border-solid flex gap-2.5 items-center justify-center px-8 py-4 rounded-[20px] overflow-hidden' style={{ backgroundColor: 'var(--color-brand-weak)', borderColor: 'var(--color-stroke-selected)', textDecoration: 'none' }}>
              <Image 
              src="/images/trophy.svg" 
              alt="Trophy" 
              width={24} 
              height={24}
              />
              <p className='text-[24px] font-normal text-center' style={{ fontFamily: 'var(--font-pixelify-sans)', color: 'var(--color-brand-1000)' }}>
              Leaderboard
              </p>
            </Link>
          </div>
        </div>

        {/* NDIR Section */}
        <div className='flex gap-16 items-center justify-center overflow-hidden p-16 rounded-[64px] w-full' style={{
              background: `
                radial-gradient(94.61% 96.7% at 20.16% 47.05%, rgba(79, 0, 237, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%);`
            }}>
          <div className='relative'>
            <Image 
              src="/images/ndir-logo.png" 
              alt="NDIR Logo" 
              width={373} 
              height={154}
              className='object-cover'
            />
          </div>
          
          <div className='flex flex-col gap-[79px] items-center flex-1' >
            <p className='text-white text-[48px] font-normal w-full whitespace-pre-wrap' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              NDIR - Inclusif, Responsable & Durable
            </p>
            
            <div className='text-white text-[24px] leading-8 w-full whitespace-pre-wrap' style={{ fontFamily: 'var(--font-anonymous-pro)' }}>
              <p className='mb-0'>
                <span>Grâce la </span>
                <span className='font-bold'>démarche NDIR</span>
                <span>, transformez vos systèmes et infrastructures informatiques poru les rendre autonome, responsables et indépendentes. Nous vous guidons pas-à-pas pour transformer votre parc informatique en un outil inclusif, durable et responsable. </span>
              </p>
              <p className='mb-0'>&nbsp;</p>
              <p className='leading-8'>
                <span>Grâce à NIRD, vous pouvez reconditionner du matériel, adopter des logiciels libres et alléger les coûts, tout en renforçant </span>
                <span className='font-bold'>l'autonomie numérique</span>
                <span> et </span>
                <span className='font-bold'>l'éthique</span>
                <span> de vos pratiques. </span>
              </p>
            </div>
            
            <Link href="https://nird.forge.apps.education.fr/" target="_blank" className='flex items-center justify-center px-8 py-4 rounded-[20px] overflow-hidden' style={{ backgroundColor: 'var(--color-icon-brand)', textDecoration: 'none' }}>
              <p className='text-white text-[24px] font-normal text-center' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              Voir le site de la NDIR →
              </p>
            </Link>
          </div>
        </div>

        {/* Le Clicker NDIR Section */}
        <div className='flex gap-16 items-center justify-center overflow-hidden p-16 rounded-[64px] w-full relative'>
          {/* Background gradients */}
          <div className='absolute inset-0 pointer-events-none' 
            style={{
              background: `
              radial-gradient(30.62% 87.19% at 95.05% 36.08%, rgba(237, 0, 130, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), radial-gradient(28.08% 20.03% at 10.44% 50.05%, rgba(79, 0, 237, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%);              `
            }}
          />
          
          <div className='relative z-10'>
            <Image 
              src="/images/cursor.png" 
              alt="Cursor" 
              width={320} 
              height={320}
            />
          </div>
          
          <div className='flex flex-col gap-[79px] items-center flex-1 relative z-10'>
            <p className='text-white text-[48px] font-normal w-full whitespace-pre-wrap' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              Le Clicker NDIR
            </p>
            
            <div className='text-white text-[24px] leading-8 w-full whitespace-pre-wrap' style={{ fontFamily: 'var(--font-anonymous-pro)' }}>
              <p className='mb-0'>Connaissez-vous le jeu Cookie Clicker ? Un jeu simple et efficace. A chaque fois que le joueur clique sur le cookie, il gagne de l'argent. Avec cet argent, il peut améliorer ses clics, installer des clickers automatiques, ou des fermes à clic. Le but est d'obtenir toujours plus de clics.</p>
              <p className='mb-0'>&nbsp;</p>
              <p className='mb-0'>
                <span>A travers la démarche NDIR, nous souhaitons mettre en place </span>
                <span className='font-bold'>des infrastructures toujours plus éthiques</span>
                <span>, toujours plus responsables et souveraines. Le principe du jeu est le suivant : Plus vous touchez à votre infra, plus vous gagnerez de l'argent, et plus vous pourrez l'améliorer.</span>
              </p>
              <p className='mb-0'>&nbsp;</p>
              <p className='mb-0'>L'objectif ? Tendre vers un modèle complètement indépendant, open source et éthique ! </p>
              <p className='mb-0'>&nbsp;</p>
              <p>Vous recevrez des conseils et un recap des actions que vous pouvez mettre en place pour améliorer vos parcs informatiques.</p>
            </div>
            
            <Link href="/game" className='flex items-center justify-center px-8 py-4 rounded-[20px] overflow-hidden' style={{ backgroundColor: 'var(--color-icon-brand)', textDecoration: 'none' }}>
              <p className='text-white text-[24px] font-normal text-center' style={{ fontFamily: 'var(--font-pixelify-sans)' }}>
              Jouer →
              </p>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <p className='font-bold text-white text-[14px]' style={{ fontFamily: 'var(--font-anonymous-pro)' }}>
        Crédits
      </p>
    </div>
  )
}
