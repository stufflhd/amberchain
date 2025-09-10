import { useTranslation } from 'react-i18next';
import { formatDisplayDate } from '../utils/bookingsUtils';
import i18n from '@/i18n';
import { cn } from '@/lib/utils';

const DetailItem = ({ label, value }) => {
    const isDate = typeof value === 'string' && value.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    const displayValue = isDate ? formatDisplayDate(value, { lang: i18n.language }) : (value || '-');

    return (
        <div className="flex justify-between text-sm py-1">
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium text-right text-nowrap pl-2">{displayValue}</span>
        </div>
    );
};

const GeneralInfoItem = ({ label, value }) => (
    <div className="flex flex-col py-1 text-sm">
        <span className="text-muted-foreground mb-1">{label}:</span>
        <p className="font-medium whitespace-pre-line">{value || '-'}</p>
    </div>
);


export default function DetailsTab({ booking }) {
    const { t } = useTranslation();
    const { info, shipping, general } = booking.details;
    const colsClasssNames = "space-y-2 w-full";
    const deviderClassNames = "flex flex-col justify-stretch items-center w-[1px]";
    const deviderInnerClassNames = "w-1 h-full border-l border-primary/50";
    return (
        <div className="rounded-lg flex flex-row justify-between items-stretch gap-x-8">
            {/* Column 1 */}
            <div className={cn(colsClasssNames)}>
                <DetailItem label={t('bookings.details.info.container')} value={info.container} />
                <DetailItem label={t('bookings.details.info.serviceAgreement')} value={info.serviceAgreement} />
                <DetailItem label={t('bookings.details.info.creationDate')} value={info.creationDate} />
                <DetailItem label={t('bookings.details.info.por')} value={info.por} />
                <DetailItem label={t('bookings.details.info.pol')} value={info.pol} />
                <DetailItem label={t('bookings.details.info.pod')} value={info.pod} />
                <DetailItem label={t('bookings.details.info.numberOfContainers')} value={info.numberOfContainers} />
                <DetailItem label={t('bookings.details.info.cutoffDate')} value={info.cutoffDate} />
                <DetailItem label={t('bookings.details.info.shippingInstructionsDeadline')} value={info.shippingInstructionsDeadline} />
                <DetailItem label={t('bookings.details.info.evgmDeadline')} value={info.evgmDeadline} />
                <DetailItem label={t('bookings.details.info.gateInDeadline')} value={info.gateInDeadline} />
            </div>

            {/* Devider */}
            <div className={cn(deviderClassNames)}>
                <div className={cn(deviderInnerClassNames)} />
            </div>

            {/* Column 2 */}
            <div className={cn(colsClasssNames)}>
                <DetailItem label={t('bookings.details.shipping.shippingLine')} value={shipping.shippingLine} />
                <DetailItem label={t('bookings.details.shipping.service')} value={shipping.service} />
                <DetailItem label={t('bookings.details.shipping.vesselName')} value={shipping.vesselName} />
                <DetailItem label={t('bookings.details.shipping.terminalOrigin')} value={shipping.terminalOrigin} />
                <DetailItem label={t('bookings.details.shipping.terminalDestination')} value={shipping.terminalDestination} />
                <DetailItem label={t('bookings.details.shipping.etd')} value={shipping.etd} />
                <DetailItem label={t('bookings.details.shipping.eta')} value={shipping.eta} />
                <DetailItem label={t('bookings.details.shipping.commodity')} value={shipping.commodity} />
                <DetailItem label={t('bookings.details.shipping.grossWeight')} value={shipping.grossWeight} />
            </div>

            {/* Devider */}
            <div className={cn(deviderClassNames)} >
                <div className={cn(deviderInnerClassNames)} />
            </div>

            {/* Column 3 */}
            <div className={cn(colsClasssNames)}>
                <h4 className='font-bold text-base'>{t('bookings.details.general.title')}</h4>
                <GeneralInfoItem label={t('bookings.details.general.servicesRequested')} value={general.servicesRequested} />
                <GeneralInfoItem label={t('bookings.details.general.comment')} value={general.comment} />
                <GeneralInfoItem label={t('bookings.details.general.additionalInfo')} value={general.additionalInfo} />
                <GeneralInfoItem label={t('bookings.details.general.terms')} value={general.terms} />
            </div>
        </div>
    );
}