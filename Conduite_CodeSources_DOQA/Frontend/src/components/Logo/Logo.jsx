

import React from "react";

export const Logo = ({
  className,
  groupClassName,
  groupClassNameOverride,
  overlapGroupClassName,
  rectangleClassName,
  rectangleClassNameOverride,
  divClassName,
}) => {
  return (
    <div className={`w-[1300px] h-[444px] ${className}`}>
      <div className={`relative w-[1232px] h-[356px] top-[44px] left-[42px] ${groupClassName}`}>
        <div className={`absolute w-[376px] h-[356px] top-0 left-0 ${groupClassNameOverride}`}>
          <div className={`relative h-[356px] ${overlapGroupClassName}`}>
            <div
              className={`absolute w-[280px] h-[280px] top-[76px] left-0 bg-teal-300 rounded-[280px_280px_0px_280px] rotate-180 ${rectangleClassName}`}
            />
            <div
              className={`absolute w-[280px] h-[280px] top-0 left-[96px] bg-[#0284c766] rounded-[280px_280px_0px_280px] ${rectangleClassNameOverride}`}
            />
          </div>
        </div>
        <div
          className={`absolute top-[22px] left-[448px] [font-family:'Montserrat',Helvetica] font-semibold text-sky-600 text-[256px] tracking-[0] leading-[normal] ${divClassName}`}
        >
          DoQA
        </div>
      </div>
    </div>
  );
};
