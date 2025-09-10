import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import ContainerIcon from '@/components/icons/ContainerIcon';
import { formatDisplayDate } from '../utils/shipmentsUtils';
import { cn } from '@/lib/utils';

const detailItemClass = 'flex flex-col px-4 border-l border-primary justify-between';


const DataPoint = memo(({ label, value }) => {
    if (!value) return null;
    return (
        <div className={detailItemClass}>
            <small className="text-muted-foreground">{label}</small>
            <p>{value}</p>
        </div>
    );
});
DataPoint.displayName = 'DataPoint';

const MainInfo = memo(({ container, t }) => (
    <div className="flex flex-wrap gap-y-4 gap-x-2 z-10 relative">
        <div className={detailItemClass}>
            <small className="text-muted-foreground">{container.type}</small>
            <p className="font-bold text-lg">{container.id}</p>
        </div>
        <div className={detailItemClass}>
            <small className="text-muted-foreground">{container.status}</small>
            <p className="">{formatDisplayDate(container.timestamp)}</p>
        </div>
        <DataPoint label={t('containers.location')} value={container.location} />
        <DataPoint label={t('containers.seal')} value={container.seal} />
        <DataPoint label={t('containers.truckId')} value={container.truckId} />
        <DataPoint label={t('containers.driverNumber')} value={container.driverNumber} />
        <DataPoint label={t('containers.setPoint')} value={container.setPoint} />
        <DataPoint label="BL Info" value={container.blInfo} />
        <DataPoint label={t('containers.otherInfo')} value={container.otherInfo} />
    </div>
));
MainInfo.displayName = 'MainInfo';

const CommodityDetails = memo(({ details, t }) => {
    if (!details) return null;
    return (
        <div className="z-10 relative mt-4 pt-4 border-t">
            <h4 className="font-semibold mb-2">{t('containers.commodityDetails')}</h4>
            <div className="flex flex-wrap gap-y-4 gap-x-2">
                <DataPoint label={t('containers.commodity')} value={details.commodity} />
                <DataPoint label={t('containers.package')} value={details.package} />
                <DataPoint label={t('containers.cargoWeight')} value={details.cargoWeight} />
                <DataPoint label={t('containers.dimensions')} value={details.dimensions} />
                <DataPoint label={t('containers.barcode')} value={details.barcode} />
            </div>
        </div>
    );
});
CommodityDetails.displayName = 'CommodityDetails';

const Actions = memo(({ allowedActions, t }) => {
    const labels = React.useMemo(() => ({
        track_live: t('actions.trackLive'),
        plan_delivery: t('actions.planDelivery'),
        plan_pickup: t('actions.planPickup'),
        set_point: t('actions.setPoint'),
    }), [t]);

    if (!allowedActions || allowedActions.length === 0) return null;

    return (
        <div className="z-10 relative mt-4 [&_button]:mb-[1px] flex items-center gap-2">
            {allowedActions.map((actionKey) => (
                <Button key={actionKey} variant="outline" size="sm" className={'rounded-full'}>
                    {labels[actionKey] || actionKey}
                </Button>
            ))}
        </div>
    );
});
Actions.displayName = 'Actions';

const ContainerDetails = memo(({ container, className }) => {
    const { t } = useTranslation();

    if (!container) return null;

    return (
        <div className={cn("", className)}>
            <MainInfo container={container} t={t} />
            <CommodityDetails details={container.commodityDetails} t={t} />
            <Actions allowedActions={container.allowedActions} t={t} />
        </div>
    );
});

ContainerDetails.displayName = 'ContainerDetails';

export default ContainerDetails;