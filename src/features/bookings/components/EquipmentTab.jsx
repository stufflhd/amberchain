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

    const columns = [
        { key: 'containerNo', label: t('bookings.equipment.containerNo') },
        { key: 'size', label: t('bookings.equipment.size') },
        { key: 'type', label: t('bookings.equipment.type') },
        { key: 'sealNo', label: t('bookings.equipment.sealNo') },
        { key: 'status', label: t('bookings.equipment.status') },
        { key: 'pickUpDate', label: t('bookings.equipment.pickUpDate') },
        { key: 'preferredDepot', label: t('bookings.equipment.preferredDepot') },
        { key: 'truckProvider', label: t('bookings.equipment.truckProvider') },
        { key: 'truckId', label: t('bookings.equipment.truckId') },
        { key: 'stuffingDate', label: t('bookings.equipment.stuffingDate') },
        { key: 'truckSealingWindow', label: t('bookings.equipment.truckSealingWindow') },
    ];

    return (
        <div className="rounded-md _border border-primary/50 overflow-hidden">
            <Table className={'w-full cursor-default text-sm'}>
                <TableHeader className={'border-b border-primary/50'}>
                    <TableRow>
                        {columns.map(col => (
                            <TableHead key={col.key}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipment.map((item) => (
                        <TableRow key={item.id}>
                            {columns.map(col => (
                                <TableCell key={col.key}>{item[col.key]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
