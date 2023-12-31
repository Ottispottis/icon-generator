import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { MyLinkButton } from "~/components/MyLinkButton";

const HomePage: NextPage = () => {

  function HeroBanner() {
    return <section className="grid grid-cols-1 sm:grid-cols-2 gap-12 px-8 mt-12 sm:mt-24 mb-12 sm:mb-24">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl sm:text-6xl">Generate beautiful icons with a click of a button</h1>
        <p className="text-1xl sm:text-2xl">Use AI to create beautiful icons for your business in seconds</p>
        <MyLinkButton size="self-start" href={'/generate'}>Generate Icons</MyLinkButton>
      </div>
      <Image 
        src='/landingpage-banner.png' 
        alt="Image of icons created with Icon generator" 
        width='400' 
        height='300'
        className="order-first sm:-order-none"
      />
    </section>
  }

  return (
    <>
      <Head>
        <title>Icon Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex  flex-col items-center justify-center">
        <HeroBanner />
      </main>
    </>
  );
};

export default HomePage;



