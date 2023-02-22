import Link from 'next/link';
import Head from 'next/head';

import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

import { BiDonateHeart } from 'react-icons/bi';
import {
  BsFillCalendar2WeekFill,
  BsFillGearFill,
  BsPeopleFill,
} from 'react-icons/bs';
import { FaBullseye, FaUserInjured } from 'react-icons/fa';
import { GiTombstone } from 'react-icons/gi';
import { RiCoinsFill, RiEarthquakeFill } from 'react-icons/ri';

import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Header from '@/components/Header/Header';
import ProjectCard from '@/components/ProjectCard/ProjectCard';

export default function Home({
  address: cachedAddress,
}: {
  address: string | null;
}) {
  return (
    <>
      <Head>
        <title>Emergency Relief</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header cachedAddress={cachedAddress || undefined} />

      <div className="flex flex-col justify-center items-center w-full bg-hero bg-cover aspect-video p-10">
        <h1 className="font-black text-3xl md:text-5xl text-center lg:text-7xl leading-[150%] text-gray-50">
          Turkish Village Need Help
        </h1>
        <span className="mt-3 text-sm md:text-md text-lg leading-[150%] text-gray-300 text-center">
          Turkish people need help immediately. Please help Turkey!
        </span>
        <Button
          className="mt-6"
          leftNode={<BiDonateHeart className="h-5 w-5" />}
        >
          Donate Now
        </Button>
        <Link href="#" className="mt-3 text-gray-300">
          Learn more
        </Link>
      </div>

      <div className="container mx-auto py-10 bg-gray-100">
        <main className="space-y-5 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 hxl:grid-cols-4 gap-8">
            <Card
              heading={'projects'}
              information={'10'}
              icon={<BsFillGearFill className="h-5 w-5" />}
            ></Card>
            <Card
              heading={'unique donors'}
              information={'5,425'}
              icon={<BsPeopleFill className="h-5 w-5" />}
            ></Card>
            <Card
              heading={'raised'}
              information={'$1M'}
              icon={<RiCoinsFill className="h-5 w-5" />}
            ></Card>
            <Card
              heading={'in'}
              information={'16 days'}
              icon={<BsFillCalendar2WeekFill className="h-5 w-5" />}
            ></Card>
          </div>

          <div>
            <h2 className="font-bold text-4xl text-gray-900">
              Earthquake Casualties
            </h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 hxl:grid-cols-4 gap-8">
              <Card
                heading={'deaths'}
                information={'+41,000'}
                icon={<GiTombstone className="h-5 w-5" />}
              ></Card>
              <Card
                heading={'injuries'}
                information={'+21,000'}
                icon={<FaUserInjured className="h-5 w-5" />}
              ></Card>
              <Card
                heading={'collapsed buildings'}
                information={'+7,500'}
                icon={<RiEarthquakeFill className="h-5 w-5" />}
              ></Card>
              <Card
                heading={'affected area'}
                information={'100K km²'}
                icon={<FaBullseye className="h-5 w-5" />}
              ></Card>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-4xl text-gray-900">
              Support Projects
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                project={{
                  imageUrl: '',
                  name: 'Ahbap Association',
                  description:
                    'Ahbap Association, founded by Haluk Levent in 2017, aims to provide all...',
                  raised: '$10,000',
                  numberOfUniqueDonors: 1203,
                }}
              ></ProjectCard>
              <ProjectCard
                project={{
                  imageUrl: '',
                  name: 'Ahbap Association',
                  description:
                    'Ahbap Association, founded by Haluk Levent in 2017, aims to provide all...',
                  raised: '$10,000',
                  numberOfUniqueDonors: 1203,
                }}
              ></ProjectCard>
              <ProjectCard
                project={{
                  imageUrl: '',
                  name: 'Ahbap Association',
                  description:
                    'Ahbap Association, founded by Haluk Levent in 2017, aims to provide all...',
                  raised: '$10,000',
                  numberOfUniqueDonors: 1203,
                }}
              ></ProjectCard>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  address: string | null;
}> = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  const address = getCookie('address', { req, res });

  return {
    props: {
      address: address?.toString() || null,
    },
  };
};
