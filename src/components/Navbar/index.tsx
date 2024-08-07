import React, { useState } from 'react'
import DropdownNotification from './DropdownNofications'
import DropdownMessage from './DropdownMessage'
import DropdownUser from './DropdownUser'
import DarkModeSwitcher from './DarkModeSwitcher'
import HamburgerButton from './HamburgerButton'
import { jwtDecode } from "jwt-decode";


const Navbar = ( props:any) => {

  let userId = '';
  let username = '';

  if (props.authToken) {
    try {
      const decoded: any = jwtDecode(props.authToken);
      userId = decoded.userId || '';
      username = decoded.username || '';
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }

  console.log("fromt token::: "+userId+"-----"+username)


  return (
    <div className='sticky w-full bg-zinc-100 border-b-zinc-200 py-3 lg:pr-10 shadow z-999 top-0 dark:bg-slate-800'>
      <div
        className={` ${!props.sidebarOpen && "left-2"} flex flex-grow lg:items-start justify-between 2xl:pl-1 px-4 py-0 lg:px-4 md:px-4 2xl:px-10`}>

        <div className={`flex items-center`}>

          <HamburgerButton
            openBar={props.sidebarOpen}
            setOpenBar={props.setSidebarOpen}
           />
          {/* <!-- Hamburger Toggle BTN --> */}
        </div>

        <div className="flex items-center gap-6 ml-auto">
          <ul className="flex items-center gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser userId={userId} usernameFromToken={username} authToken={props.authToken}/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
