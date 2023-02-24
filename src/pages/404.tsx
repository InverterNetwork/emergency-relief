import Head from 'next/head';

import Header from '@/components/Header/Header';

type Props = {
  address: string | null;
};

export default function About({ address: cachedAddress }: Props) {
  return (
    <>
      <Head>
        <title>404</title>
        <meta
          name="description"
          content="Innovative Relief Donations Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header cachedAddress={cachedAddress || undefined} />

      <div className="container mx-auto py-10">
        <main className="flex flex-col mt-8 justify-center aspect-video">
          <h1 className="text-center text-8xl font-bold text-gray-900">404</h1>
          <h2 className="text-center text-2xl font-semibold mt-8">
            There is nothing here
          </h2>
        </main>
      </div>
    </>
  );
}
