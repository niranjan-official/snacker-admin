import Link from 'next/link'
import React from 'react'
import { GrMoney } from "react-icons/gr";

const PaymentsBlock = () => {
  return (
    <Link href={'/menu/payments'} className='w-full flex justify-between bg-dark-100 rounded-lg shadow shadow-blue-500 p-4'>
      <h3 className='text-neutral-50/80 font-semibold text-xl'>Today's Payments</h3>
      <GrMoney size={30} className='text-white/20' />
    </Link>
  )
}

export default PaymentsBlock
