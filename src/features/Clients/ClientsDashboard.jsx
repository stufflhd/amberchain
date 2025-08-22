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
        <article className="p-4 gap-8 h-full flex flex-col">
            <div className='gap-4 flex flex-col'>
                <DashNav />
                <DashboardSearch />
            </div>
            <section className='grid grid-cols-12 h-full gap-8' ref={sectionRef}>
                {/* Map */}
                <ClientsDashboardMap />
                {/* Widgets */}
                <ClientsDashboardWidgets maxHeight={height} />
            </section>
        </article>
    )
}
