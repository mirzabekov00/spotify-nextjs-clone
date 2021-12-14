import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <>
      <Head>
        <title>Login | Spotify Clone</title>
        <link rel="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
        <img className="w-52 mb-5" src="https://i.imgur.com/fPuEa9V.png" />
        {providers &&
          Object.values(providers).map((provider) => (
            <div key={provider.id}>
              <button
                className="bg-[#18D860] text-white px-5 py-3 rounded-lg"
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
              >
                Login with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<LoginProps> = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default Login;
