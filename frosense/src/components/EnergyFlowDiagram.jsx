import React from "react";
import { Sun, Battery, Snowflake, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function EnergyFlowSimulation() {
  return (
    <div className="w-full max-w-6xl p-10 mx-auto mt-10 relative overflow-hidden bg-gradient-to-r from-yellow-50 via-sky-50 to-green-50 rounded-2xl shadow-md">
      {/* === Subtle white grid background === */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated gradient glow layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-sky-100 to-green-100 opacity-60 blur-3xl"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Title */}
      <h3 className="text-3xl font-semibold text-sky-700 mb-10 flex items-center gap-2 justify-center relative z-10">
        <Zap className="w-7 h-7 text-sky-500 animate-pulse" /> Energy Flow Diagram
      </h3>

      {/* Flow Diagram */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* --- Solar --- */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <Sun className="w-14 h-14 text-yellow-500 drop-shadow-[0_0_10px_#facc15]" />
            <motion.div
              className="absolute inset-0 rounded-full bg-yellow-300/30 blur-xl"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <p className="text-gray-700 font-semibold mt-3">Solar</p>
          <p className="text-sm text-gray-500">145W</p>
        </motion.div>

        {/* --- Energy Flow Line 1 --- */}
        <motion.div
          className="hidden md:block h-[4px] w-24 bg-gradient-to-r from-yellow-400 to-sky-400 rounded-full relative overflow-hidden"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 100%" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-2 h-4 bg-yellow-300 rounded-full blur-[2px]"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* --- Battery --- */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center"
        >
          <Battery className="w-12 h-12 text-sky-500 drop-shadow-[0_0_10px_#38bdf8]" />
          <p className="text-gray-700 font-semibold mt-3">Battery</p>
          <div className="w-28 h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <motion.div
              className="h-3 bg-sky-500 rounded-full"
              animate={{ width: ["60%", "68%", "65%"] }}
              transition={{ repeat: Infinity, duration: 3 }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">68%</p>
        </motion.div>

        {/* --- Energy Flow Line 2 --- */}
        <motion.div
          className="hidden md:block h-[4px] w-24 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full relative overflow-hidden"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.3,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 100%" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-2 h-4 bg-sky-300 rounded-full blur-[2px]"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* --- Peltier --- */}
        <motion.div
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="flex flex-col items-center"
        >
          <Snowflake className="w-12 h-12 text-blue-500 drop-shadow-[0_0_10px_#3b82f6]" />
          <p className="text-gray-700 font-semibold mt-3">Peltier</p>
          <p className="text-sm text-gray-500">89W</p>
        </motion.div>

        {/* --- Energy Flow Line 3 --- */}
        <motion.div
          className="hidden md:block h-[4px] w-24 bg-gradient-to-r from-blue-400 to-green-400 rounded-full relative overflow-hidden"
          animate={{ backgroundPositionX: ["0%", "100%"] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: 0.6,
            ease: "linear",
          }}
          style={{ backgroundSize: "200% 100%" }}
        >
          <motion.div
            className="absolute top-0 left-0 w-2 h-4 bg-green-300 rounded-full blur-[2px]"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* --- Products / Gel Pack --- */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: 1 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <img
              src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
              alt="Gel Pack"
              className="w-12 h-12 drop-shadow-[0_0_10px_#22c55e]"
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-green-300/30 blur-xl"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
          <p className="text-gray-700 font-semibold mt-3">Products</p>
          <p className="text-sm text-gray-500">97%</p>
        </motion.div>
      </div>
    </div>
  );
}
