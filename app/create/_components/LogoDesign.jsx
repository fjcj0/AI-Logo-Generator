"use client";
import React, { useState } from "react";
import HeadingDescription from "./HeadingDescription";
import lookup from "@/app/_data/lookup";
import Image from "next/image";
import logodesign from "@/app/_data/logodesign";
function LogoDesign({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design);
  return (
    <div className="my-10">
      <HeadingDescription
        title={lookup?.LogoDesignTitle}
        description={lookup?.LogoDesignDesc}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        {logodesign.map((design, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(design);
              onHandleInputChange(design);
            }}
            className={`p-1 rounded-xl cursor-pointer ${selectedOption === design
              ? "border-2 border-primary"
              : "hover:border-2 border-primary"
              }`}
          >
            <Image
              className="w-full rounded-xl h-[200px] object-cover"
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default LogoDesign;