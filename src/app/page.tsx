import Layout from '@/components/layout/Layout';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';

export default function Home() {
  return (
    <Layout>
      <main className="">
        <About />
        <Experience />
      </main>
    </Layout>
  );
}
