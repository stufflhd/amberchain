import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import DashNav from "@/components/dashboard/DashNav";
import DashboardSearch from "@/components/dashboard/DashboardSearch";
import { useSearchQuery } from "@/queries/useSearchQuery";
import { AlertTriangle, Book, Ship } from "lucide-react";
import SearchResultsSkeleton from "@/components/SearchResultsSkeleton";
import ActiveShipmentsOverview from "@/features/shipments/ActiveShipmentsOverview";
import BookingsOverview from "@/features/bookings/BookingsOverview";
const BookingsPlaceholder = ({ results }) => {
    const { t } = useTranslation();
    return (
        <div className="mt-8">
            <div className="flex items-center gap-4 mb-4">
                <Book className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold tracking-tight">{t('search.bookingResultsTitle', { count: results.length })}</h2>
            </div>
            <div className="p-6 border rounded-lg bg-muted text-muted-foreground">
                <p>{t('search.bookingComponentPlaceholder')}</p>
                <p>{t('search.foundCount', { count: results.length })}</p>
            </div>
        </div>
    );
};

export default function SearchResultsPage() {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('q') || '';
    const { data: results, isLoading } = useSearchQuery(searchTerm);

    const shipmentResults = useMemo(() =>
        results?.filter(r => r.type === 'shipment') || [],
        [results]
    );

    const bookingResults = useMemo(() =>
        results?.filter(r => r.type === 'booking') || [],
        [results]
    );

    const renderContent = () => {
        if (isLoading) {
            return <SearchResultsSkeleton />
        }

        if (!results || results.length === 0) {
            return (
                <div className="col-span-full flex flex-col items-center justify-center gap-4 py-16">
                    <AlertTriangle className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-semibold">{t('search.noResults')}</h3>
                    <p className="text-muted-foreground">{t('search.noResultsFor', { searchTerm })}</p>
                </div>
            );
        }

        return (
            <div className="flex flex-col gap-8 mt-4">
                {shipmentResults.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <Ship className="h-8 w-8 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight">{t('search.shipmentResultsTitle', { count: shipmentResults.length })}</h2>
                        </div>
                        <ActiveShipmentsOverview data={shipmentResults} />
                    </section>
                )}

                {bookingResults.length > 0 && (
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <Book className="h-8 w-8 text-primary" />
                            <h2 className="text-2xl font-bold tracking-tight">{t('search.bookingResultsTitle', { count: bookingResults.length })}</h2>
                        </div>
                        <BookingsOverview data={bookingResults} />
                    </section>
                )}
            </div>
        )
    }

    return (
        <>
            <div className="gap-4 flex flex-col">
                <DashNav DashTitle={t('search.pageTitle', { searchTerm })} />
                <DashboardSearch />
            </div>
            {renderContent()}
        </>
    );
}