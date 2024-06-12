'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail } from 'lucide-react'

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notifying, setNotifying] = useState(true)

  const trigger = useRef<any>(null)
  const dropdown = useRef<any>(null)

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



  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false)
          setDropdownOpen(!dropdownOpen)
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border-[0.5px] border-muted bg-muted text-muted-foreground hover:text-primary
        "
        href="#"
      >
        <span
          className={`z-1 bg-meta-1 absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full ${
            notifying === false ? 'hidden' : 'inline'
          }`}
        >
          <span className="-z-1 bg-meta-1 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
        </span>

        <Mail />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`w-75 absolute -right-17 mt-5 flex flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-700 px-2 sm:-right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <div className="px-2 py-2">
          <h5 className="text-bodydark2 text-sm font-medium">Messages</h5>
        </div>

        <ul className="flex gap-0 h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="gap-4 px-4 hover:bg-gray-2 flex border-t border-stroke py-3 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-16 w-16 rounded-full">
                <Image
                  width={200}
                  height={200}
                  src={'/images/user/user-02.png'}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="gap-4 px-4 hover:bg-gray-2 flex border-t border-stroke py-3 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-16 w-16 rounded-full">
                <Image
                  width={200}
                  height={200}
                  src={'/images/user/user-02.png'}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="gap-4 px-4 hover:bg-gray-2 flex border-t border-stroke py-3 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-16 w-16 rounded-full">
                <Image
                  width={200}
                  height={200}
                  src={'/images/user/user-02.png'}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
          <li>
            <Link
              className="gap-4 px-4 hover:bg-gray-2 flex border-t border-stroke py-3 dark:border-strokedark dark:hover:bg-meta-4"
              href="/messages"
            >
              <div className="h-16 w-16 rounded-full">
                <Image
                  width={200}
                  height={200}
                  src={'/images/user/user-02.png'}
                  alt="User"
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Mariya Desoja
                </h6>
                <p className="text-sm">I like your confidence 💪</p>
                <p className="text-xs">2min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  )
}

export default DropdownMessage
