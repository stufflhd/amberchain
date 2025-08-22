import React from 'react'
import { Input } from '../ui/input'
import { Toggle } from '../ui/toggle'
import { SearchIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';

export default function DashboardSearch() {
    const { t } = useTranslation();

    return (
        <div className="relative flex justify-end">
            <Input
                type="search"
                placeholder='B/L   LTA   CMR   CONTAINER   BOOKING'
                className="rounded-full w-xs rounded-tr-none rounded-br-none" />
            <Button className={'rounded-full rounded-tl-none rounded-bl-none'}>
                {t('searchWord2')}
            </Button>
        </div>
    )
}
