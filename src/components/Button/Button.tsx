import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import cx from 'classnames';

const buttonVariants = cva(
  'flex h-fit py-2 px-4 rounded-full gap-3 items-center justify-center leading-0 font-semibold',
  {
    variants: {
      variant: {
        primary: 'bg-[#262626] text-white',
        secondary: 'bg-[#E7E5E3] text-[#262626]',
        text: 'bg-transparent text-[#262626]',
        error: 'bg-[#B33A41] text-[#F1F1EF]',
      },
    },
    defaultVariants: {
      variant: 'primary',
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
  ({ children, leftNode, rightNode, variant, className, ...props }, ref) => {
    const butttonClasses = buttonVariants({ variant });

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
