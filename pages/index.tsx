import Head from "next/head";
import { signIn } from "next-auth/react";


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className=" text-4xl">template login</h1>
        <button
          className="hover:underline cursor-pointer text-end mt-2"
          onClick={() => signIn()}
        >
          Login to Dashbord
        </button>
      </main>
    </>
  );
}
