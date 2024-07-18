import React from 'react'

const Title = ({
title
} : {
title:string
}) => {
  return (
    <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
   {title}
  </h3>
  )
}

export default Title
