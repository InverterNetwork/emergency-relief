import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cx from 'classnames';
import Image from 'next/image';

const projectCardVariants = cva('flex', {
  variants: {
    variant: {
      primary: 'text-gray-900',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ProjectCardVariantProps = VariantProps<typeof projectCardVariants>;

export interface Props
  extends ProjectCardVariantProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  project: {
    imageUrl: string;
    name: string;
    description: string;
    raised: string;
    numberOfUniqueDonors: number;
  };
}

const ProjectCard = React.forwardRef<HTMLDivElement, Props>(
  ({ project, variant, className, ...props }, ref) => {
    const butttonClasses = projectCardVariants({ variant });

    return (
      <div ref={ref} className={cx(butttonClasses, className)} {...props}>
        <div className="flex flex-col items-start w-full">
          <div className="relative aspect-video w-full rounded-xl shadow-sm">
            <Image
              className="absolute w-full h-full object-contain object-center rounded-xl"
              alt="logo"
              src={{
                src: project.imageUrl,
                width: 1600,
                height: 900,
              }}
            />
          </div>

          <div className="flex flex-col text-left mt-3 gap-y-2">
            <div className="font-bold text-md text-gray-900">
              {project.name}
            </div>
            <div className="text-md text-gray-600 description">
              {project.description}
            </div>
            {/* <div className="text-xm text-gray-600">
              <span className="font-semibold text-primary ">
                {project.raised} raised
              </span>{' '}
              with{' '}
              <span className="font-semibold text-secondary">
                {project.numberOfUniqueDonors}
              </span>{' '}
              unique donors
            </div> */}
          </div>
        </div>
      </div>
    );
  },
);

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
