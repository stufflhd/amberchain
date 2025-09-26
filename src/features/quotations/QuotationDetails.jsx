import { memo, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import BookingRoute from "@/features/bookings/components/BookingRoute";
import { Button } from "@/components/ui/button";
import CostBreakdownTab from "./components/CostBreakdownTab";
import ConditionsTab from "./components/ConditionsTab";

function QuotationDetails({ quotation }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('cost');

    const tabs = useMemo(() => [
        { id: "cost", label: t('quotations.tabs.cost'), component: <CostBreakdownTab costBreakdown={quotation.costBreakdown} t={t} /> },
        { id: "conditions", label: t('quotations.tabs.conditions'), component: <ConditionsTab conditions={quotation.conditions} t={t} /> }
    ], [t, quotation]);

    return (
        <article className="p-2 sm:p-6 space-y-8 w-full">
            <div className="space-y-4">
                <ToggleGroup
                    type="single"
                    variant="outline"
                    value={activeTab}
                    onValueChange={(v) => v && setActiveTab(v)}
                >
                    {tabs.map(tab => (
                        <ToggleGroupItem key={tab.id} value={tab.id} className={'bg-background'}>
                            {tab.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                {tabs.find(tab => tab.id === activeTab)?.component}
            </div>

            <section className="space-y-4 p-4 sm:p-6 border-t border-border">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-xl">{t('quotations.route')}</h3>
                        <BookingRoute route={quotation.route} />
                    </div>
                    <div className="text-right">
                        <div className="text-muted-foreground text-sm">{t('quotations.totalBreakdown')}</div>
                        <div className="font-bold text-xl">{`USD ${quotation.costBreakdown.total}`}</div>
                    </div>
                    <Button>{t('quotations.bookNow')}</Button>
                </div>
            </section>
        </article>
    );
}

export default memo(QuotationDetails);