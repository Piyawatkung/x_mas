import Head from 'next/head';

import Snowfall from '../components/Snowfall';

import "../app/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <div className="container h-screen text-center bg-[#6C1D1D;]">
      <Head>
        <title> คริสต์มาสใกล้เข้ามาแล้ว</title>
        <meta name="description" content="Find out what type of house matches your personality!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Snowfall />

      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>

      <div className="absolute bottom-0">
        <img src="/assets/images/bg_footer.png" alt="Welcome" />
      </div>
    </div>
  )
}

