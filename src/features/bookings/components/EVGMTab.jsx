import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import allEVGM from '@/constants/evgm.json';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function EVGMTab({ evgmIds }) {
    const { t } = useTranslation();
    const evgm = allEVGM.filter(e => evgmIds.includes(e.id));

    if (evgm.length === 0) {
        return <p className="text-muted-foreground">{t('bookings.details.noEVGM')}</p>;
    }

    return (
        <div className="space-y-4">
            <Table className={'rounded-md overflow-hidden w-full cursor-default'}>
                <TableHeader className={'border-b border-primary/50'}>
                    <TableRow>
                        <TableHead>{t('bookings.evgm.containerNumber')}</TableHead>
                        <TableHead>{t('bookings.evgm.tare')}</TableHead>
                        <TableHead>{t('bookings.evgm.grossWeight')}</TableHead>
                        <TableHead>{t('bookings.evgm.totalGrossWeight')}</TableHead>
                        <TableHead>{t('bookings.evgm.preview')}</TableHead>
                        <TableHead>{t('bookings.evgm.status')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {evgm.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.containerNumber}</TableCell>
                            <TableCell>{item.tare}</TableCell>
                            <TableCell>{item.grossWeight}</TableCell>
                            <TableCell>{item.totalGrossWeight}</TableCell>
                            <TableCell>{item.preview}</TableCell>
                            <TableCell>{item.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center gap-2">
                <Checkbox type="checkbox" id="certify" />
                <Label htmlFor="certify">{t('bookings.evgm.certify')}</Label>
            </div>
        </div>
    );
}