import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const IconTrendingDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trending-down">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 7l6 6l4 -4l8 8" />
    <path d="M21 10l0 7l-7 0" />
  </svg>
)

const IconTrendingUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trending-up">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 17l6 -6l4 4l8 -8" />
    <path d="M14 7l7 0l0 7" />
  </svg>
)

const cardData = [
  {
    description: "Total Revenue",
    title: "$1,250.00",
    trend: "+12.5%",
    Icon: IconTrendingUp,
    footerMain: "Trending up this month",
    footerSub: "Visitors for the last 6 months",
  },
  {
    description: "New Customers",
    title: "1,234",
    trend: "-20%",
    Icon: IconTrendingDown,
    footerMain: "Down 20% this period",
    footerSub: "Acquisition needs attention",
  },
  {
    description: "Active Accounts",
    title: "45,678",
    trend: "+12.5%",
    Icon: IconTrendingUp,
    footerMain: "Strong user retention",
    footerSub: "Engagement exceed targets",
  },
  {
    description: "Growth Rate",
    title: "4.5%",
    trend: "+4.5%",
    Icon: IconTrendingUp,
    footerMain: "Steady performance increase",
    footerSub: "Meets growth projections",
  },
]

export function SectionCards() {
  return (
    <section className="grid grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardData.map(({ description, title, trend, Icon, footerMain, footerSub }, idx) => (
        <Card key={idx} className="@container/card">
          <CardHeader>
            <CardDescription>{description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {title}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <Icon />
                {trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {footerMain} <Icon className="size-4" />
            </div>
            <div className="text-muted-foreground">{footerSub}</div>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
