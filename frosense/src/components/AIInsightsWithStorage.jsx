import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  AlertTriangle,
  Bolt,
  Leaf,
  Boxes,
  Brain,
  LineChart,
} from "lucide-react";

// --- Mock Zones Data ---
const zones = [
  {
    id: "A",
    name: "Zone A",
    product: "Strawberries",
    items: 24,
    temperature: 7.8,
    humidity: 85,
    shelfLifeDays: 2.6,
    status: "Active",
    duty: "Cooling",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "B",
    name: "Zone B",
    product: "Milk Cartons",
    items: 12,
    temperature: 4.5,
    humidity: 70,
    shelfLifeDays: 8.3,
    status: "Active",
    duty: "Idle",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "C",
    name: "Zone C",
    product: "Leafy Greens",
    items: 40,
    temperature: 5.9,
    humidity: 90,
    shelfLifeDays: 5.4,
    status: "Active",
    duty: "Cooling",
    image:
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "D",
    name: "Zone D",
    product: "Frozen Gel Packs",
    items: 60,
    temperature: -1.2,
    humidity: 45,
    shelfLifeDays: 30,
    status: "Active",
    duty: "Charging",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

// --- Temperature Recommendation Logic ---
function recommendTemperature(product, currentTemp) {
  const map = {
    strawberries: 2.0,
    milk: 4.0,
    "leafy greens": 3.5,
    "gel packs": -2.0,
  };
  const key = product.toLowerCase();
  let base =
    map[Object.keys(map).find((k) => key.includes(k.split(" ")[0]))] ??
    (key.includes("straw") ? 2.0 : key.includes("milk") ? 4.0 : 4.0);

  const diff = currentTemp - base;
  const adjustment = diff > 2 ? -1.5 : diff > 0.5 ? -0.8 : diff < -2 ? 1.0 : 0;
  const recommended = +(base + adjustment).toFixed(1);

  let confidence = 85;
  if (Math.abs(diff) > 3) confidence = 95;
  else if (Math.abs(diff) < 0.5) confidence = 75;

  let action =
    diff > 0.5
      ? `Reduce temperature by ${diff.toFixed(1)}°C to prevent spoilage and save energy.`
      : diff < -0.5
      ? `Increase temperature by ${Math.abs(diff).toFixed(1)}°C to protect sensitive items.`
      : "Temperature is optimal for this product.";

  let riskLevel = Math.abs(diff) > 2 ? "High" : Math.abs(diff) > 1 ? "Medium" : "Low";

  return { recommended, confidence, action, riskLevel };
}

// --- AI Features for Each Zone ---
const aiFeatures = (zone) => {
  const rec = recommendTemperature(zone.product, zone.temperature);
  return [
    {
      id: "temp",
      title: "Temperature Optimization",
      icon: <Thermometer className="w-5 h-5 text-red-500" />,
      desc: rec.action,
      confidence: rec.confidence,
      risk: rec.riskLevel,
      color: "bg-red-50 text-red-600",
    },
    {
      id: "spoil",
      title: "Spoilage Risk Detection",
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
      desc:
        zone.shelfLifeDays < 5
          ? "High spoilage risk detected — immediate attention recommended."
          : "Spoilage risk low — product safe for storage.",
      confidence: Math.min(100, 100 - zone.shelfLifeDays * 2),
      risk: zone.shelfLifeDays < 5 ? "High" : "Low",
      color: "bg-rose-50 text-rose-600",
    },
    {
      id: "energy",
      title: "Energy Optimization",
      icon: <Bolt className="w-5 h-5 text-amber-600" />,
      desc:
        "Schedule cooling during peak solar hours to maximize renewable energy usage.",
      confidence: 85,
      risk: "Medium",
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: "savings",
      title: "Energy Savings Recommendation",
      icon: <Leaf className="w-5 h-5 text-green-600" />,
      desc:
        "Optimize zone patterns to save energy while maintaining product quality.",
      confidence: 80,
      risk: "Medium",
      color: "bg-green-50 text-green-600",
    },
  ];
};

// --- Component ---
export default function AIInsightsWithStorageVertical({ modelStarted = true }) {
  const animatedStorage = useMemo(() => zones, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-8 pt-0 pb-10 space-y-10">
      {/* --- Compact Header --- */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-600 via-teal-500 to-emerald-500 p-[1px] shadow-lg mt-2"
      >
        <div className="rounded-3xl bg-white/95 backdrop-blur-md px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 blur-md opacity-70 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-3 shadow-sm">
                <Brain className="w-7 h-7 text-sky-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-700 to-emerald-700 bg-clip-text text-transparent">
                AI Sustainability Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Smart insights to minimize spoilage & optimize solar cooling.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mt-4 md:mt-0"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-sky-100 to-emerald-100 rounded-full border border-sky-200">
              <LineChart className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-gray-700">
                Real-time Monitoring Active
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- Main Grid Section --- */}
      <div className="bg-white rounded-3xl shadow-lg p-8 space-y-8 border border-gray-100">
        {modelStarted ? (
          animatedStorage.map((zone, idx) => (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row gap-8 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white via-sky-50/40 to-emerald-50/40"
            >
              {/* Zone Image */}
              <div className="w-full md:w-72 h-52 rounded-2xl overflow-hidden shadow-inner flex-shrink-0">
                <img
                  src={zone.image}
                  alt={zone.product}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Zone Info */}
              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-sky-700">
                      {zone.name}
                    </h2>
                    <span className="text-sm text-green-700 font-medium">
                      {zone.status}
                    </span>
                    <p className="text-gray-600 mt-1">{zone.product}</p>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Temperature",
                      value: `${zone.temperature.toFixed(1)}°C`,
                      icon: <Thermometer className="w-5 h-5 text-red-500" />,
                    },
                    {
                      label: "Humidity",
                      value: `${zone.humidity.toFixed(0)}%`,
                      icon: <Droplets className="w-5 h-5 text-blue-500" />,
                    },
                    {
                      label: "Items Stored",
                      value: zone.items,
                      icon: <Boxes className="w-5 h-5 text-emerald-600" />,
                    },
                    {
                      label: "Shelf Life",
                      value: `${Math.round(zone.shelfLifeDays)} days`,
                      icon: <Leaf className="w-5 h-5 text-lime-600" />,
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {stat.icon}
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        {stat.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-800">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* AI Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                  {aiFeatures(zone).map((f) => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`flex flex-col p-5 rounded-2xl border ${f.color} border-opacity-40 bg-white/70 backdrop-blur-sm`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {f.icon}
                          <h3 className="text-sm font-semibold text-gray-800">
                            {f.title}
                          </h3>
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            f.risk === "High"
                              ? "bg-red-100 text-red-700 border border-red-300"
                              : f.risk === "Medium"
                              ? "bg-amber-100 text-amber-700 border border-amber-300"
                              : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                          }`}
                        >
                          {f.risk.toLowerCase()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{f.desc}</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full bg-sky-400 transition-all duration-700"
                          style={{ width: `${f.confidence}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-medium text-right">
                        {f.confidence}% confidence
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex items-center justify-center h-52 rounded-2xl border border-dashed border-gray-300">
            <p className="text-sm text-gray-500">
              Storage data will appear once the AI model is started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
