import type { NextPage } from "next";
import Head from "next/head";
import Content from "../components/Content";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotify Clone</title>
        <link rel="/favicon.ico" />
      </Head>

      <div className="bg-black h-screen overflow-hidden">
        <main className="flex">
          <Sidebar />
          <Content />
        </main>
      </div>
    </>
  );
};

export default Home;
