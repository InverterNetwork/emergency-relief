import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cx from 'classnames';

const cardVariants = cva('flex shadow-sm h-fit rounded-lg leading-0', {
  variants: {
    variant: {
      primary: 'bg-gray-200 text-gray-900',
    },
    size: {
      default: 'py-6 px-6',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
});

export type CardVariantProps = VariantProps<typeof cardVariants>;

export interface Props
  extends CardVariantProps,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  heading: React.ReactNode;
  information: React.ReactNode;
  icon?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, Props>(
  ({ heading, information, icon, variant, className, size, ...props }, ref) => {
    const butttonClasses = cardVariants({ variant, size });

    return (
      <div ref={ref} className={cx(butttonClasses, className)} {...props}>
        <>
          <div className="flex flex-row justify-between w-full">
            <div className="flex flex-col items-start gap-y-3">
              <div className="uppercase text-gray-600 text-sm">{heading}</div>
              <div className="font-semibold text-gray-900 text-4xl">
                {information}
              </div>
            </div>

            <div className="flex h-12 w-12 bg-gray-100 justify-center items-center rounded-full border-gray-50 border-4">
              {icon}
            </div>
          </div>
        </>
      </div>
    );
  },
);

Card.displayName = 'Card';

export default Card;
