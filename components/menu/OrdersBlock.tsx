import Link from 'next/link'
import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";

const OrdersBlock = () => {
  return (
    <Link href={'/menu/orders'} className='w-full flex justify-between bg-dark-100 rounded-lg shadow shadow-blue-500 p-4'>
      <h3 className='text-neutral-50/80 font-semibold text-xl'>Today's Orders</h3>
      <TbTruckDelivery size={30} className='text-white/20' />
    </Link>
  )
}

export default OrdersBlock
