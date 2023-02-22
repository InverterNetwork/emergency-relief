import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cx from 'classnames';

const buttonVariants = cva(
  'flex h-fit rounded-lg gap-2 items-center justify-center leading-0 font-semibold',
  {
    variants: {
      variant: {
        primary:
          'bg-primary hover:bg-primary-600 focus:bg-primary-700 text-gray-50',
        secondary: 'bg-[#E7E5E3] text-[#262626]',
        text: 'bg-transparent text-[#262626]',
        error: 'bg-[#B33A41] text-[#F1F1EF]',
      },
      size: {
        default: 'text-sm py-3 px-4',
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

const Button = React.forwardRef<HTMLButtonElement, Props>(
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

Button.displayName = 'Button';

export default Button;
