import Layout from '@/components/layout/Layout';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <Layout>
      <main className="" role="main" aria-label="Portfolio content">
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </Layout>
  );
}
