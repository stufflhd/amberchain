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
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('bookings.equipment.containerNo')}</TableHead>
                        <TableHead>{t('bookings.equipment.size')}</TableHead>
                        <TableHead>{t('bookings.equipment.type')}</TableHead>
                        <TableHead>{t('bookings.equipment.status')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {equipment.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.containerNo}</TableCell>
                            <TableCell>{item.size}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}