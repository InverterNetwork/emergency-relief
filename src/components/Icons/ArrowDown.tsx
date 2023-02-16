import * as React from 'react';
import { SVGProps } from 'react';

const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={48}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M36.885 24.885 25.5 36.255V6h-3v30.255l-11.385-11.37L9 27l15 15 15-15-2.115-2.115Z"
      fill="#69D396"
    />
    <rect
      x={1.5}
      y={1.5}
      width={45}
      height={45}
      rx={22.5}
      stroke="#69D396"
      strokeWidth={3}
    />
  </svg>
);

export default ArrowDownIcon;
