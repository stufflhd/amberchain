import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { widgetsConfig } from '@/constants/widgetsConfig'
import AlertIcon from '@/components/icons/AlertIcon '
import { AnimatedList } from '@/components/magicui/animated-list'
import { TriangleAlert } from 'lucide-react'

function WidgetCard({ to, icon: Icon, title }) {
    return (
        <Link to={to} className="w-1/2 h-full group">
            <Card className="@container/card transition-all duration-200 hover:!from-primary/10 h-full flex items-center justify-center gap-2 flex-col wgt">
                <div className="min-h-14">
                    <Icon size={48} className="w-12 h-12 group-hover:!w-14 group-hover:!h-14 transition-all duration-300" />
                </div>
                <CardTitle>{title}</CardTitle>
                <p className="muted">Card Content</p>
            </Card>
        </Link>
    )
}

export default function ClientsDashboardWidgets({ className = '', maxHeight = '' }) {
    const [alerts, setAlerts] = useState([])

    useEffect(() => {
        setTimeout(() => {
            setAlerts(Array(3).fill('Alert Content'))
        }, 10)
    }, [])

    return (
        <aside
            className={cn(
                `col-span-4 flex flex-wrap grid-cols-2 [&_.wgt]:from-primary/5 [&_.wgt]:to-card [&_.wgt]:bg-gradient-to-t [&_.wgt]:shadow-xs`,
                className
            )}
            style={{ maxHeight: `${maxHeight}px` }}
        >
            {widgetsConfig.map((row, rowIdx) => (
                <div key={rowIdx} className={cn('flex flex-nowrap w-full h-1/3 gap-4', rowIdx > 0 && 'pt-4')}>

                    {row.map((widget, i) => (
                        <div key={i} className="contents">
                            <WidgetCard {...widget} />
                            {rowIdx === 0 && i === 0 && (
                                <Link to={'alerts'} className="w-1/2 h-full group">
                                    <Card className="h-full group wgt gap-0 max-h-full w-full p-4 pb-0 after:absolute after:w-full after:bottom-0 after:left-0 after:h-1/3 after:bg-gradient-to-t after:from-sidebar-primary-foreground after:to-transparent after:rounded-xl relative">
                                        <div className="flex flex-row justify-between gap-2 items-center">
                                            <CardHeader className="p-0 w-full items-center">
                                                <CardTitle>Alerts</CardTitle>
                                            </CardHeader>
                                            <AlertIcon className="size-14 group-hover:animate-swing" />
                                        </div>
                                        <AnimatedList className='justify-center items-center text-center w-fit mt-auto mr-auto min-h-36'>
                                            {alerts.map((content, i) => (
                                                <CardDescription key={i} className='text-sm flex gap-2 text-start items-center'>
                                                    <TriangleAlert className='stroke-secondary size-5' />
                                                    <div className='flex flex-col g-1'>
                                                        <span className=' text-foreground leading-4'>
                                                            {content}
                                                        </span>
                                                        <small>desc</small>
                                                    </div>
                                                </CardDescription>
                                            ))}
                                        </AnimatedList>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    ))}

                </div>
            ))}


        </aside>
    )
}