import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import StatsDashboard from './components/StatsDashboard';
import ProjectPanel from './components/ProjectPanel';
import Timeline from './components/Timeline';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import './App.css';
import Interests from './components/Interests';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="portfolio-app">
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <About />
      <Interests/>
      <ProjectPanel />
      <StatsDashboard isDark={isDark} />
      <Timeline />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
