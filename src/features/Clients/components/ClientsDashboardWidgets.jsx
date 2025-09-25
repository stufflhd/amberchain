import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { widgetsConfig } from '@/constants/widgetsConfig'
import AlertIcon from '@/components/icons/AlertIcon '
import { AnimatedList } from '@/components/magicui/animated-list'
import { TriangleAlert } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function WidgetCard({ to, icon: Icon, title }) {
    const { t } = useTranslation();
    return (
        <Link to={to} className="w-full 2xl:w-1/2 h-full group">
            <Card className="@container/card [&_*]:text-center transition-all duration-200 hover:!from-primary/10 h-full flex items-center justify-center gap-2 flex-col wgt px-2 md:px-0">
                <div className="min-h-14">
                    <Icon size={48} className="w-10 h-10 lg:w-12 lg:h-12 group-hover:!w-12 group-hover:!h-12 lg:group-hover:!w-14 lg:group-hover:!h-14 transition-all duration-300" />
                </div>
                <CardTitle>{title}</CardTitle>
                <p className="muted">{t('widgets.cardContent')}</p>
            </Card>
        </Link>
    )
}

export default function ClientsDashboardWidgets({ className = '', maxHeight = '' }) {
    const [alerts, setAlerts] = useState([])
    const { t } = useTranslation();

    useEffect(() => {
        setTimeout(() => {
            setAlerts(Array(3).fill(t('widgets.alertItem')))
        }, 10)
    }, [])

    return (
        <aside
            className={cn(
                `flex flex-wrap [&_.wgt]:from-primary/5 [&_.wgt]:to-card [&_.wgt]:bg-gradient-to-t [&_.wgt]:shadow-xs`,
                className
            )}
            style={{ maxHeight: `${maxHeight}px` }}
        >
            {widgetsConfig.map((row, rowIdx) => (
                <div key={rowIdx} className={cn('flex md:flex-col 2xl:flex-row w-full 2xl:h-1/3 gap-4', rowIdx > 0 && 'pt-4')}>

                    {row.map((widget, i) => (
                        <div key={i} className="contents">
                            <WidgetCard {...widget} />
                            {rowIdx === 0 && i === 0 && (
                                <Link to={'alerts'} className="w-full 2xl:w-1/2 h-full group">
                                    <Card className="h-full group wgt gap-0 max-h-full w-full p-4 pb-0 after:absolute after:w-full after:bottom-0 after:left-0 after:h-1/3 after:bg-gradient-to-t after:from-sidebar-primary-foreground after:to-transparent after:rounded-xl relative">
                                        <div className="flex flex-row justify-between gap-2 items-center">
                                            <CardHeader className="p-0 w-full items-center">
                                                <CardTitle>{t('widgets.alertsTitle')}</CardTitle>
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
                                                        <small>{t('widgets.alertDescriptionShort')}</small>
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