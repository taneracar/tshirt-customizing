import Image from 'next/image'
import React from 'react'

type props = {
    src:string
}
const CustomImage = ({src}:props) => {
  return (
    <Image src={src} width={1920} height={1080} className='w-full h-full rounded-4xl' alt={src}>
      
    </Image>
  )
}

export default CustomImage
