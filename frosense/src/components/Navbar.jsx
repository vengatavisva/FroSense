import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Home, Package, Cpu, Info } from "lucide-react";
import logo from "../assets/logo.PNG";

export default function Navbar() {
  const navLinks = [
    { name: "Home", to: "/", icon: <Home className="w-5 h-5 inline-block mr-1" /> },
    { name: "Inventory", to: "/inventory", icon: <Package className="w-5 h-5 inline-block mr-1" /> },
    { name: "AI Insights", to: "/ai-insights", icon: <Cpu className="w-5 h-5 inline-block mr-1" /> },
    { name: "About", to: "/about", icon: <Info className="w-5 h-5 inline-block mr-1" /> },
  ];

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        // Scrolling down -> hide
        setShow(false);
      } else {
        // Scrolling up -> show
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: show ? 0 : -120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/70 shadow-xl border border-gray-200 rounded-2xl"
    >
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Name */}
        <NavLink to="/" className="flex items-center space-x-3">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={logo}
            alt="Fro-Sense Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold text-blue-400 text-lg tracking-wide">
            FroSense
          </span>
        </NavLink>

        {/* Right: Navigation Links */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((item) => (
            <NavLink key={item.name} to={item.to}>
              {({ isActive }) => (
                <span className={`relative flex items-center font-medium transition-colors duration-300
                  ${isActive ? "text-blue-400" : "text-gray-700"} hover:text-blue-400`}
                >
                  {item.icon} {item.name}
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] bg-blue-400"
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none hover:text-indigo-600 transition-colors">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
