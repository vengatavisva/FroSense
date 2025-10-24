import React, { createContext, useContext, useState, useEffect } from "react";

// ===== Create Context =====
const ModelContext = createContext();

// ===== Provider =====
export const ModelProvider = ({ children }) => {
  const [modelStarted, setModelStarted] = useState(false);

  // Fans
  const [fans, setFans] = useState([
    { id: 1, name: "FAN 1", on: false, rpm: 0 },
    { id: 2, name: "FAN 2", on: false, rpm: 0 },
    { id: 3, name: "FAN 3", on: false, rpm: 0 },
    { id: 4, name: "FAN 4", on: false, rpm: 0 },
  ]);

  // Metrics
  const [metrics, setMetrics] = useState({
    temperature: 0,
    humidity: 0,
    battery: 0,
    alerts: 0,
  });

  // Storage Zones
  const storageZones = [
    { name: "Zone A", product: "Vaccine Batch A1", items: 2, temperature: 4.2, humidity: 68, shelfLifeDays: 12, status: "Peltier ON", duty: "70%" },
    { name: "Zone B", product: "Organic Samples", items: 2, temperature: 6.8, humidity: 72, shelfLifeDays: 5, status: "Peltier ON", duty: "85%" },
    { name: "Zone C", product: "Lab Serum C", items: 1, temperature: 8.5, humidity: 78, shelfLifeDays: 2, status: "Peltier ON", duty: "90%" },
    { name: "Zone D", product: "Enzyme D3", items: 1, temperature: 3.8, humidity: 65, shelfLifeDays: 15, status: "Peltier ON", duty: "75%" },
  ];

  const [animatedStorage, setAnimatedStorage] = useState(
    storageZones.map((zone) => ({ ...zone, temperature: 0, humidity: 0, shelfLifeDays: 0 }))
  );

  // ===== Toggle Model =====
  const toggleModel = () => {
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
    const target = { temperature: 5.8, humidity: 71, battery: 44, alerts: 3 };
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
            const nextTemp = Math.abs(target.temperature - zone.temperature) < 0.1
              ? target.temperature
              : zone.temperature + (target.temperature - zone.temperature) * 0.1;
            const nextHumidity = Math.abs(target.humidity - zone.humidity) < 0.1
              ? target.humidity
              : zone.humidity + (target.humidity - zone.humidity) * 0.1;
            const nextShelf = Math.abs(target.shelfLifeDays - zone.shelfLifeDays) < 0.1
              ? target.shelfLifeDays
              : zone.shelfLifeDays + (target.shelfLifeDays - zone.shelfLifeDays) * 0.1;
            return { ...zone, temperature: nextTemp, humidity: nextHumidity, shelfLifeDays: nextShelf };
          })
        );
      }, 50);
    } else {
      setAnimatedStorage(storageZones.map((zone) => ({ ...zone, temperature: 0, humidity: 0, shelfLifeDays: 0 })));
    }
    return () => clearInterval(interval);
  }, [modelStarted]);

  return (
    <ModelContext.Provider value={{
      modelStarted,
      toggleModel,
      fans,
      setFans,
      metrics,
      animatedStorage
    }}>
      {children}
    </ModelContext.Provider>
  );
};

// ===== Hook =====
export const useModel = () => useContext(ModelContext);
