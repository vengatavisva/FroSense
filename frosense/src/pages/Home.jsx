import React from "react";
import windFarm from "../assets/img1.jpeg";
import Counter from "../components/counter";
import {Sparkles, ArrowDownLeft, Zap, Lightbulb, TrendingDown, Battery, Users, Sun } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-blue-50">
      {/* --- HERO SECTION --- */}
      <div className="flex justify-center items-center min-h-screen py-10">
        <div
          className="relative w-[96%] md:w-[94%] lg:w-[92%] min-h-[85vh] bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center text-center"
          style={{
            backgroundImage: `url(${windFarm})`,
          }}
        >
          {/* Light transparent overlay for readability */}
          <div className="absolute inset-0 bg-black/30 rounded-3xl" />

          {/* Centered Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-6">
            {/* Tag */}
            <div className="bg-white/90 border border-gray-200 shadow-sm rounded-full px-4 py-2 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-600" />
              <span className="text-black text-sm font-medium">
                AI-Powered Cold Storage
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Smart Cold Storage,{" "}
              <span className="text-teal-300">Sustainable Future.</span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 max-w-2xl text-lg text-gray-100">
              AI-powered, solar-driven cold storage that minimizes food spoilage,
              optimizes energy use, and empowers farmers sustainably.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:opacity-90 transition">
                Explore Solution
              </button>
              <button className="bg-white/90 border border-gray-200 text-gray-800 font-semibold px-8 py-3 rounded-full shadow hover:bg-white transition">
                Live Monitoring Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- WHY SUSTAINABILITY MATTERS SECTION --- */}
      <section className="pt-10 pb-20 bg-blue-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
        Why ECOFROST?
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
        Traditional cold storage is expensive, energy-hungry, and inaccessible to small farmers. ECOFROST brings intelligence, efficiency, and sustainability to every farm — powered by AI, IoT, and solar innovation.
        </p>

        {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] mx-auto">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-green-100 p-4 rounded-xl">
                  <ArrowDownLeft className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                Reduce Food Waste
              </h3>
              <p className="text-gray-500 text-center">
                AI-powered monitoring prevents spoilage before it happens
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-orange-100 p-4 rounded-xl">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                Energy Efficient
              </h3>
              <p className="text-gray-500 text-center">
                Solar-powered Peltier cooling optimized by machine learning
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-xl">
                  <Lightbulb className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-2">
                Smart Predictions
              </h3>
              <p className="text-gray-500 text-center">
                Predictive algorithms forecast optimal cooling schedules
              </p>
            </div>
          </div>
      </section>
      {/* --- UN SDG IMPACT SECTION --- */}
      <section className="pt-10 pb-20 bg-blue-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          UN SDG Impact
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12">
          Aligning with global Sustainable Development Goals (SDGs) to build a
          cleaner, fairer, and more sustainable future.
        </p>

        {/* SDG Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-[90%] mx-auto">
          {/* SDG 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <img
              src="sdg2.png"
              alt="Zero Hunger"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="text-blue-600 font-semibold text-sm mb-1">SDG 2</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Zero Hunger</h3>
            <p className="text-gray-500 text-sm">
              Prevents food loss, supports food security.
            </p>
          </div>

          {/* SDG 7 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <img
              src="sdg7.png"
              alt="Clean Energy"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="text-blue-600 font-semibold text-sm mb-1">SDG 7</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Clean Energy</h3>
            <p className="text-gray-500 text-sm">
              Solar-powered and off-grid ready.
            </p>
          </div>

          {/* SDG 9 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <img
              src="sdg9.png"
              alt="Innovation"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="text-blue-600 font-semibold text-sm mb-1">SDG 9</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-500 text-sm">
              Promotes smart agri-infrastructure.
            </p>
          </div>

          {/* SDG 12 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <img
              src="sdg12.png"
              alt="Responsible Production"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="text-blue-600 font-semibold text-sm mb-1">SDG 12</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Responsible Production
            </h3>
            <p className="text-gray-500 text-sm">Reduces waste.</p>
          </div>

          {/* SDG 13 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition text-center">
            <img
              src="sdg13.jpg"
              alt="Climate Action"
              className="mx-auto mb-4 w-12 h-12"
            />
            <p className="text-blue-600 font-semibold text-sm mb-1">SDG 13</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Climate Action</h3>
            <p className="text-gray-500 text-sm">Low carbon footprint.</p>
          </div>
        </div>
      </section>
      <section className="pt-10 pb-20 bg-blue-50 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          Real Impact, Real Numbers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-[90%] mx-auto mt-12">
          
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition text-center">
            <div className="flex justify-center mb-4">
              <TrendingDown className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-5xl font-extrabold text-teal-500">
              <Counter end={40} suffix="%" />
            </p>
            <p className="text-gray-600 mt-2 text-lg">Food Waste Reduced</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition text-center">
            <div className="flex justify-center mb-4">
              <Battery className="w-10 h-10 text-blue-400" />
            </div>
            <p className="text-5xl font-extrabold text-teal-500">
              <Counter end={75} suffix="%+" />
            </p>
            <p className="text-gray-600 mt-2 text-lg">Energy Efficiency</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-5xl font-extrabold text-teal-500">
              <Counter end={20} suffix="+" />
            </p>
            <p className="text-gray-600 mt-2 text-lg">Farmers Benefited</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-md transition text-center">
            <div className="flex justify-center mb-4">
              <Sun className="w-10 h-10 text-yellow-500" />
            </div>
            <p className="text-5xl font-extrabold text-teal-500">
              <Counter end={97} suffix="%" />
            </p>
            <p className="text-gray-600 mt-2 text-lg">Solar Utilization</p>
          </div>
        </div>
      </section>
    </div>
  );
}
