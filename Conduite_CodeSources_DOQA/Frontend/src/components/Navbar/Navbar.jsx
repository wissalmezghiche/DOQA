
import React from "react";
import { Logo } from "../Logo";

export const Navbar = ({ className }) => {
  return (
    <div
      className={`flex w-screen py-3  items-center justify-around px-[92px] relative bg-white shadow-[0px_4px_20px_#47556914] ${className}`}
    >
      <Logo
        className="!h-[44.4px] !w-[130px] !relative"
        divClassName="!text-[25.6px] !left-[45px] !top-[2px]"
        groupClassName="!h-[36px] !left-[4px] !w-[126px] !top-[4px]"
        groupClassNameOverride="!h-[36px] !w-[38px]"
        overlapGroupClassName="!h-[36px]"
        rectangleClassName="!h-[28px] !rounded-[28px_28px_0px_28px] !w-[28px] !top-[8px]"
        rectangleClassNameOverride="!h-[28px] !rounded-[28px_28px_0px_28px] !left-[10px] !w-[28px]"
      />
    </div>
  );
};
