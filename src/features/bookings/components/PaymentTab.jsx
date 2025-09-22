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

    return (
        <div className="space-y-6">
            {/* Policy and General Info Section */}
            <div className="">
                <h3 className="font-bold text-lg">{t('bookings.payment.title', 'Payment')}</h3>
                <p className="text-sm text-muted-foreground">
                    {t('bookings.payment.policy', payment.policyText)}
                </p>
            </div>

            <div className='h-[1px] w-full bg-primary/50'></div>

            {/* Payment Methods Table */}
            <div className="space-y-4">
                <Table className={'rounded-md overflow-hidden w-full cursor-default'}>
                    <TableHeader className={'border-b border-primary/50'}>
                        <TableRow>
                            <TableHead>{t('bookings.payment.googlePay', 'GooglePay')}</TableHead>
                            <TableHead>{t('bookings.payment.applePay', 'ApplePay')}</TableHead>
                            <TableHead>{t('bookings.payment.card', 'Card')}</TableHead>
                            <TableHead>{t('bookings.payment.invoice', 'Invoice Payment')}</TableHead>
                            <TableHead>{t('bookings.payment.statusTitle', 'Payment Status')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="">{payment.googlePay || '—'}</TableCell>
                            <TableCell className="">{payment.applePay || '—'}</TableCell>
                            <TableCell className="">{payment.card || '—'}</TableCell>
                            <TableCell className="">{payment.invoicePayment || '—'}</TableCell>
                            <TableCell className="">{payment.status || '—'}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}