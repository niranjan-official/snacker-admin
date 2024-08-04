import OrdersBlock from '@/components/menu/OrdersBlock'
import PaymentsBlock from '@/components/menu/PaymentsBlock'
import UsersBlock from '@/components/menu/UsersBlock'
import React from 'react'

const page = () => {
  return (
    <div className='w-full flex flex-col gap-5 p-5 px-6 pb-20 bg-dark-200'>
      <OrdersBlock/>
      <PaymentsBlock/>
      <UsersBlock/>
    </div>
  )
}

export default page
