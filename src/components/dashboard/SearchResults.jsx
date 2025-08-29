import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchResults({ results, onResultClick, isLoading, searchTerm }) {
    const { t } = useTranslation();

    const renderContent = () => {
        if (isLoading) {
            return <div className="p-4 text-center text-sm text-muted-foreground">{t('search.loading')}</div>;
        }

        if (!searchTerm) {
            return <div className="p-4 text-center text-sm text-muted-foreground">{t('search.startTyping')}</div>;
        }

        if (!results || results.length === 0) {
            return <div className="p-4 text-center text-sm text-muted-foreground">{t('search.noResults')}</div>;
        }

        return (
            <ul className="divide-y max-h-60 overflow-y-auto">
                {results.map((result) => (
                    <li
                        key={result.id}
                        className="p-2 hover:bg-muted cursor-pointer"
                        onMouseDown={() => onResultClick(result)}
                    >
                        <p className="font-semibold">{result.primaryText}</p>
                        <p className="text-xs text-muted-foreground capitalize">{result.secondaryText}</p>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="absolute top-full mt-2 w-full rounded-md border bg-background shadow-lg z-10">
            {renderContent()}
        </div>
    );
}