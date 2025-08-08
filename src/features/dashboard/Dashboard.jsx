import { SectionCards } from '@/components/dashboard/section-cards'
import React from 'react'
import { DataTable } from '@/app/payments/data-table';
import { columns } from '@/app/payments/columns';
export default function Dashboard() {
  const data = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "5655re954",
      amount: 65,
      status: "pending",
      email: "mklm@example.com",
    },
    {
      id: "gf65gs",
      amount: 367,
      status: "pending",
      email: "juim@mail.com",
    },
  ]
  return (
    <article className='p-4 space-y-4'>
      <SectionCards />
      <DataTable columns={columns} data={data} />
    </article>
  )
}
