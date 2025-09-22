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

    return (
        <div className="rounded-md _border border-primary/50 overflow-hidden">
            <Table className={'w-full cursor-default'}>
                <TableHeader className={'border-b border-primary/50'}>
                    <TableRow>
                        <TableHead>{t('bookings.documents.documentName')}</TableHead>
                        <TableHead>{t('bookings.documents.upload')}</TableHead>
                        <TableHead>{t('bookings.documents.status')}</TableHead>
                        <TableHead>{t('bookings.documents.deadline')}</TableHead>
                        <TableHead>{t('bookings.documents.preview')}</TableHead>
                        <TableHead>{t('bookings.documents.comments')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.documentName}</TableCell>
                            <TableCell>{doc.upload}</TableCell>
                            <TableCell>{doc.status}</TableCell>
                            <TableCell>{doc.deadline}</TableCell>
                            <TableCell>{doc.preview || '-'}</TableCell>
                            <TableCell>{doc.comments}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}