import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function SearchInput({ value, onChange }) {
    const { t } = useTranslation();

    return (
        <div className="relative w-min min-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder={t('participants.search.placeholder')}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-9 rounded-full"
            />
        </div>
    );
}