import React from 'react'
import SearchCard from './SearchCard/SearchCard'
import { Button } from '@/components/ui/button'

function Hero() {
  return (
    <div className="w-full min-h-screen overflow-hidden">
    {/* Mobile: background image section with content */}
    <div
      className="md:hidden relative w-full h-[80vh] bg-[url('https://17mm2glo1t.ufs.sh/f/rQix7xjgXapPXoUkQq0E7J8GmMoHs1Ti0jBnyrCcXIkVbqAD')] bg-center bg-cover bg-no-repeat flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-white text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Welcome to Your Hero Section
        </h1>
        <p className="text-sm opacity-90">
          This content is visible on mobile as well.
        </p>
        <SearchCard/>
        {/* <button
          className="px-4 py-2 rounded-xl shadow-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 transition"
        >
          Explore Now
        </button> */}

   
      </div>
    </div>

    {/* Desktop: full hero with background and content */}
    <section
      className="hidden md:flex relative w-full h-screen items-center justify-center bg-[url('https://17mm2glo1t.ufs.sh/f/rQix7xjgXapP0WMu52GVsYGZaPWpBUvSc7XfObH39QMRFCo1')] bg-center bg-cover bg-no-repeat"
    >
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-white text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
          Welcome to Your Hero Section
        </h1>
        <p className="max-w-2xl text-sm md:text-base lg:text-lg opacity-90">
          This copy is visible on desktop as well as mobile.
        </p>
        <button
          className="px-6 py-3 rounded-2xl shadow-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/30 transition"
        >
          Explore Now
        </button>
      </div>
    </section>

    {/* Fallback/extra content below for mobile & desktop */}
    <div className="w-full py-10 flex items-center justify-center px-4">
      <p className="text-sm md:text-base opacity-70 text-center">
        Add your page content here.
      </p>
    </div>
  </div>
  )
}

export default Hero
