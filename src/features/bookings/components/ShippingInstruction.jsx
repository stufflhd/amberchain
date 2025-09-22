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

    return (
        <div>
            {instructions.map((inst) => (
                <React.Fragment
                    key={inst.id}
                // className="rounded-lg flex flex-row justify-between items-stretch gap-x-8"
                >
                    {/* General Info (Column-like) */}
                    <div className={colsClasssNames}>
                        <div className='w-full'>
                            <DetailItem label={t('bookings.shipping.shipper.company')} value={inst.shipper.company} />
                            <DetailItem label={t('bookings.shipping.shipper.firstName')} value={inst.shipper.firstName} />
                            <DetailItem label={t('bookings.shipping.shipper.lastName')} value={inst.shipper.lastName} />
                        </div>
                        {/* Devider */}
                        <div className={deviderClassNames}>
                            <div className={deviderInnerClassNames} />
                        </div>
                        <div className='w-full'>
                            <DetailItem label={t('bookings.shipping.shipper.country')} value={inst.shipper.country} />
                            <DetailItem label={t('bookings.shipping.shipper.city')} value={inst.shipper.city} />
                            <DetailItem label={t('bookings.shipping.shipper.address')} value={inst.shipper.address} />
                        </div>
                        {/* Devider */}
                        <div className={deviderClassNames}>
                            <div className={deviderInnerClassNames} />
                        </div>
                        <div className='w-full'>
                            <DetailItem label={t('bookings.shipping.shipper.postalCode')} value={inst.shipper.postalCode} />
                            <DetailItem label={t('bookings.shipping.bookingParty')} value={inst.bookingParty} />
                            <DetailItem label={t('bookings.shipping.consignee')} value={inst.consignee} />
                        </div>
                        {/* Devider */}
                        <div className={deviderClassNames}>
                            <div className={deviderInnerClassNames} />
                        </div>
                        <div className='w-full'>
                            <DetailItem label={t('bookings.shipping.freightForwarder')} value={inst.freightForwarder} />
                            <DetailItem label={t('bookings.shipping.agent')} value={inst.agent} />
                            <DetailItem label={t('bookings.shipping.freelancer')} value={inst.freelancer} />
                        </div>
                    </div>
                    <div className='w-full flex justify-between gap-x-16'>
                        <DetailItem className='w-full' label={t('bookings.shipping.notifyParty')} value={inst.notifyParty} />
                        {
                            Array.from({ length: 2 }).map((_, i) => (
                                <div key={i} className='w-full' />
                            ))
                        }
                        <div className='w-full'></div>
                        <div className='w-full'></div>
                    </div>

                    {/* Container Table */}
                    <div className="space-y-4 w-full mt-4">
                        <Table className={'rounded-md overflow-hidden w-full cursor-default'}>
                            <TableHeader className={'border-b border-primary/50'}>
                                <TableRow>
                                    <TableHead>{t('bookings.shipping.containerNumber')}</TableHead>
                                    <TableHead>{t('bookings.shipping.kindOfPackages')}</TableHead>
                                    <TableHead>{t('bookings.shipping.quantityOfPackages')}</TableHead>
                                    <TableHead>{t('bookings.shipping.netWeight')}</TableHead>
                                    <TableHead>{t('bookings.shipping.grossWeight')}</TableHead>
                                    <TableHead>{t('bookings.shipping.imoClass')}</TableHead>
                                    <TableHead>{t('bookings.shipping.grossVolume')}</TableHead>
                                    <TableHead>{t('bookings.shipping.setPoint')}</TableHead>
                                    <TableHead>{t('bookings.shipping.ventilation')}</TableHead>
                                    <TableHead>{t('bookings.shipping.dehumidification')}</TableHead>
                                    <TableHead>{t('bookings.shipping.o2')}</TableHead>
                                    <TableHead>{t('bookings.shipping.co2')}</TableHead>
                                    <TableHead>{t('bookings.shipping.cargoDescription')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inst.containers.map((c, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{c.containerNumber}</TableCell>
                                        <TableCell>{c.kindOfPackages}</TableCell>
                                        <TableCell>{c.quantityOfPackages}</TableCell>
                                        <TableCell>{c.netWeight}</TableCell>
                                        <TableCell>{c.grossWeight}</TableCell>
                                        <TableCell>{c.imoClass}</TableCell>
                                        <TableCell>{c.grossVolume}</TableCell>
                                        <TableCell>{c.setPoint}</TableCell>
                                        <TableCell>{c.ventilation}</TableCell>
                                        <TableCell>{c.dehumidification}</TableCell>
                                        <TableCell>{c.o2}</TableCell>
                                        <TableCell>{c.co2}</TableCell>
                                        <TableCell>{c.cargoDescription}</TableCell>
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