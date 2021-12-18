import type { GetServerSideProps, NextPage, NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Content from "../components/Content";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

interface HomeProps {
  session: Session | null;
}

const Home: NextPage<HomeProps> = () => {
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

        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default Home;
