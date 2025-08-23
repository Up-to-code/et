"use client";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import gsap from "gsap";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.to("#navbar", {
      backgroundColor: scrolled ? "#fff" : "transparent",
      color: scrolled ? "#000" : "#fff",
      duration: 0.4,
      ease: "power2.out",
    });
  }, [scrolled]);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6  transition-colors duration-300 py-5"
    >
      {/* Mobile: Logo Left, Burger Right */}
      <div className="flex w-full items-center justify-between md:hidden">        <Drawer>
          <DrawerTrigger asChild>
            <button className="text-2xl">
              <GiHamburgerMenu />
            </button>
          </DrawerTrigger>
          <DrawerContent className="fixed inset-0 bg-white text-black p-6">
            <DrawerHeader>
              <VisuallyHidden>
                <DrawerTitle>Navigation Menu</DrawerTitle>
              </VisuallyHidden>
            </DrawerHeader>
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-lg">Menu</span>
              <DrawerClose asChild>
                <Button variant="outline" size="sm">
                  Close
                </Button>
              </DrawerClose>
            </div>
            <div className="space-y-4 text-lg">
              <a href="#" className="block">
                Home
              </a>
              <a href="#" className="block">
                About
              </a>
              <a href="#" className="block">
                Services
              </a>
              <a href="#" className="block">
                Contact
              </a>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="font-bold text-xl">LOGO</div>

      </div>
      {/* Desktop: Links Left, Logo Right */}

      <div className="hidden md:block font-bold text-xl">LOGO</div>      <div className="hidden md:flex items-center space-x-8 font-medium">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Services</a>
        <a href="#">Contact</a>
      </div>
    </nav>
  );
}
