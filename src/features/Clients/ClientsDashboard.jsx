import DashboardSearch from '@/components/dashboard/DashboardSearch'
import DashNav from '@/components/dashboard/DashNav'
import ClientsDashboardMap from './components/ClientsDashboardMap'
import ClientsDashboardWidgets from './components/ClientsDashboardWidgets'
import { useEffect, useRef, useState } from 'react';

export default function ClientsDashboard() {

    const [height, setheight] = useState('');
    const sectionRef = useRef(null);
    useEffect(() => {
        const ht = sectionRef.current.clientHeight;
        setheight(ht);
    }, [])

    return (
        <>
            <div className='gap-4 flex flex-col'>
                <DashNav DashTitle='Welcome Back ! &nbsp; You have the Conn'/>
                <DashboardSearch />
            </div>
            <section className='flex flex-col md:grid grid-cols-12 h-full gap-8' ref={sectionRef}>
                <ClientsDashboardMap className='md:col-span-7 2xl:col-span-8 flex flex-col gap-4' />
                <ClientsDashboardWidgets maxHeight={height} className='md:col-span-5 2xl:col-span-4' />
            </section>
        </>
    )
}
