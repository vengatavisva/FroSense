import React, { useState } from "react";
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

  const tempData = [
    { time: "12:00", value: 4.2 },
    { time: "13:00", value: 3.8 },
    { time: "14:00", value: 3.9 },
    { time: "15:00", value: 4.5 },
    { time: "16:00", value: 4.3 },
    { time: "17:00", value: 4.0 },
  ];

  const humidityData = [
    { time: "12:00", value: 72 },
    { time: "13:00", value: 75 },
    { time: "14:00", value: 77 },
    { time: "15:00", value: 80 },
    { time: "16:00", value: 78 },
    { time: "17:00", value: 76 },
  ];

  const chartData = tab === "temperature" ? tempData : humidityData;
  const color = tab === "temperature" ? "#38bdf8" : "#f59e0b";

  return (
    <div>
      {/* Toggle Tabs */}
      <div className="flex mb-4 rounded-full border border-sky-200 overflow-hidden w-fit mx-auto">
        <button
          onClick={() => setTab("temperature")}
          className={`px-6 py-2 text-sm font-medium transition-all ${
            tab === "temperature"
              ? "bg-sky-100 text-sky-700"
              : "text-gray-500 hover:text-sky-600"
          }`}
        >
          Temperature
        </button>
        <button
          onClick={() => setTab("humidity")}
          className={`px-6 py-2 text-sm font-medium transition-all ${
            tab === "humidity"
              ? "bg-amber-100 text-amber-700"
              : "text-gray-500 hover:text-amber-600"
          }`}
        >
          Humidity
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <XAxis dataKey="time" stroke="#94a3b8" />
          <YAxis
            stroke="#94a3b8"
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