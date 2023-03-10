import Link from 'next/link';
import Head from 'next/head';

import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

import { BiDonateHeart } from 'react-icons/bi';
import {
  BsFillCalendar2WeekFill,
  BsFillGearFill,
  BsPeopleFill,
  BsChevronDown,
} from 'react-icons/bs';
import { FaBullseye, FaUserInjured } from 'react-icons/fa';
import { GiTombstone } from 'react-icons/gi';
import { RiCoinsFill, RiEarthquakeFill } from 'react-icons/ri';

import Button from '@/components/Button/Button';
import Card from '@/components/Card/Card';
import Header from '@/components/Header/Header';
import ProjectCard from '@/components/ProjectCard/ProjectCard';
import Infographic from '@/components/Infographic/Infographic';
import { Project } from '@/features/projects/entity/project.entity';
import { getProjects } from '@/features/projects/project.service';
import dayjs from 'dayjs';

type Props = {
  address: string | null;
  projects: Project[];
};

export default function Home({ address: cachedAddress, projects }: Props) {
  return (
    <>
      <Head>
        <title>Emergency Relief</title>
        <meta
          name="description"
          content="Innovative Relief Donations Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header cachedAddress={cachedAddress || undefined} />

      <div className="relative flex flex-col justify-center items-center w-full bg-hero bg-cover h-screen p-10">
        <h1 className="font-black text-3xl md:text-5xl text-center lg:text-7xl leading-[150%] text-gray-50">
          Emergency Relief
        </h1>
        <p className="mt-4 text-sm md:text-md leading-[150%] text-gray-300 text-center w-full lg:w-[60%]">
          Crypto Community Unites to Support Earthquake Relief Efforts in
          Turkiye. <br></br>Join us in providing aid and support to those
          affected by the devastating earthquakes in Turkiye through crypto
          donations and innovative relief efforts.
        </p>

        <div className="flex flex-row space-x-4">
          <Link href="#donate" scroll={false}>
            <Button
              className="mt-6"
              leftNode={<BiDonateHeart className="h-5 w-5" />}
            >
              Donate Now
            </Button>
          </Link>
          <Link href="/about" scroll={false}>
            <Button variant="secondary" className="mt-6">
              About Us
            </Button>
          </Link>
        </div>

        <div className="absolute bottom-0 mb-5 text-gray-300 animate-pulse select-none">
          <Link
            href="#info"
            scroll={false}
            className="flex flex-col items-center justify-center"
          >
            <span>Scroll down to learn more</span>

            <BsChevronDown className="mt-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      <div id="info" className="container mx-auto py-10 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 hxl:grid-cols-4 gap-8">
          <Card
            heading={'projects'}
            information={'13'}
            icon={<BsFillGearFill className="h-5 w-5" />}
          ></Card>
          <Card
            heading={'unique donors'}
            information={'+4,000'}
            icon={<BsPeopleFill className="h-5 w-5" />}
          ></Card>
          <Card
            heading={'raised'}
            information={'+$5.7M'}
            icon={<RiCoinsFill className="h-5 w-5" />}
          ></Card>
          <Card
            heading={'in'}
            information={`${dayjs()
              .diff(dayjs('2023-02-07'), 'days')
              .toString()} days`}
            icon={<BsFillCalendar2WeekFill className="h-5 w-5" />}
          ></Card>
        </div>

        <span className="text-sm text-gray-600 italic mt-8 text-center block">
          These numbers are updated on 23.02.2022. Most updated metrics can be
          found on&nbsp;
          <Link
            className="text-secondary-600 font-semibold hover:text-secondary-900"
            href={'https://dune.com/queries/1992852/3296008'}
            target="_blank"
          >
            Dune
          </Link>
          .
        </span>

        <h2 className="font-bold text-4xl text-gray-900 mt-14">
          Earthquake Infographic
        </h2>
        <Infographic />

        <main className="space-y-5 mt-14">
          <div>
            <h2 className="font-bold text-4xl text-gray-900">
              Earthquake Casualties
            </h2>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 hxl:grid-cols-4 gap-8">
              <Card
                heading={'deaths'}
                information={'+43,556'}
                icon={<GiTombstone className="h-5 w-5" />}
              ></Card>
              <Card
                heading={'injuries'}
                information={'+108,281'}
                icon={<FaUserInjured className="h-5 w-5" />}
              ></Card>
              <Card
                heading={'collapsed buildings'}
                information={'+7,500'}
                icon={<RiEarthquakeFill className="h-5 w-5" />}
              ></Card>
              <Card
                heading={'affected area'}
                information={'100K km??'}
                icon={<FaBullseye className="h-5 w-5" />}
              ></Card>
            </div>

            <span className="text-sm text-gray-600 italic mt-8 text-center block">
              These numbers are updated on 23.02.2022. Most updated metrics can
              be found on&nbsp;
              <Link
                className="text-secondary-600 font-semibold hover:text-secondary-900"
                href={
                  'https://en.wikipedia.org/wiki/2023_Turkey%E2%80%93Syria_earthquake'
                }
                target="_blank"
              >
                Wikipedia
              </Link>
              .
            </span>
          </div>

          <div id="donate">
            <h2 className="font-bold text-4xl text-gray-900 mt-14">
              Support Projects
            </h2>
            <Link
              href={
                'https://giveth.io/project/earthquake-relief-qf-matching-pool'
              }
              target={'_blank'}
            >
              <div className="mt-5 w-full aspect-[2] sm:aspect-[3] bg-pool bg-cover bg-center rounded-xl shadow-sm flex items-center justify-center">
                <h1 className="text-3xl sm:text-5xl font-bold text-gray-50 text-center">
                  Contribute to the Giveth Matching Pool
                </h1>
              </div>
            </Link>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link href={`/project/${project.slug}`} key={project.id}>
                  <ProjectCard
                    project={{
                      imageUrl: project.logoImageUrl || '',
                      name: project.name,
                      description: project.summary,
                      raised: '$10,000',
                      numberOfUniqueDonors: 1203,
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );

  const address = getCookie('address', { req, res });
  const projects = await getProjects();

  return {
    props: {
      address: address?.toString() || null,
      projects,
    },
  };
};
