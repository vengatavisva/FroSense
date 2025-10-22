import React, { useEffect, useState } from "react";
import { Wind, Leaf, AlertTriangle, Battery, Thermometer } from "lucide-react";
import EnergyFlowDiagram from "../components/EnergyFlowDiagram";
import AIInsightStorage from "../components/AIInsightsWithStorage";

export default function AIInsights() {
  const gases = [
    { name: "Ammonia (NH₃)", value: 2.1, safe: "< 5 ppm" },
    { name: "Hydrogen Sulfide (H₂S)", value: 0.3, safe: "< 1 ppm" },
    { name: "Benzene (C₆H₆)", value: 0.05, safe: "< 0.1 ppm" },
  ];

  const [displayValues, setDisplayValues] = useState(gases.map(() => 0));

  useEffect(() => {
    gases.forEach((gas, i) => {
      let start = 0;
      const end = gas.value;
      const duration = 1000;
      const increment = end / (duration / 16);

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setDisplayValues((prev) => {
          const newVals = [...prev];
          newVals[i] = parseFloat(start.toFixed(2));
          return newVals;
        });
      }, 16);
    });
  }, []);

  // --- Active Alerts Dummy Data ---
  const alerts = [
    {
      id: 1,
      type: "Critical",
      message: "Zone C temperature exceeds safe range!",
      icon: <Thermometer className="text-red-500 w-6 h-6" />,
      color: "from-red-50 to-red-100 border-red-200 text-red-700",
    },
    {
      id: 2,
      type: "Warning",
      message: "Strawberries expiring soon. Move to high-priority section.",
      icon: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
      color: "from-yellow-50 to-yellow-100 border-yellow-200 text-yellow-700",
    },
    {
      id: 3,
      type: "Low",
      message: "Battery level in Sensor #4 dropped below 30%.",
      icon: <Battery className="text-blue-500 w-6 h-6" />,
      color: "from-blue-50 to-blue-100 border-blue-200 text-blue-700",
    },
  ];

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4 flex flex-col items-center mt-4">
      {/* --- AI Storage Section (no grid) --- */}
      <div className="w-full max-w-5xl mb-10">
        <AIInsightStorage />
      </div>

      {/* --- Cold Storage Gas Monitoring Section --- */}
      <div className="relative w-full max-w-5xl rounded-3xl bg-white border border-sky-100 shadow-md p-8 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>

        <div className="relative flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Leaf className="w-6 h-6 text-sky-600 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-800">
              Cold Storage Gas Monitoring
            </h2>
          </div>
          <p className="text-gray-600 text-center text-sm sm:text-base max-w-md">
            Real-time tracking of ambient gases to ensure air quality and safety
            compliance.
          </p>
        </div>

        <div className="relative z-10 flex flex-col gap-6">
          {/* --- Top 3 Gas Cards --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {gases.map((gas, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-blue-100 border border-sky-100 rounded-2xl shadow-sm hover:shadow-sky-200 transition-all duration-300 hover:-translate-y-1 p-4 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wind className="text-sky-500 w-5 h-5 animate-spin-slow" />
                    <span className="text-sky-600 text-sm font-medium">
                      Gas Sensor
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full">
                    Safe ({gas.safe})
                  </span>
                </div>

                <h3 className="text-gray-700 font-semibold text-base mb-1">
                  {gas.name}
                </h3>

                <div>
                  <p className="text-2xl font-bold text-sky-700 transition-all duration-300">
                    {displayValues[index]}
                    <span className="text-xs text-gray-500 ml-1 font-normal">
                      ppm
                    </span>
                  </p>
                  <div className="mt-2 h-1.5 bg-sky-100 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 bg-sky-500 rounded-full transition-all duration-700 ease-in-out"
                      style={{
                        width: `${(displayValues[index] / 5) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- Bottom 2 Cards --- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-white to-green-100 border border-green-100 rounded-2xl shadow-sm hover:shadow-green-200 transition-all duration-300 hover:-translate-y-1 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 font-semibold text-base mb-1">
                  CO₂ Level
                </h3>
                <p className="text-3xl font-bold text-green-600 animate-pulse">
                  420
                  <span className="text-xs text-gray-500 ml-1 font-normal">
                    ppm
                  </span>
                </p>
              </div>
              <Wind className="text-green-600 w-6 h-6 opacity-80 animate-spin-slow" />
            </div>

            <div className="bg-gradient-to-br from-white to-green-100 border border-green-100 rounded-2xl shadow-sm hover:shadow-green-200 transition-all duration-300 hover:-translate-y-1 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-gray-700 font-semibold text-base mb-1">
                  Ethylene Level
                </h3>
                <p className="text-3xl font-bold text-green-600 animate-pulse">
                  0.08
                  <span className="text-xs text-gray-500 ml-1 font-normal">
                    ppm
                  </span>
                </p>
              </div>
              <Wind className="text-green-600 w-6 h-6 opacity-80 animate-spin-slow" />
            </div>
          </div>
        </div>
      </div>

      {/* --- Energy Flow Diagram --- */}
      <div className="w-full max-w-5xl mt-10">
        <EnergyFlowDiagram />
      </div>

      {/* --- Active Alerts Section --- */}
      <div className="w-full max-w-5xl mt-10 mb-10">
        <div className="rounded-3xl bg-white border border-sky-100 shadow-md p-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <div className="relative flex flex-col items-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-sky-600 animate-pulse" />
              Active Alerts
            </h2>
            <p className="text-gray-600 text-center text-sm sm:text-base max-w-md">
              Live status updates and anomaly detection from cold storage sensors.
            </p>
          </div>

          {/* --- Alert Cards --- */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-gradient-to-br ${alert.color} rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 p-5 flex flex-col justify-between`}
              >
                <div className="flex items-center gap-3 mb-3">
                  {alert.icon}
                  <h3 className="font-semibold text-lg">{alert.type} Alert</h3>
                </div>
                <p className="text-sm leading-relaxed">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
