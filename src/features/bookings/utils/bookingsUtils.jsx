import React from 'react';
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import ActiveIcon from '@/components/icons/ActiveIcon';
import AlertIcon from '@/components/icons/AlertIcon ';
import LoaderIcon from '@/components/icons/LoaderIcon';
import LoadingIcon from '@/components/icons/LoadingIcon';
import ErrorIcon from '@/components/icons/ErrorIcon';
import SuccessIcon from '@/components/icons/SuccessIcon';

const locales = { en: enUS, fr };

export const formatDisplayDate = (dateString, { lang = 'en' } = {}) => {
    if (!dateString) return "N/A";
    const date = parseISO(dateString);
    const locale = locales[lang] || enUS;
    return format(date, 'dd MMM yyyy, HH:mm', { locale });
};

export const getBookingStatusConfig = (t) => ({
    Confirmed: { text: t('bookings.status.confirmed'), icon:<SuccessIcon/> },
    Pending: { text: t('bookings.status.pending'), icon:<LoadingIcon/>},
    Cancelled: { text: t('bookings.status.cancelled'), icon:<ErrorIcon/>},
    New: { text: t('bookings.status.new'), icon:<ActiveIcon/>},
    Delayed: { text: t('bookings.status.delayed'), icon:<ActiveIcon/>},
});

export const BookingStatusBadge = ({ status }) => {
    const { t } = useTranslation();
    const config = getBookingStatusConfig(t)[status] || { text: status, variant: "default" };
    return <Badge variant={'outline'}>{config.icon}{config.text}</Badge>;
};