import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <link rel="/favicon.ico" />
      </Head>

      <main className="bg-black h-screen overflow-hidden">
        <Sidebar />
      </main>

      <div></div>
    </>
  );
};

export default Home;
