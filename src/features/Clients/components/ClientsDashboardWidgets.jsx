import { Card, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { widgetsConfig } from '@/constants/widgetsConfig'

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
            setAlerts(Array(5).fill('Alert Content'))
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
                        <WidgetCard key={i} {...widget} />
                    ))}
                </div>
            ))}

            {/* <Card className="group wgt gap-8 max-h-full w-1/2 p-4 pb-0 after:absolute after:w-full after:bottom-0 after:left-0 after:h-1/3 after:bg-gradient-to-t after:from-[#f3f5fb] after:to-transparent after:rounded-xl relative"> <div className="flex flex-row justify-between gap-2"> <CardHeader className="p-0 w-full"> <CardTitle>Alerts</CardTitle> <CardDescription>Card Description</CardDescription> </CardHeader> <AlertIcon className="size-8 group-hover:animate-swing" /> </div> <section className={'after:w-full mt-auto overflow-y-scroll w-full h-full max-h-full space-y-2 pb-16'}> { alerts.map((content, i) => ( <div key={i} className='border rounded-2xl bg-background w-full px-4 py-2'> {content} </div> )) } </section> </Card> */}
        </aside>
    )
}