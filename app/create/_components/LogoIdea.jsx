import React, { useState } from 'react';
import HeadingDescription from './HeadingDescription';
import lookup from '@/app/_data/lookup';
import logoidea from '@/app/_data/logoidea';

function LogoIdea({ onHandleInputChange, formData }) {
  const [selectedIdea, setSelectedIdea] = useState(formData?.idea);

  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.LogoIdeaTitle}
        description={lookup?.LogoIdeaDesc}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
        {Object.values(logoidea).map((idea, index) => (
          <p
            key={index}
            onClick={() => {
              setSelectedIdea(idea); 
              onHandleInputChange(idea); 
            }}
            className={`p-3 cursor-pointer hover:border-2 rounded-3xl border-primary ${
              selectedIdea === idea ? 'border-2 border-primary' : ''
            }`}
          >
            {idea}
          </p>
        ))}
      </div>
    </div>
  );
}

export default LogoIdea;
