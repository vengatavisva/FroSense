import React, { useState, useEffect } from "react";
import EnvironmentTrends from "../components/EnvironmentTrends";
import {
  Video,
  Fan,
  Power,
  Gauge,
  Battery,
  AlertTriangle,
  Thermometer,
  Droplets,
  Package,
  Clock,
  Boxes,
  Leaf,
} from "lucide-react";

// ===== FanCard Component =====
function FanCard({ fan }) {
  const [rpm, setRpm] = useState(fan.rpm);

  useEffect(() => {
    let interval;
    if (fan.on) {
      interval = setInterval(() => {
        const randomRpm = (1500 + Math.random() * 100).toFixed(0);
        setRpm(randomRpm);
      }, 2000);
    } else {
      setRpm(0);
    }

    return () => clearInterval(interval);
  }, [fan.on]);

  return (
    <div className="relative bg-white/60 backdrop-blur-lg border border-sky-200 rounded-2xl p-4 shadow-md hover:shadow-sky-300/40 transition-all flex flex-col items-center justify-center">
      {fan.on && (
        <div className="absolute inset-0 rounded-2xl border-2 border-sky-400/60 animate-pulse pointer-events-none"></div>
      )}

      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gradient-to-b from-white to-white flex items-center justify-center">
        {fan.on ? (
          <video
            src="IMG_9634.MP4"
            autoPlay
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img
            src="7_-min.png"
            alt="Fan Stopped"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </div>

      <div className="mt-3 text-center">
        <h3 className="text-sky-700 font-semibold tracking-wide flex items-center justify-center gap-2">
          <Fan size={18} /> {fan.name}
        </h3>
        <p className="text-sm text-red-500">
          {fan.on ? `${rpm} RPM` : "Stopped"}
        </p>
      </div>
    </div>
  );
}

// ===== Risk & Shelf-Life Utilities =====
const getRiskLevel = (temp) => {
  if (temp > 7)
    return { label: "High Risk", color: "text-rose-600 bg-rose-100" };
  if (temp >= 5)
    return { label: "Medium Risk", color: "text-amber-600 bg-amber-100" };
  return { label: "Low Risk", color: "text-green-600 bg-green-100" };
};

const getShelfLifeStatus = (days) => {
  if (days <= 3) return { color: "text-rose-600", label: `${days} days left` };
  if (days <= 7) return { color: "text-amber-600", label: `${days} days left` };
  return { color: "text-green-600", label: `${days} days left` };
};

// ===== Main Component =====
export default function Inventory() {
  const [modelStarted, setModelStarted] = useState(false);
  const [fans, setFans] = useState([
    { id: 1, name: "FAN 1", on: false, rpm: 0 },
    { id: 2, name: "FAN 2", on: false, rpm: 0 },
    { id: 3, name: "FAN 3", on: false, rpm: 0 },
    { id: 4, name: "FAN 4", on: false, rpm: 0 },
  ]);

  // ===== Metrics state =====
  const [metrics, setMetrics] = useState({
    temperature: 0,
    humidity: 0,
    battery: 0,
    alerts: 0,
  });

  // ===== Storage Zones =====
  const storageZones = [
    {
      name: "Zone A",
      product: "Vaccine Batch A1",
      items: 2,
      temperature: 4.2,
      humidity: 68,
      shelfLifeDays: 12,
      status: "Peltier ON",
      duty: "70%",
    },
    {
      name: "Zone B",
      product: "Organic Samples",
      items: 2,
      temperature: 6.8,
      humidity: 72,
      shelfLifeDays: 5,
      status: "Peltier ON",
      duty: "85%",
    },
    {
      name: "Zone C",
      product: "Lab Serum C",
      items: 1,
      temperature: 8.5,
      humidity: 78,
      shelfLifeDays: 2,
      status: "Peltier ON",
      duty: "90%",
    },
    {
      name: "Zone D",
      product: "Enzyme D3",
      items: 1,
      temperature: 3.8,
      humidity: 65,
      shelfLifeDays: 15,
      status: "Peltier ON",
      duty: "75%",
    },
  ];

  // ===== Animated Storage State =====
  const [animatedStorage, setAnimatedStorage] = useState(
    storageZones.map((zone) => ({
      ...zone,
      temperature: 0,
      humidity: 0,
      shelfLifeDays: 0,
    }))
  );

  // ===== Toggle Model =====
  const toggleAll = () => {
    const next = !modelStarted;
    setModelStarted(next);
    setFans((prev) =>
      prev.map((f) => ({
        ...f,
        on: next,
        rpm: next ? (1500 + Math.random() * 100).toFixed(0) : 0,
      }))
    );
  };

  // ===== Animate Metrics =====
  useEffect(() => {
    let interval;
    const target = {
      temperature: 5.8,
      humidity: 71,
      battery: 68,
      alerts: 3,
    };

    if (modelStarted) {
      interval = setInterval(() => {
        setMetrics((prev) => {
          const next = {};
          for (let key in prev) {
            const diff = target[key] - prev[key];
            next[key] = Math.abs(diff) < 0.1 ? target[key] : prev[key] + diff * 0.1;
          }
          return next;
        });
      }, 50);
    } else {
      setMetrics({ temperature: 0, humidity: 0, battery: 0, alerts: 0 });
    }

    return () => clearInterval(interval);
  }, [modelStarted]);

  // ===== Animate Storage =====
  useEffect(() => {
    let interval;

    if (modelStarted) {
      interval = setInterval(() => {
        setAnimatedStorage((prev) =>
          prev.map((zone, idx) => {
            const target = storageZones[idx];
            const nextTemp =
              Math.abs(target.temperature - zone.temperature) < 0.1
                ? target.temperature
                : zone.temperature + (target.temperature - zone.temperature) * 0.1;

            const nextHumidity =
              Math.abs(target.humidity - zone.humidity) < 0.1
                ? target.humidity
                : zone.humidity + (target.humidity - zone.humidity) * 0.1;

            const nextShelf =
              Math.abs(target.shelfLifeDays - zone.shelfLifeDays) < 0.1
                ? target.shelfLifeDays
                : zone.shelfLifeDays + (target.shelfLifeDays - zone.shelfLifeDays) * 0.1;

            return {
              ...zone,
              temperature: nextTemp,
              humidity: nextHumidity,
              shelfLifeDays: nextShelf,
            };
          })
        );
      }, 50);
    } else {
      setAnimatedStorage(
        storageZones.map((zone) => ({
          ...zone,
          temperature: 0,
          humidity: 0,
          shelfLifeDays: 0,
        }))
      );
    }

    return () => clearInterval(interval);
  }, [modelStarted]);

  return (
    <div className="min-h-screen bg-blue-50 text-slate-800 mt-14">
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        {/* ===== Live Video Section ===== */}
        <div className="mt-4 bg-white/50 backdrop-blur-xl border border-sky-200/60 shadow-xl rounded-3xl overflow-hidden hover:shadow-sky-300/40 transition-all">
          <div className="flex justify-between items-center px-6 py-4 border-b border-sky-100/60 bg-gradient-to-r from-sky-50/70 to-white/60 backdrop-blur-md">
            <h2 className="text-xl font-semibold text-sky-700 flex items-center gap-2">
              <Video className="text-sky-500" /> Live Video Preview
            </h2>
            <button
              onClick={toggleAll}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-md transition-all text-white ${
                modelStarted
                  ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700"
                  : "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700"
              }`}
            >
              <Power size={16} className="animate-pulse" />
              {modelStarted ? "Stop All" : "Start All"}
            </button>
          </div>

          <div className="relative w-full h-[22rem] sm:h-[26rem] lg:h-[28rem] overflow-hidden rounded-b-3xl">
            {!modelStarted ? (
              <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-sky-50 via-white to-sky-100 border-t border-sky-100/50">
                <div className="w-20 h-20 mb-3 rounded-full border-4 border-sky-300 flex items-center justify-center animate-pulse shadow-inner">
                  <Video className="text-sky-400 w-10 h-10" />
                </div>
                <p className="text-slate-500 mb-3 text-sm tracking-wide">
                  System not active
                </p>
                <button
                  onClick={toggleAll}
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full font-semibold shadow-md"
                >
                  ▶️ Start Model
                </button>
              </div>
            ) : (
              <>
                {/* === LIVE ESP32-CAM STREAM == */}
                <img
                  src="http://172.20.10.5:81/stream"
                  alt="ESP32-CAM Live Stream"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4 w-4 h-4 bg-red-500 rounded-full shadow-[0_0_15px_3px_rgba(239,68,68,0.6)] animate-pulse"></div>
                <div className="absolute bottom-4 right-4 text-sm bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-lg text-sky-700 font-medium flex items-center gap-2">
                  <span className="animate-pulse text-red-500 text-base">●</span>
                  Live Feed Active
                </div>
                <div className="absolute bottom-4 left-4 text-xs text-white/80 bg-sky-900/40 px-2 py-1 rounded-md font-mono backdrop-blur-sm">
                  {new Date().toLocaleTimeString()}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ===== Fan Control Grid ===== */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-sky-700 mb-4 flex items-center gap-2">
            <Fan /> Fan Monitoring Grid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fans.map((fan) => (
              <FanCard key={fan.id} fan={fan} />
            ))}
          </div>
        </div>

        {/* ===== Environment Data Section ===== */}
        <div className="mt-10">
          <h3 className="text-base font-semibold mb-6 text-sky-700 flex items-center gap-2">
            <Gauge size={20} className="text-sky-500" />
            Real-time monitoring and AI-powered insights for your cold storage system
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Temperature */}
            <div className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm hover:shadow-sky-200 transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-slate-600">Avg Temperature</span>
                <Thermometer size={20} className="text-amber-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-amber-600">
                  {metrics.temperature.toFixed(1)}
                </span>
                <span className="text-base text-slate-500">°C</span>
              </div>
              <div className="text-xs text-rose-500 mt-1">
                {modelStarted ? "-2.3% vs last hour" : "-"}
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm hover:shadow-emerald-200 transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-slate-600">Avg Humidity</span>
                <Droplets size={20} className="text-emerald-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-emerald-600">
                  {metrics.humidity.toFixed(0)}
                </span>
                <span className="text-base text-slate-500">%</span>
              </div>
              <div className="text-xs text-emerald-600 mt-1">
                {modelStarted ? "+1.2% vs last hour" : "-"}
              </div>
            </div>

            {/* Battery */}
            <div className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm hover:shadow-green-200 transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-slate-600">Battery Level</span>
                <Battery size={20} className="text-green-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-green-600">
                  {metrics.battery.toFixed(0)}
                </span>
                <span className="text-base text-slate-500">%</span>
              </div>
              <div className="text-xs text-rose-500 mt-1">
                {modelStarted ? "-5% discharging" : "-"}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white border border-sky-100 rounded-xl p-5 shadow-sm hover:shadow-rose-200 transition-all">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-slate-600">Active Alerts</span>
                <AlertTriangle size={20} className="text-rose-500" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-rose-600">
                  {metrics.alerts.toFixed(0)}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {modelStarted ? "in progress" : "-"}
              </div>
            </div>
          </div>
        </div>

        {/* ===== Storage Compartments ===== */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-sky-700 mb-6 flex items-center gap-2">
            <Boxes className="text-sky-600 w-6 h-6" /> Storage Compartments
          </h2>

          {!modelStarted ? (
            <div className="flex flex-col items-center justify-center h-40 bg-white/50 rounded-2xl border border-sky-100/60 shadow-md text-slate-500">
              <p className="text-sm">
                Storage data will appear once the system starts
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {animatedStorage.map((zone, index) => {
                const temp = zone.temperature;
                const shelfDays = Math.round(zone.shelfLifeDays);

                const risk =
                  temp > 7
                    ? { label: "High Risk", color: "text-rose-600 bg-rose-100" }
                    : temp >= 5
                    ? {
                        label: "Medium Risk",
                        color: "text-amber-600 bg-amber-100",
                      }
                    : {
                        label: "Low Risk",
                        color: "text-green-600 bg-green-100",
                      };

                const shelf =
                  shelfDays <= 3
                    ? { color: "text-rose-600", label: `${shelfDays} days left` }
                    : shelfDays <= 7
                    ? {
                        color: "text-amber-600",
                        label: `${shelfDays} days left`,
                      }
                    : {
                        color: "text-green-600",
                        label: `${shelfDays} days left`,
                      };

                return (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg hover:shadow-sky-200/50 transition-all text-gray-800"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-sky-600 font-semibold text-lg">
                        {zone.name}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium transition-colors duration-300 ${risk.color}`}
                      >
                        {risk.label}
                      </span>
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      {zone.product}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      {zone.items} item(s) stored
                    </p>

                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-rose-500" />
                        <div>
                          <p className="text-xs text-gray-500">Temperature</p>
                          <p className="font-semibold">{temp.toFixed(1)}°C</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-sky-500" />
                        <div>
                          <p className="text-xs text-gray-500">Humidity</p>
                          <p className="font-semibold">
                            {zone.humidity.toFixed(0)}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span
                        className={`text-sm font-medium transition-colors duration-300 ${shelf.color}`}
                      >
                        Shelf life: {shelf.label}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-200 pt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Power className="w-4 h-4 text-green-600" />
                        <span>{zone.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-sky-500" />
                        <span>{zone.duty}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ===== Environment Trends Section ===== */}
        <div className="mt-16 bg-white/70 backdrop-blur-xl border border-sky-100 rounded-3xl shadow-md hover:shadow-sky-200/50 transition-all">
          <div className="px-6 py-5 border-b border-sky-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-sky-700 flex items-center gap-2">
              <Leaf className="text-sky-500 w-6 h-6" />
              Environment Trends
            </h2>
            <p className="text-sm text-gray-500">
              Historical temperature and humidity data
            </p>
          </div>

          <div className="px-6 py-5">
            <EnvironmentTrends modelStarted={modelStarted} />
          </div>
        </div>
      </main>
    </div>
  );
}
