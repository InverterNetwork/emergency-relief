import React from 'react';
import { WiEarthquake } from 'react-icons/wi';

type Props = {
  magnitude: number;
  time: string;
  duration: string;
};

const Card = ({ duration, magnitude, time }: Props) => {
  return (
    <div className="relative bg-gray-200 border border-gray-200 shadow-sm min-w-[280px] p-6 space-y-5 rounded-2xl">
      <div>
        <span className="block text-gray-600 text-sm font-medium uppercase">
          Magnitude
        </span>

        <span className="block text-gray-900 font-semibold text-4xl mt-2">
          {magnitude}
        </span>
      </div>

      <div>
        <span className="block text-gray-600 text-sm font-medium uppercase">
          Time
        </span>

        <span className="block text-gray-900 font-semibold text-4xl mt-2">
          {time}
        </span>
      </div>

      <div>
        <span className="block text-gray-600 text-sm font-medium uppercase">
          Duration
        </span>

        <span className="block text-gray-900 font-semibold text-4xl mt-2">
          {duration}
        </span>
      </div>

      <div className="absolute right-6 top-0">
        <div className="h-12 w-12 border-4 border-gray-50 flex items-center justify-center rounded-full">
          <WiEarthquake className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default Card;
