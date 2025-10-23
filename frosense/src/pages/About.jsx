import React from "react";
import { Leaf, Cpu, Sun, Users, Zap, Thermometer } from "lucide-react";

export default function About() {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col items-center py-16 px-6 mt-14">
      {/* --- Header Section --- */}
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-4xl font-bold text-sky-700 flex items-center justify-center gap-2">
          <Leaf className="w-8 h-8 text-green-500" /> About FroSense
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          A next-generation cold storage ecosystem powered by <b>AI, IoT, and Solar Energy</b>,
          designed to make food preservation smarter, sustainable, and affordable.
        </p>
      </div>

      {/* --- Mission & Goal --- */}
      <div className="bg-white/70 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-md p-8 max-w-5xl text-gray-700 mb-12">
        <h2 className="text-2xl font-semibold text-sky-700 flex items-center gap-2 mb-3">
          <Sun className="text-yellow-400" /> Our Mission
        </h2>
        <p className="leading-relaxed">
          At <b>FroSense</b>, our goal is to minimize <b>post-harvest food loss</b> and empower
          rural farmers through intelligent, solar-driven cold storage systems. We combine
          <b> Artificial Intelligence </b> and <b> IoT sensors </b> to predict spoilage, optimize
          cooling, and ensure maximum energy efficiency — creating a sustainable link between
          technology and agriculture.
        </p>
      </div>

      {/* --- Technical Features --- */}
      <div className="bg-gradient-to-br from-white to-blue-100 border border-sky-100 rounded-3xl shadow-md p-8 max-w-5xl mb-12">
        <h2 className="text-2xl font-semibold text-sky-700 flex items-center gap-2 mb-3">
          <Cpu className="text-sky-500" /> What Makes FroSense Intelligent
        </h2>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
          <li>
            <b>AI-Powered Insights:</b> Predicts spoilage and dynamically adjusts cooling using sensor data.
          </li>
          <li>
            <b>IoT Monitoring:</b> Real-time temperature, humidity, and gas tracking with live dashboards.
          </li>
          <li>
            <b>Solar-Powered Efficiency:</b> Operates using renewable energy with battery backup support.
          </li>
          <li>
            <b>Energy Optimization:</b> Smart load balancing and predictive energy usage for sustainability.
          </li>
          <li>
            <b>Smart Alerts:</b> Live notifications for spoilage risk, energy drop, and compartment activity.
          </li>
        </ul>
      </div>

      {/* --- Benefits --- */}
      <div className="bg-white border border-sky-100 rounded-3xl shadow-sm p-8 max-w-5xl mb-12">
        <h2 className="text-2xl font-semibold text-sky-700 flex items-center gap-2 mb-3">
          <Zap className="text-yellow-500" /> Benefits of FroSense
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-gray-700">
          <div className="p-4 rounded-xl bg-blue-50 border border-sky-100">
            🌿 <b>Energy Efficiency:</b> Reduces power usage by up to 40% with AI scheduling.
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-sky-100">
            🍅 <b>Food Preservation:</b> Extends shelf life of perishables by optimizing cooling.
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-sky-100">
            ☀️ <b>Eco-Friendly:</b> 100% solar-driven system minimizing carbon footprint.
          </div>
          <div className="p-4 rounded-xl bg-blue-50 border border-sky-100">
            💡 <b>Cost-Effective:</b> Affordable, scalable model tailored for rural and small-scale farmers.
          </div>
        </div>
      </div>

      {/* --- Team Section --- */}
      <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-3xl shadow-md p-8 max-w-5xl text-center">
        <h2 className="text-2xl font-semibold text-sky-700 flex items-center justify-center gap-2 mb-6">
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
              className="p-4 bg-white border border-sky-100 rounded-2xl shadow-sm hover:shadow-sky-200 transition-all"
            >
              <h3 className="font-semibold text-sky-700 text-lg">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Footer Tagline --- */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} FroSense | Innovating Sustainable Cold Storage with AI & Solar Energy
        </p>
      </div>
    </div>
  );
}
