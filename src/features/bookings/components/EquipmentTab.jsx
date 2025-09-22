import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import allEquipment from '@/constants/equipment.json';

export default function EquipmentTab({ equipmentIds }) {
    const { t } = useTranslation();
    const equipment = allEquipment.filter(e => equipmentIds.includes(e.id));

    if (equipment.length === 0) {
        return <p className="text-muted-foreground">{t('bookings.details.noEquipment')}</p>;
    }

    return (
        <div className="rounded-md _border border-primary/50 overflow-hidden">
            <Table className={'w-full cursor-default'}>
                <TableHeader className={'border-b border-primary/50'}>
                    <TableRow>
                        <TableHead>{t('bookings.equipment.containerNo')}</TableHead>
                        <TableHead>{t('bookings.equipment.size')}</TableHead>
                        <TableHead>{t('bookings.equipment.type')}</TableHead>
                        <TableHead>{t('bookings.equipment.sealNo')}</TableHead>
                        <TableHead>{t('bookings.equipment.status')}</TableHead>
                        <TableHead>{t('bookings.equipment.pickUpDate')}</TableHead>
                        <TableHead>{t('bookings.equipment.preferredDepot')}</TableHead>
                        <TableHead>{t('bookings.equipment.truckProvider')}</TableHead>
                        <TableHead>{t('bookings.equipment.truckId')}</TableHead>
                        <TableHead>{t('bookings.equipment.stuffingDate')}</TableHead>
                        <TableHead>{t('bookings.equipment.truckSealingWindow')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipment.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.containerNo}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.sealNo}</TableCell>
                            <TableCell>{item.status}</TableCell>
                            <TableCell>{item.pickUpDate}</TableCell>
                            <TableCell>{item.preferredDepot}</TableCell>
                            <TableCell>{item.truckProvider}</TableCell>
                            <TableCell>{item.truckId}</TableCell>
                            <TableCell>{item.stuffingDate}</TableCell>
                            <TableCell>{item.truckSealingWindow}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
