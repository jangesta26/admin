'use client'

import { Menu } from "lucide-react";

const HamburgerButton = (props: {
  openBar:boolean ;
  setOpenBar: (arg0: boolean) => void;
  }) => {

    
  return (
    <button
    aria-controls="sidebar"
    onClick={(e) => {
      e.stopPropagation();
      props.setOpenBar(!props.openBar);
    }}
    className={`${ !props.openBar && "sm:hidden"} z-99999 block rounded-[4px] sm:rounded-[4px] border border-stroke bg-white p-1 shadow-sm dark:border-strokedark dark:bg-slate-800`}
  >
    <Menu />
  </button>
  )
}

export default HamburgerButton
