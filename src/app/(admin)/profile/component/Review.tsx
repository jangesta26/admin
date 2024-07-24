import React from 'react'

const Review = () => {
  return (
    <div className="mx-auto mb-5.5 mt-4.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
        <span className="font-semibold text-black dark:text-white">
            259
        </span>
        <span className="text-sm">Posts</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
        <span className="font-semibold text-black dark:text-white">
            129K
        </span>
        <span className="text-sm">Followers</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 px-4 xsm:flex-row">
        <span className="font-semibold text-black dark:text-white">
            2K
        </span>
        <span className="text-sm">Following</span>
        </div>
    </div>
  )
}

export default Review
