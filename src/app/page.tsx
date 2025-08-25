import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <main className="">
        {/* Content sections coming soon */}
        <section className="flex justify-center">
          <div className="text-center px-4">
            <h2 className="text-2xl font-light text-white mb-4">
              Welcome to my portfolio
            </h2>
            <p className="text-secondary mb-8">
              Content sections coming soon...
            </p>
            <div className="text-sm font-mono text-gopher-blue">
              <span>diegopher@portfolio:~$ </span>
              <span className="text-white">echo &quot;Building amazing things...&quot;</span>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
