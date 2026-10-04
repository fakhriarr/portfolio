import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Achievements } from '@/components/Achievements';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Achievements />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}