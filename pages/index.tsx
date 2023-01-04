import Head from "next/head";
import CountryCapitalGame from "./country-capital-game";

export default function Home() {
  return (
    <>
      <Head>
        <title>Country Capital Game</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <CountryCapitalGame />
      </main>
    </>
  );
}
