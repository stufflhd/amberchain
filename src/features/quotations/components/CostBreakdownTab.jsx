import DetailItem from "./DetailItem";

export default function CostBreakdownTab({ costBreakdown, t }) {
    const costItems = [
        { label: t('quotations.costBreakdown.oceanFreight'), value: `USD ${costBreakdown.oceanFreight}` },
        { label: t('quotations.costBreakdown.includedCharges'), value: '' },
        { label: t('quotations.costBreakdown.chargesPayableAsPerFreight'), value: `USD ${costBreakdown.energyTransitionSurcharge + costBreakdown.lowSulfurSurcharge}` },
        { label: t('quotations.costBreakdown.energyTransitionSurcharge'), value: `USD ${costBreakdown.energyTransitionSurcharge}` },
        { label: t('quotations.costBreakdown.lowSulfurSurcharge'), value: `USD ${costBreakdown.lowSulfurSurcharge}` },
        { label: t('quotations.costBreakdown.chargesPayableAtImport'), value: `USD ${costBreakdown.ispsFee}` },
        { label: t('quotations.costBreakdown.ispsFee'), value: `USD ${costBreakdown.ispsFee}` },
        { label: t('quotations.costBreakdown.thcOrigin'), value: `USD ${costBreakdown.thcOrigin}` },
        { label: t('quotations.costBreakdown.thcDestination'), value: `USD ${costBreakdown.thcDestination}` },
        { label: t('quotations.costBreakdown.precarriage'), value: `USD ${costBreakdown.precarriage}` },
        { label: t('quotations.costBreakdown.oncarriage'), value: `USD ${costBreakdown.oncarriage}` },
        { label: t('quotations.costBreakdown.customsBrokerage'), value: `USD ${costBreakdown.customsBrokerage}` },
        { label: t('quotations.costBreakdown.insurance'), value: `USD ${costBreakdown.insurance}` },
        { label: t('quotations.costBreakdown.certification'), value: `USD ${costBreakdown.certification}` },
    ];

    return (
        <>
            <div className="space-y-2 text-sm grid sm:grid-cols-3 justify-between items-stretch gap-x-8">
                {costItems.map((item, index) => (
                    <DetailItem key={index} label={item.label} value={item.value} />
                ))}
            </div>
            <DetailItem
                label={t('quotations.costBreakdown.totalPerContainer')}
                value={`USD ${costBreakdown.total}`}
                className="font-semibold text-base"
            />
            <div className="text-xs text-muted-foreground mt-6 space-y-1">
                <p>------------------------------------------------------------------</p>
                <p>{t('quotations.costBreakdown.surchargesCalculationNote', { date: costBreakdown.surchargesCalculationDate })}</p>
                <p>{t('quotations.costBreakdown.exchangeRateNote', { date: costBreakdown.exchangeRateDate })}</p>
                <p>{t('quotations.costBreakdown.subjectToNote', { details: costBreakdown.subjectTo })}</p>
            </div>
        </>
    );
}


