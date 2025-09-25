import React from 'react';
import { useTranslation } from 'react-i18next';
import allPayments from '@/constants/payment.json';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PaymentTab({ paymentIds }) {
    const { t } = useTranslation();
    const payments = allPayments.filter(p => paymentIds && paymentIds.includes(p.id));

    if (!payments || payments.length === 0) {
        return <p className="text-muted-foreground">{t('bookings.details.noPaymentInfo', 'No payment information available.')}</p>;
    }

    const payment = payments[0];

    const columns = [
        { key: 'googlePay', label: t('bookings.payment.googlePay', 'GooglePay') },
        { key: 'applePay', label: t('bookings.payment.applePay', 'ApplePay') },
        { key: 'card', label: t('bookings.payment.card', 'Card') },
        { key: 'invoicePayment', label: t('bookings.payment.invoice', 'Invoice Payment') },
        { key: 'status', label: t('bookings.payment.statusTitle', 'Payment Status') },
    ];

    return (
        <div className="space-y-4">
            {/* Policy and General Info Section */}
            <div className="">
                <h3 className="font-bold text-lg">{t('bookings.payment.title', 'Payment')}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('bookings.payment.policy', payment.policyText)}
                </p>
            </div>

            <div className='h-[1px] w-full bg-primary/50'></div>

            {/* Payment Methods Table */}
            <Table className={'rounded-md overflow-hidden w-full cursor-default text-sm'}>
                <TableHeader className={'border-b'}>
                    <TableRow>
                        {columns.map(col => (
                            <TableHead key={col.key}>{col.label}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        {columns.map(col => (
                            <TableCell key={col.key} className="">{payment[col.key] || '—'}</TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}