"use client";
import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchCard from "./SearchCard";

function Hero() {
  return (
    <section className="relative h-[550px] sm:h-[750px] w-[95%] mx-auto rounded-xl sm:rounded-2xl my-4 sm:my-6 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div
        style={{
          backgroundImage:
            'url("https://17mm2glo1t.ufs.sh/f/rQix7xjgXapPuUfvLNVsAP4VXJrIeZjWaTgm82pkUSHnRqMd")',
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-3 sm:px-6 flex flex-col justify-center items-center h-full text-white text-center">
        <h1
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold mb-4 sm:mb-6 leading-snug sm:leading-tight tracking-tight drop-shadow-lg"
          dir="rtl"
        >
          كل البيوت تحت سقف واحد
        </h1>

        <p
          className="text-base sm:text-lg md:text-2xl opacity-90 max-w-xl sm:max-w-2xl mx-auto font-medium mb-6 sm:mb-8 leading-relaxed"
          dir="rtl"
        >
          أسعار حقيقية. صور حقيقية. عقارات حقيقية
        </p>

        {/* Search Card */}
        <div className="w-full max-w-full sm:max-w-3xl px-1 sm:px-0">
          <SearchCard />
        </div>

        {/* Call to Action Button */}
        <div className="mt-6 sm:mt-8 w-full sm:w-auto px-2">
          <Button
            size="lg"
            className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-medium bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-md rounded-xl sm:rounded-2xl transition-all duration-300 shadow-lg"
          >
            <Play className="w-5 h-5 ml-2 fill-white" />
            أبدأ رحلتك
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
