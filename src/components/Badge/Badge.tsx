import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cx from 'classnames';

const buttonVariants = cva(
  'flex h-fit rounded-full gap-1 items-center justify-center leading-0 font-semibold',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-50 hover:bg-primary-100 focus:bg-primary-200 text-primary-700 mix-blend-multiply',
        secondary:
          'bg-secondary-50 hover:bg-secondary-100 focus:bg-secondary-200 text-secondary-700 mix-blend-multiply',
      },
      size: {
        default: 'text-sm py-1 px-4',
        small: 'text-sm py-1 px-3',
        large: 'text-lg py-3 px-5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface Props
  extends ButtonVariantProps,
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    > {
  children: React.ReactNode;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLButtonElement, Props>(
  (
    { children, leftNode, rightNode, variant, className, size, ...props },
    ref,
  ) => {
    const butttonClasses = buttonVariants({ variant, size });

    return (
      <button ref={ref} className={cx(butttonClasses, className)} {...props}>
        <>
          {Boolean(leftNode) && leftNode}

          {children}

          {Boolean(rightNode) && rightNode}
        </>
      </button>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
