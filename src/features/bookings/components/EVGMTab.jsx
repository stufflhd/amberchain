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

    const columns = [
        { key: 'containerNumber', label: t('bookings.evgm.containerNumber') },
        { key: 'tare', label: t('bookings.evgm.tare') },
        { key: 'grossWeight', label: t('bookings.evgm.grossWeight') },
        { key: 'totalGrossWeight', label: t('bookings.evgm.totalGrossWeight') },
        { key: 'preview', label: t('bookings.evgm.preview') },
        { key: 'status', label: t('bookings.evgm.status') },
    ];

    return (
        <div className="space-y-4">
            <Table className={'rounded-md overflow-hidden w-full cursor-default text-sm'}>
                <TableHeader className={'border-b border-primary/50'}>
                    <TableRow>
                        {columns.map(col => (
                            <TableHead key={col.key}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {evgm.map((item) => (
                        <TableRow key={item.id}>
                            {columns.map(col => (
                                <TableCell key={col.key}>{item[col.key]}</TableCell>
                            ))}
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