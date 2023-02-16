import * as React from 'react';
import { SVGProps } from 'react';

const Twitter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={32}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="m30.872 4.713-3.774 3.762C26.348 17.213 18.973 24 10.16 24c-1.813 0-3.313-.287-4.45-.85-.912-.462-1.287-.95-1.388-1.1a1 1 0 0 1 .488-1.487c.025-.013 2.975-1.138 4.888-3.3a13.578 13.578 0 0 1-3.088-3.05C4.897 11.888 3.085 7.85 4.172 1.825a1.013 1.013 0 0 1 .688-.775 1 1 0 0 1 1.012.238c.038.05 4.2 4.15 9.288 5.475V6a6.037 6.037 0 0 1 6.075-6 6.025 6.025 0 0 1 5.125 3h3.8a1 1 0 0 1 .925.613 1.05 1.05 0 0 1-.213 1.1Z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" transform="translate(.5)" d="M0 0h31v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default Twitter;
