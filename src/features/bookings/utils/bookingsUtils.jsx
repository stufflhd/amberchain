import React from 'react';
import { format, parseISO } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';

const locales = { en: enUS, fr };

export const formatDisplayDate = (dateString, { lang = 'en' } = {}) => {
    if (!dateString) return "N/A";
    const date = parseISO(dateString);
    const locale = locales[lang] || enUS;
    return format(date, 'dd MMM yyyy, HH:mm', { locale });
};