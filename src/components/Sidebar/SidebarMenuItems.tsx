'use client'
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { ChevronDown } from "lucide-react";

interface MenuItemsData {
  sidebarMenuItemsData: any[];
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
} 



const SidebarMenuItems = ({ sidebarMenuItemsData, sidebarOpen, setSidebarOpen }: MenuItemsData) => {
  
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(true);

  const pathname = usePathname();
  const trigger = useRef<any>(null);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    document.querySelector("body")?.classList.toggle("sidebar-expanded", sidebarExpanded);
  }, [sidebarExpanded]);

  return (
    <ul className={`${sidebarOpen && "lg:mb-2"} mb-6 flex flex-col gap-1.5`}>
      {sidebarMenuItemsData.map((item, index) => (
        <SidebarLinkGroup
          key={index}
          activeCondition={pathname === item.menuItemPath || pathname.includes(item.menuItemIncludes)}
        >
          {(handleClick, open) => (
            <>
              {item.subMenuItem ? (
                <Link
                  href={item.menuItemPath || ""}
                  className={`${
                    sidebarOpen && "lg:px-2 rounded-[5px]"
                  } group relative flex items-center gap-2 px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    (pathname === item.menuItemPath || pathname.includes(item.menuItemIncludes)) &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                  }}
                >
                    <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-expanded={sidebarOpen}
                    >
                    {item.menuItemIcon}
                    </button>
                    <p className={`${sidebarOpen && "lg:hidden"} font-light`}>{item.menuItemName}</p>
                      <ChevronDown 
                      className={`${sidebarOpen && "lg:hidden"} absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
                        open && "rotate-180"
                      }`}
                      />
                </Link>
              ) : (
                <Link
                  href={item.menuItemPath || ""}
                  className={`${sidebarOpen && "lg:px-2 rounded-[5px]"} group relative flex items-center gap-2.5 px-4 py-2 font-light tracking-widest text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes(item.menuItemIncludes) && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <div className={`${sidebarOpen && "lg:mx-auto"}`}>{item.menuItemIcon}</div>
                  <p className={`${sidebarOpen && "lg:hidden"} font-light`}>{item.menuItemName}</p>
                </Link>
              )}

              {item.subMenuItem && (
                <div
                  className={`${sidebarOpen && "lg:hidden"} grid overflow-hidden transition-all duration-500 ease-in-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul
                    className={`overflow-hidden flex flex-col gap-2.5 pl-6 transition-all duration-500 ease-in-out ${
                      open ? "mb-2 py-2" : "-mb-2 -py-2"
                    }`}
                  >
                    {item.subMenuItem.map((subItem:any, subIndex:any) => (
                      <Link
                        key={subIndex}
                        href={subItem.subMenuItemPath || ""}
                        className={`group relative flex items-center gap-2.5 rounded-md text-sm tracking-widest px-4 font-light text-bodydark2 transition-all duration-300 ease-in-out hover:text-white hover:bg-graydark dark:hover:bg-meta-4${
                          pathname === subItem.subMenuItemPath && "text-white"
                        }`}
                      >
                        {subItem.subMenuItemName}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </SidebarLinkGroup>
      ))}
    </ul>
  );
};

export default SidebarMenuItems;
