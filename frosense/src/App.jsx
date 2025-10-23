import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import AIInsights from "./pages/AIInsights";
import About from "./pages/About";
import { ModelProvider } from "./context/ModelContext";

export default function App() {
  return (
    <ModelProvider> {/* Wrap your app in the provider */}
      <Router>
        <div className="min-h-screen bg-blue-50">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main className="pt-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ModelProvider>
  );
}
