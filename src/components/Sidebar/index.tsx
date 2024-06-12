"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
// import SidebarLinkGroup from "./SidebarLinkGroup";
import nextLogo from '../../../public/brandlogo.png'
import { ArrowLeftToLine, CalendarDays, ClipboardPenLine, LayoutGrid, LayoutTemplate, LucideFingerprint, PieChart, Settings, Sheet, User } from "lucide-react";
import SidebarMenuItems from "./SidebarMenuItems";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

  const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {


  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);



  // close if the esc key is pressed

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });



  const sidebarMenuItems = [

    { 
      id: 1, 
      menuItemIcon:  <LayoutGrid className="w-[18px] h-[18px]"/>, 
      menuItemName: 'Dashboard', 
      menuItemPath:"/dashboard",
      menuItemIncludes:'dashboard'
    },

    { 
      id:2, 
      menuItemIcon:  <CalendarDays className="w-[18px] h-[18px]"/>,
      menuItemName: 'Calendar',
      menuItemIncludes: 'calendar',
      menuItemPath: '/calendar',
    },

    { 
      id:3, 
      menuItemIcon:  <User className="w-[18px] h-[18px]"/>,
      menuItemName: 'Profile',
      menuItemIncludes: 'profile',
      menuItemPath: '/profile',
    },

    {
      id:4, 
      menuItemIcon:  <ClipboardPenLine className="w-[18px] h-[18px]"/>,
      menuItemName: 'Forms',
      menuItemIncludes: 'forms',
      menuItemPath: '',
      subMenuItem: [
        { id: 21, subMenuItemName: 'Form Elements', subMenuItemPath:'/forms/form-elements' },
        { id: 22, subMenuItemName: 'Form Layout', subMenuItemPath:'/forms/form-layout' },
        { id: 23, subMenuItemName: 'Form Layout 2', subMenuItemPath:'/forms/form-layout-2' },
        { id: 24, subMenuItemName: 'Form Layout 3', subMenuItemPath:'/forms/form-layout-3' },
      ]
    },
    { 
      id:5, 
      menuItemIcon:  <Sheet className="w-[18px] h-[18px]"/>,
      menuItemName: 'Tables',
      menuItemIncludes: 'tables',
      menuItemPath: '/tables',
    },

    { 
      id:6, 
      menuItemIcon:  <Settings className="w-[18px] h-[18px]"/>,
      menuItemName: 'Settings',
      menuItemIncludes: 'settings',
      menuItemPath: '/settings',
    },
  ]


  const sidebarOtherItems = [

    { 
      menuItemIcon:  <PieChart className="w-[18px] h-[18px]"/>, 
      menuItemName: 'Chart', 
      menuItemIncludes:'chart',
      menuItemPath:'/chart',

    },
    {
      menuItemIcon:  <LayoutTemplate className="w-[18px] h-[18px]"/>,
      menuItemName: 'UI',
      menuItemIncludes: 'ui',
      menuItemPath: '',
      subMenuItem: [
        { id: 31, subMenuItemName: 'Alerts', subMenuItemPath:'/ui/alerts' },
        { id: 32, subMenuItemName: 'Buttons', subMenuItemPath:'/ui/buttons' },
      ]
    },
    {
      menuItemIcon:  <LucideFingerprint className="w-[18px] h-[18px]"/>,
      menuItemName: 'Authentication',
      menuItemPath: '',
      menuItemIncludes: 'auth',
      subMenuItem: [
        { id: 41, subMenuItemName: 'Sign In', subMenuItemPath:'/auth/signin' },
        { id: 42, subMenuItemName: 'Sign Up', subMenuItemPath:'/auth/signup' },
      ]
    }

  ]



  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-slate-900 dark:bg-slate-900 lg:static lg:translate-x-0 
      transition-all duration-700 ease-in-out 
      ${
        sidebarOpen ? "translate-x-0 lg:w-[50px] " : " -translate-x-full "
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className='flex items-center justify-between gap-2 px-2 py-5.5 lg:py-5.5'>
        <div className={`flex 
        
          ${ !sidebarOpen && 'ml-4 px-0 py-0'

        }`}>
        <Link href="/">
          <div className={`${
              sidebarOpen && "lg:mx-auto"
            } w-[40px] h-[40px] overflow-hidden rounded-[15%]`}>
          <Image
            className={`${
              sidebarOpen && "lg:w-[35px] lg:-[35px] lg:rounded-[15%]"
            }`}
            width={50}
            height={50}
            src={nextLogo}
            alt="Logo"
          />
          </div>
        </Link>
            <h1 className={`ml-2 text-[16px] mt-2 font-medium text-white
              ${
                sidebarOpen && "block lg:hidden"
              }
            `}>
              Admin Dashboard
            </h1>
        </div>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className={`${sidebarOpen && 'block lg:hidden'} hover:text-white`}
        >
          <ArrowLeftToLine />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className={`no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear`}>
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-0 px-2 py-4 lg:px-2">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className={`mb-4 ml-4 text-sm font-semibold text-bodydark2
            ${sidebarOpen && "lg:hidden"}
            `}>
              MENU
            </h3>

            <SidebarMenuItems 
            sidebarMenuItemsData = {sidebarMenuItems}
            sidebarOpen = {sidebarOpen}
            setSidebarOpen = {setSidebarOpen}
            />

          </div>
          {/* end Menu Group */}

          {/* <!-- Others Group --> */}
          <div>
            <h3 className={`mb-4 ml-4 text-sm font-semibold text-bodydark2
            ${sidebarOpen && "lg:hidden"}
            `}>
              OTHER
            </h3>

            <SidebarMenuItems 
            sidebarMenuItemsData = {sidebarOtherItems}
            sidebarOpen = {sidebarOpen}
            setSidebarOpen = {setSidebarOpen}
            />

          </div>
          {/* end Other Group */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
