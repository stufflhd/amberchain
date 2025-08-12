import React from 'react'
import { Input } from '../ui/input'
import { SearchIcon } from 'lucide-react'
import { Toggle } from '../ui/toggle'
import { useTranslation } from 'react-i18next';

export default function Search() {
    const { t } = useTranslation();
    return (
        <div className="relative group">
            <Input
                type="search"
                placeholder={t('searchWord')}
                className=" absolute right-10 top-1/2 -translate-y-1/2 rounded-full w-0 opacity-0 transition-[width,opacity,padding] duration-300 ease-out group-focus-within:w-[240px] group-focus-within:opacity-100 group-focus-within:pl-4 group-focus-within:pr-3" />

            <Toggle
                variant="outline"
                aria-label="Search"
                className="z-10 absolute right-0 top-1/2 -translate-y-1/2 size-8 min-w-8 rounded-full"
            >
                <SearchIcon />
            </Toggle>
        </div>
    )
}
