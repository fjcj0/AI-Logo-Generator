import React, { useState } from 'react';
import HeadingDescription from './HeadingDescription';
import lookup from '@/app/_data/lookup';
import colors from '@/app/_data/colors';

function LogoColorPallete({ onHandleInputChange,formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.pallette);

  return (
    <div className="my-10">
      <HeadingDescription 
        title={lookup?.LogoColorPalleteTitle} 
        description={lookup?.LogoColorPalleteDesc} 
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {colors.map((palette, paletteIndex) => (
          <div 
            key={paletteIndex} 
            className={`flex cursor-pointer p-1 ${selectedOption === palette.name && 'border-2 rounded-lg border-primary'}`}
            onClick={() => {
              setSelectedOption(palette.name); // Update the selected palette
              onHandleInputChange( palette.name); // Pass the palette name to formData
            }}
          >
            {palette?.colors.map((color, colorIndex) => (
              <div 
                key={colorIndex} 
                className="h-24 w-full" 
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoColorPallete;
