import React, { useState, useRef } from 'react';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import useClickOutside from '@/hooks/useClickOutside';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchAll } from '@/services/apiService';
import SearchResults from './SearchResults';

const useInstantSearch = (searchTerm) => {
    return useQuery({
        queryKey: ['instantSearch', searchTerm],
        queryFn: async () => {
            if (!searchTerm) return [];
            const results = await searchAll({ searchTerm });
            return results.map(item => ({
                id: item.id,
                primaryText: item.number || item.id,
                secondaryText: item.type,
            }));
        },
        enabled: !!searchTerm,
    });
};

export default function DashboardSearch() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(localSearchTerm, 300);
    const { data: searchResults, isLoading } = useInstantSearch(debouncedSearchTerm);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchContainerRef = useRef(null);

    useClickOutside(searchContainerRef, () => setIsResultsVisible(false));

    const performSearch = (term) => {
        if (term.trim()) {
            setIsResultsVisible(false);
            setLocalSearchTerm(""); 
            navigate(`/search?q=${encodeURIComponent(term)}`);
        }
    };

    const handleResultClick = (result) => {
        performSearch(result.id);
    };

    const handleSearchButtonClick = () => {
        performSearch(localSearchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            performSearch(localSearchTerm);
        }
    };

    return (
        <div className="relative flex justify-end" ref={searchContainerRef}>
            <div className="relative w-xs">
                <Input
                    value={localSearchTerm}
                    onChange={(e) => setLocalSearchTerm(e.target.value)}
                    onFocus={() => setIsResultsVisible(true)}
                    onKeyPress={handleKeyPress}
                    type="search"
                    placeholder='Search Shipments, Bookings...'
                    className="rounded-full rounded-tr-none rounded-br-none" />
                {isResultsVisible && (
                    <SearchResults
                        results={searchResults}
                        onResultClick={handleResultClick}
                        isLoading={isLoading && debouncedSearchTerm}
                        searchTerm={debouncedSearchTerm}
                    />
                )}
            </div>
            <Button onClick={handleSearchButtonClick} className={'cursor-pointer rounded-full rounded-tl-none rounded-bl-none'}>
                {t('searchWord2')}
            </Button>
        </div>
    );
}