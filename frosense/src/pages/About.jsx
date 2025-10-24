import React from "react";
import {
  Leaf,
  Cpu,
  Sun,
  Users,
  Zap,
} from "lucide-react";

export default function About() {
  return (
    <div className="relative bg-gradient-to-b from-sky-50 via-white to-blue-50 min-h-screen flex flex-col items-center py-20 px-6 mt-14 overflow-hidden">

      {/* --- Background decorative circles --- */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-40 -z-10" />

      {/* --- Header Section --- */}
      <div className="text-center max-w-3xl mb-16 animate-fadeIn">
        <h1 className="text-5xl font-extrabold text-sky-800 flex items-center justify-center gap-3 drop-shadow-sm">
          <Leaf className="w-10 h-10 text-green-500 animate-bounce-slow" /> FroSense
        </h1>
        <p className="text-gray-600 mt-4 text-lg leading-relaxed">
          <span className="bg-gradient-to-r from-sky-600 to-green-500 bg-clip-text text-transparent font-semibold">
            AI. IoT. Solar.
          </span>{" "}
          The next-generation cold storage ecosystem — designed to make food preservation smarter,
          sustainable, and affordable.
        </p>
      </div>

      {/* --- Mission & Goal --- */}
      <div className="bg-white/70 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 max-w-5xl text-gray-700 mb-14 animate-slideUp">
        <h2 className="text-3xl font-semibold text-sky-700 flex items-center gap-3 mb-4">
          <Sun className="text-yellow-400" /> Our Mission
        </h2>
        <p className="leading-relaxed text-gray-600 text-lg">
          At <b>FroSense</b>, we aim to reduce <b>post-harvest food loss</b> and empower rural farmers through
          intelligent, <b>solar-powered cold storage</b> systems.  
          Using <b>Artificial Intelligence</b> and <b>IoT sensors</b>, we predict spoilage, optimize cooling, and
          achieve maximum energy efficiency — bridging technology with agriculture for a sustainable future.
        </p>
      </div>

      {/* --- Technical Features --- */}
      <div className="bg-gradient-to-br from-white to-sky-50 border border-sky-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-10 max-w-5xl mb-14">
        <h2 className="text-3xl font-semibold text-sky-700 flex items-center gap-3 mb-4">
          <Cpu className="text-sky-500" /> What Makes FroSense Intelligent
        </h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-3 text-lg">
          <li>
            🌡️ <b>AI-Powered Insights:</b> Predicts spoilage and dynamically adjusts cooling using sensor data.
          </li>
          <li>
            📡 <b>IoT Monitoring:</b> Real-time tracking of temperature, humidity, and gas levels with dashboards.
          </li>
          <li>
            ☀️ <b>Solar-Powered Efficiency:</b> Runs entirely on renewable energy with smart battery backup.
          </li>
          <li>
            ⚡ <b>Energy Optimization:</b> Predictive energy usage with smart load balancing.
          </li>
          <li>
            🔔 <b>Smart Alerts:</b> Real-time notifications for spoilage, energy drops, and compartment activity.
          </li>
        </ul>
      </div>

      {/* --- Benefits Section --- */}
      <div className="bg-white/90 border border-sky-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-10 max-w-5xl mb-14">
        <h2 className="text-3xl font-semibold text-sky-700 flex items-center gap-3 mb-6">
          <Zap className="text-yellow-500" /> Benefits of FroSense
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-gray-700">
          {[
            {
              emoji: "🌿",
              title: "Energy Efficiency",
              desc: "Reduces power consumption by up to 40% with AI-driven scheduling.",
            },
            {
              emoji: "🍅",
              title: "Food Preservation",
              desc: "Extends shelf life of perishables using adaptive temperature control.",
            },
            {
              emoji: "☀️",
              title: "Eco-Friendly",
              desc: "Fully solar-powered system that lowers carbon emissions.",
            },
            {
              emoji: "💡",
              title: "Cost-Effective",
              desc: "Affordable and scalable — ideal for rural and small-scale farmers.",
            },
          ].map((benefit, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 hover:scale-[1.02] transition-transform shadow-sm hover:shadow-md"
            >
              <h3 className="font-semibold text-sky-700 text-lg flex items-center gap-2">
                {benefit.emoji} {benefit.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Team Section --- */}
      <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 p-10 max-w-5xl text-center">
        <h2 className="text-3xl font-semibold text-sky-700 flex items-center justify-center gap-3 mb-8">
          <Users className="text-sky-500" /> Meet Our Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Sudharsan S", role: "AI & IoT Engineer" },
            { name: "Jayanth K", role: "IoT Systems & Integration" },
            { name: "Vengata Visva", role: "Web Developer" },
            { name: "Rohith B", role: "Web Developer" },
          ].map((member, i) => (
            <div
              key={i}
              className="p-6 bg-white/80 border border-sky-100 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-sky-100 to-sky-200 rounded-full flex items-center justify-center text-sky-600 font-bold text-lg">
                {member.name.charAt(0)}
              </div>
              <h3 className="font-semibold text-sky-700 text-lg">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Footer Tagline --- */}
      <div className="mt-14 text-center opacity-80">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} <b>FroSense</b> — Innovating Sustainable Cold Storage with{" "}
          <span className="text-sky-600 font-medium">AI</span> &{" "}
          <span className="text-yellow-500 font-medium">Solar Energy</span>.
        </p>
      </div>
    </div>
  );
}
