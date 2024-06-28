'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Avatar, AvatarImage } from '@/components/ui/avartar'
import { Contact, LogOut, Settings, User, UserCog } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext';
import { Label } from '../ui/label'


const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [loggingOut, setLoggingOut] = useState(false); // State to track logout process

  const trigger = useRef<any>(null)
  const dropdown = useRef<any>(null)

  const { setColorMode } = useTheme();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!dropdownOpen || key !== 'Escape') return
      setDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })


 // Handle logout
 const handleLogout = async () => {
  setLoggingOut(true); // Set logging out state
  try {
    // Simulate logout process (replace with actual logout logic)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate asynchronous operation
    localStorage.removeItem('isLoggedIn');
    window.location.reload();
    setColorMode('light');
  } catch (error) {
    console.error('Error during logout:', error);
    // Handle logout error if needed
  } finally {
    setLoggingOut(false); // Reset logging out state
  }
};

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium capitalize text-black dark:text-white ">
            {username || 'Administrator'}
          </span>
          <span className="block text-xs">Admin</span>
        </span>
      
        <Avatar className='h-10 w-10 items-center justify-center rounded-full border-[0.5px]'>
          <AvatarImage src="/images/user/user-01.png"/>
          {/* <Label>AD</Label> */}
        </Avatar>

        <Settings className={`transition-all duration-200 ease-out ${
                        dropdownOpen && "rotate-180"}`} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4.5 flex w-64 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-700 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-6 dark:border-strokedark">
          <li>
            <Link
              href="/profile"
              className="flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <User/>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <Contact />
              My Contacts
            </Link>
          </li>
          <li>
            <Link
              href="/pages/settings"
              className="flex items-center gap-3.5 text-sm duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <UserCog />
              Account Settings
            </Link>
          </li>
        </ul>
        <div className='flex px-6 gap-4 w-full py-3 items-center text-sm duration-300 ease-in-out hover:text-primary lg:text-base'> 
        <LogOut />
          <button onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
       
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  )
}

export default DropdownUser
