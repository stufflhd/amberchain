import React from 'react';
import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import allDocuments from '@/constants/documents.json';

export default function DocumentsTab({ documentIds }) {
    const { t } = useTranslation();

    const documents = allDocuments.filter(d => documentIds.includes(d.id));

    if (documents.length === 0) {
        return <p className="text-muted-foreground">{t('bookings.details.noDocuments')}</p>;
    }

    const columns = [
        { key: 'documentName', label: t('bookings.documents.documentName') },
        { key: 'upload', label: t('bookings.documents.upload') },
        { key: 'status', label: t('bookings.documents.status') },
        { key: 'deadline', label: t('bookings.documents.deadline') },
        { key: 'preview', label: t('bookings.documents.preview') },
        { key: 'comments', label: t('bookings.documents.comments') },
    ];

    const getCellValue = (doc, key) => {
        if (key === 'preview') {
            return doc.preview || '-';
        }
        return doc[key];
    };

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
                    {documents.map((doc) => (
                        <TableRow key={doc.id}>
                            {columns.map(col => (
                                <TableCell key={col.key}>{getCellValue(doc, col.key)}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}