import React from 'react'
import ShipmentContainerDetails from '../shipments/components/ContainerDetails'

export default function ContainerDetails({ containerObj }) {
    return (
        <section className='p-2 sm:p-6 space-y-4 sm:space-y-8 dashContentMax'>
            <ShipmentContainerDetails container={containerObj} />
        </section>
    )
}
