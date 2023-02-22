import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';

import ProjectCard from '@/features/projects/components/ProjectCard/ProjectCard';
import { getProjects } from '@/features/projects/project.service';
import { Project } from '@/features/projects/entity/project.entity';

import Header from '@/components/Header/Header';

type Props = {
  address: string | null;
  projects: Project[];
};

export default function Donate({ address: cachedAddress, projects }: Props) {
  return (
    <>
      <Head>
        <title>Emergency Relief</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="container mx-auto py-10">
        <Header cachedAddress={cachedAddress || ''} />

        <main className="flex flex-col mt-8 bg-gray-50 py-4 px-6 rounded-3xl">
          <h2 className="text-2xl font-bold">{projects.length} results</h2>

          <div className="mt-3 grid md:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                logoImageUrl={project.logoImageUrl || ''}
                name={project.name}
                summary={project.summary}
              />
            ))}
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
