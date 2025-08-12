import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards({ items = [] }) {
  return items.length > 0
    ?
    (
      <section className="grid grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card gap-2 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {items.map(({ description, title, trend, Icon}, idx) => (
          <Card key={idx} className="@container/card p-4 pb-3">
            <CardHeader className={'p-0'}>
              <CardDescription>{description}</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {title}
              </CardTitle>
              <CardAction>
                <Badge variant="outline" className={'leading-5'}>
                  <Icon size={4} />
                  {trend}
                </Badge>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </section>
    )
    :
    null

}
