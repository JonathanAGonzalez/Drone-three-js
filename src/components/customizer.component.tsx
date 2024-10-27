import clsx from 'clsx';

import { useCustomizer } from '../store/customizer.store';
import { Button } from './button.component';

const colors = [
  '#FFB3B3',
  '#B3FFCC',
  '#B3D1FF',
  '#FFB3DA',
  '#FFE6B3',
  '#D1B3FF',
  '#FFC4B3',
];

const textureNormal = '/textures/material_0_normal.png';
const textureDiffuse = '/textures/material_0_diffuse.png';
const textureOcclusion = '/textures/material_0_occlusion.png';
const textureGlossiness = '/textures/material_0_specularGlossiness.png';

const textures = [
  { value: textureNormal, label: 'Base Color' },
  { value: textureDiffuse, label: 'Color Diffuse' },
  { value: textureOcclusion, label: 'Diffuse' },
  { value: textureGlossiness, label: 'Glossiness' },
];

const defaultStyles =
  'transition-all duration-700 flex-col gap-4 h-[150px] flex-1 min-w-[50%] z-[20000] min-h-[200px] rounded-md flex justify-center items-center w-screen absolute  bg-white bottom-0 shadow-2xl';

function stylesIsCustomizer(isCustomizer: boolean) {
  return clsx(
    defaultStyles,
    isCustomizer ? '-translate-x-0' : '-translate-x-[100%]'
  );
}

export const CustomizerLayout = () => {
  const selectedColor = useCustomizer((store) => store.selectedColor);
  const isCustomizer = useCustomizer((store) => store.isCustomizer);
  const handleColorClick = useCustomizer((store) => store.handleColorClick);
  const handleTextureChange = useCustomizer(
    (store) => store.handleTextureChange
  );

  const handleTexture = (value: string) => handleTextureChange(value);

  const stylesStepTwo = stylesIsCustomizer(isCustomizer);

  return (
    <div className={stylesStepTwo}>
      <div className='flex gap-4 flex-wrap justify-center'>
        {textures.map((texture) => (
          <button
            key={texture.value}
            onClick={() => handleTexture(texture.value)}
            className='border p-2 rounded hover:bg-gray-200'
          >
            {texture.label}
          </button>
        ))}
      </div>
      <article className='flex gap-5 justify-center items-center '>
        {colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color }}
            className={` h-[10px] w-[10px] rounded-full transition-transform duration-300 cursor-pointer  ${
              selectedColor === color ? 'scale-150' : ''
            }`}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </article>

      <Button text='Information' />
    </div>
  );
};
