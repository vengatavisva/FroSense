import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Home, Package, Cpu, Info, Bell } from "lucide-react";
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

  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [hasNew, setHasNew] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) setShow(false);
      else setShow(true);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Simulate receiving alerts (later replace this with real alerts from AI page)
  useEffect(() => {
    const timer = setTimeout(() => {
      const newAlert = {
        id: Date.now(),
        message: "⚠️ Ammonia (NH₃) levels rising above 4.8 ppm!",
        time: new Date().toLocaleTimeString(),
      };
      setNotifications((prev) => [newAlert, ...prev]);
      setHasNew(true);
    }, 8000); // 8s after page load (for demo)
    return () => clearTimeout(timer);
  }, []);

  const handleBellClick = () => {
    setOpenDropdown((prev) => !prev);
    setHasNew(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: show ? 0 : -120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl z-50 bg-white/70 shadow-xl border border-gray-200 rounded-2xl"
    >
      <div className="px-6 py-3 flex items-center justify-between">
        {/* --- Left: Logo --- */}
        <NavLink to="/" className="flex items-center space-x-3">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={logo}
            alt="FroSense Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold text-blue-400 text-lg tracking-wide">
            FroSense
          </span>
        </NavLink>

        {/* --- Middle: Links --- */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((item) => (
            <NavLink key={item.name} to={item.to}>
              {({ isActive }) => (
                <span
                  className={`relative flex items-center font-medium transition-colors duration-300 ${
                    isActive ? "text-blue-400" : "text-gray-700"
                  } hover:text-blue-400`}
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

        {/* --- Right: Notification Bell --- */}
        <div className="relative">
          <button
            onClick={handleBellClick}
            className="relative text-gray-700 hover:text-blue-500 transition-colors"
          >
            <Bell className="w-6 h-6" />
            {hasNew && (
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
            )}
            {hasNew && (
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500" />
            )}
          </button>

          {/* --- Dropdown Notification Box --- */}
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b text-gray-700 font-semibold bg-blue-50">
                Notifications
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500 text-center">
                    No new alerts
                  </div>
                ) : (
                  notifications.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 border-b last:border-none text-sm hover:bg-gray-50 transition-colors"
                    >
                      <p className="text-gray-700">{note.message}</p>
                      <span className="text-[11px] text-gray-400">{note.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
