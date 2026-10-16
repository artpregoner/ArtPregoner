import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/layout/Header"; // Import Navbar component
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  // State para sa dark mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Function to toggle theme
  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }

  // Apply saved theme on load
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-base-100">
        <Header toggleTheme={toggleTheme} theme={theme} />  {/* Gumamit ng Navbar component */}
        <main className="pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

