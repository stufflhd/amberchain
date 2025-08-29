import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DataTableSearchStatus({ searchTerm, onClear }) {
    const { t } = useTranslation();

    if (!searchTerm) {
        return null;
    }

    return (
        <div className="flex items-center gap-2 text-sm">
            <span>{t('search.resultsFor')}</span>
            <Badge variant="outline" className="rounded-md">
                "{searchTerm}"
            </Badge>
            <Button
                variant="ghost"
                onClick={onClear}
                className="h-6 w-6 p-0 rounded-full"
            >
                <X className="h-4 w-4" />
                <span className="sr-only">{t('search.clear')}</span>
            </Button>
        </div>
    );
}