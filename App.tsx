import React from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Passions from './components/Passions';
import Projects from './components/Projects';
import Workshops from './components/Workshops';
import AskSection from './components/AskSection';
import Footer from './components/Footer';

const App: React.FC = () => (
  <div className="min-h-screen bg-ink">
    <Nav />
    <main>
      <Hero />
      <Passions />
      <Projects />
      <Workshops />
      <AskSection />
    </main>
    <Footer />
  </div>
);

export default App;
