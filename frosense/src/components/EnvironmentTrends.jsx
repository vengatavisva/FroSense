import React, { useEffect, useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function EnvironmentTrends() {
  const [tab, setTab] = useState("temperature");
  const [sensorData, setSensorData] = useState({ temperature: 0, humidity: 0 });
  const [tempHistory, setTempHistory] = useState([]);
  const [humidityHistory, setHumidityHistory] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const res = await fetch("http://10.184.54.40/sensors");
        if (!res.ok) throw new Error("Failed to fetch sensor data");
        const data = await res.json();

        const temperature = data.temperature;
        const humidity = data.humidity;

        const time = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        setSensorData({ temperature, humidity });

        setTempHistory((prev) => [
          ...prev.slice(-14),
          { time, value: temperature },
        ]);
        setHumidityHistory((prev) => [
          ...prev.slice(-14),
          { time, value: humidity },
        ]);
      } catch (err) {
        console.error("Error fetching ESP data:", err);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 3000);
    return () => clearInterval(interval);
  }, []);

  const chartData = tab === "temperature" ? tempHistory : humidityHistory;
  const color = tab === "temperature" ? "#38bdf8" : "#f59e0b";

  // 👇 Dynamically calculate domain with ±1 value buffer
  const [minVal, maxVal] = useMemo(() => {
    if (chartData.length === 0) return [0, 10];
    const values = chartData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return [min - 1, max + 1];
  }, [chartData]);

  return (
    <div>
      {/* --- Tabs --- */}
      <div className="flex mb-4 rounded-full border border-sky-200 overflow-hidden w-fit mx-auto">
        <button
          onClick={() => setTab("temperature")}
          className={`px-6 py-2 text-sm font-medium transition-all ${
            tab === "temperature"
              ? "bg-sky-100 text-sky-700"
              : "text-gray-500 hover:text-sky-600"
          }`}
        >
          Temperature ({sensorData.temperature.toFixed(1)}°C)
        </button>
        <button
          onClick={() => setTab("humidity")}
          className={`px-6 py-2 text-sm font-medium transition-all ${
            tab === "humidity"
              ? "bg-amber-100 text-amber-700"
              : "text-gray-500 hover:text-amber-600"
          }`}
        >
          Humidity ({sensorData.humidity.toFixed(1)}%)
        </button>
      </div>

      {/* --- Live Chart --- */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis
            stroke="#94a3b8"
            domain={[minVal, maxVal]} // ✅ Add buffered dynamic range
            tickCount={6}
            tickFormatter={(v) =>
              tab === "temperature" ? `${v}°C` : `${v}%`
            }
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255,255,255,0.9)",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "0.85rem",
            }}
            labelStyle={{ color: "#334155", fontWeight: 500 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={{ r: 4, strokeWidth: 2, fill: "#fff", stroke: color }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
