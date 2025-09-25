import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import allShippingInstructions from '@/constants/shippingInstruction';
import { cn } from '@/lib/utils';
export default function ShippingInstructionTab({ shippingInstructionIds }) {
    const { t } = useTranslation();

    const DetailItem = ({ label, value, className = '' }) => (
        <div className={cn("flex justify-between text-sm detailItem", className)}>
            <span className="text-muted-foreground">{label}:</span>
            <span className="font-medium text-right text-nowrap pl-2">{value ?? '-'}</span>
        </div>
    );

    const colsClasssNames = "w-full flex justify-between gap-x-8";
    const deviderClassNames = "flex flex-col justify-stretch items-center w-[1px]";
    const deviderInnerClassNames = "w-1 h-full border-l border-primary/50";

    const instructions = allShippingInstructions.filter(inst => shippingInstructionIds.includes(inst.id));

    if (!instructions || instructions.length === 0) {
        return <p className="text-muted-foreground">{t('bookings.details.noShippingInstruction')}</p>;
    }

    const getValueByPath = (obj, path) => {
        return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
    };

    const detailColumns = [
        [
            { label: t('bookings.shipping.shipper.company'), path: 'shipper.company' },
            { label: t('bookings.shipping.shipper.firstName'), path: 'shipper.firstName' },
            { label: t('bookings.shipping.shipper.lastName'), path: 'shipper.lastName' },
        ],
        [
            { label: t('bookings.shipping.shipper.country'), path: 'shipper.country' },
            { label: t('bookings.shipping.shipper.city'), path: 'shipper.city' },
            { label: t('bookings.shipping.shipper.address'), path: 'shipper.address' },
        ],
        [
            { label: t('bookings.shipping.shipper.postalCode'), path: 'shipper.postalCode' },
            { label: t('bookings.shipping.bookingParty'), path: 'bookingParty' },
            { label: t('bookings.shipping.consignee'), path: 'consignee' },
        ],
        [
            { label: t('bookings.shipping.freightForwarder'), path: 'freightForwarder' },
            { label: t('bookings.shipping.agent'), path: 'agent' },
            { label: t('bookings.shipping.freelancer'), path: 'freelancer' },
            { label: t('bookings.shipping.notifyParty'), path: 'notifyParty', className: 'w-full' },
        ],
    ];

    const containerColumns = [
        { key: 'containerNumber', label: t('bookings.shipping.containerNumber') },
        { key: 'kindOfPackages', label: t('bookings.shipping.kindOfPackages') },
        { key: 'quantityOfPackages', label: t('bookings.shipping.quantityOfPackages') },
        { key: 'netWeight', label: t('bookings.shipping.netWeight') },
        { key: 'grossWeight', label: t('bookings.shipping.grossWeight') },
        { key: 'imoClass', label: t('bookings.shipping.imoClass') },
        { key: 'grossVolume', label: t('bookings.shipping.grossVolume') },
        { key: 'setPoint', label: t('bookings.shipping.setPoint') },
        { key: 'ventilation', label: t('bookings.shipping.ventilation') },
        { key: 'dehumidification', label: t('bookings.shipping.dehumidification') },
        { key: 'o2', label: t('bookings.shipping.o2') },
        { key: 'co2', label: t('bookings.shipping.co2') },
        { key: 'cargoDescription', label: t('bookings.shipping.cargoDescription') },
    ];

    return (
        <div>
            {instructions.map((inst) => (
                <React.Fragment
                    key={inst.id}
                >
                    {/* General Info (Column-like) */}
                    <div className={colsClasssNames}>
                        {detailColumns.map((column, columnIndex) => (
                            <React.Fragment key={columnIndex}>
                                <div className='w-full'>
                                    {column.map((item, idx) => (
                                        <DetailItem
                                            key={idx}
                                            label={item.label}
                                            value={getValueByPath(inst, item.path)}
                                            className={item.className || ''}
                                        />
                                    ))}
                                </div>
                                {columnIndex < detailColumns.length - 1 && (
                                    <div className={deviderClassNames}>
                                        <div className={deviderInnerClassNames} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Container Table */}
                    <div className="space-y-4 w-full mt-4 pt-4 border-t border-primary/50">
                        <Table className={'overflow-hidden w-full cursor-default text-sm rounded-md'}>
                            <TableHeader className={'border-b'}>
                                <TableRow>
                                    {containerColumns.map(col => (
                                        <TableHead key={col.key}>{col.label}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inst.containers.map((c, i) => (
                                    <TableRow key={i}>
                                        {containerColumns.map(col => (
                                            <TableCell key={col.key}>{c[col.key]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}