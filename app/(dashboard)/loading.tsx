import React from 'react'
import { VscLoading } from 'react-icons/vsc'

const Loading = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <VscLoading size={25} className='text-blue-500 animate-spin' />
    </div>
  )
}

export default Loading
