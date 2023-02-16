import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  id: number;
  logoImageUrl: string;
  name: string;
  summary: string;
};

const ProjectCard = ({ id, logoImageUrl, name, summary }: Props) => {
  return (
    <Link className="flex flex-1" href={`/project/${id}`}>
      <div
        key={id}
        className="bg-[#E7E5E3] p-6 flex flex-col items-center justify-center rounded-xl space-y-2"
      >
        <Image
          className="rounded-full h-24 w-24"
          src={{
            src: logoImageUrl || '/world.png',
            width: 200,
            height: 200,
          }}
          alt={name}
        />

        <span className="block font-bold text-lg text-center">{name}</span>

        <style>{`
      .description {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          line-clamp: 3;
          -webkit-box-orient: vertical;
      }
    `}</style>

        <span className="block text-xs text-center description">{summary}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
