import { useRef } from 'react';
import clsx from 'clsx';

import { useCustomizer } from '../store/customizer.store';
import { Button } from './button.component';

const textItems = ['Price: $999', 'Order yours today!', 'Link to website'];

const specifications = [
  '4K high-resolution camera',
  'Intuitive remote control',
  'Easy-to-use mobile app',
  'Flight time up to 30 minutes',
];

const defaultStyles =
  'rounded-xl md:rounded-none order-2 transition-all duration-700  shadow-lg flex flex-col justify-center items-start z-0 h-full bg-[#222] backdrop-blur-md overflow-scroll';

const stylesWhenCustomizerActive = 'opacity-0 w-0 p-0';
const stylesWhenCustomizerIsNotActive =
  'opacity-100 w-full md:w-[50%] p-4 md:p-8';

function validateIfIsCustomizerActive(isCustomizerActive: boolean) {
  return isCustomizerActive
    ? stylesWhenCustomizerActive
    : stylesWhenCustomizerIsNotActive;
}

export const TextInformation = () => {
  const isCustomizerActive = useCustomizer((store) => store.isCustomizer);
  const containerRef = useRef<HTMLDivElement>(null);

  const containerStyles = clsx(
    defaultStyles,
    validateIfIsCustomizerActive(isCustomizerActive)
  );

  return (
    <div ref={containerRef} className={containerStyles} id='text-information'>
      <h1 className='text-2xl md:text-4xl font-semibold mb-3 md:mb-4 text-[#f3f3f3] tracking-tight'>
        The Future of Aerial Photography
      </h1>
      <h2 className='text-xl md:text-2xl mb-2 md:mb-4 text-[#C1E1C1] font-bold'>
        Drone X: Capture the World from Above
      </h2>

      <ul className='list-disc list-inside space-y-1 md:space-y-2 text-[#f3f3f3]'>
        {textItems.map((item) => (
          <li key={item} className='text-base md:text-lg '>
            {item}
          </li>
        ))}
      </ul>

      <article className='my-4 md:my-6'>
        <h3 className='text-lg md:text-xl font-semibold text-[#C1E1C1] mb-1 md:mb-2'>
          Drone Description:
        </h3>
        <p className=' leading-relaxed text-sm md:text-base text-[#f3f3f3]'>
          The Drone X is the most advanced drone on the market. With its
          high-resolution camera and 3-axis image stabilization, it can capture
          professional-quality photos and videos from the air. It's also very
          easy to use, thanks to its intuitive remote control and mobile app.
        </p>
      </article>

      <article className='my-4 md:my-6'>
        <h3 className='text-lg md:text-xl font-semibold text-[#C1E1C1] mb-1 md:mb-2'>
          Key Features:
        </h3>
        <ul className='list-disc list-inside space-y-1 md:space-y-2 text-gray-700'>
          {specifications.map((spec) => (
            <li key={spec} className='text-base md:text-lg text-[#f3f3f3]'>
              {spec}
            </li>
          ))}
        </ul>
      </article>

      <div className='text-center min-h-[40px]'>
        <Button text='Customize Yours!' />
      </div>
    </div>
  );
};
