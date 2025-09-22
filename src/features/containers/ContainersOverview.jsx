import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getColumns } from "./columns";
import { useContainersQuery } from "@/queries/useContainersQuery";
import { useContainerFilters } from "./hooks/useContainerFilters";
import ContainersHeader from "./components/ContainersHeader";
import ContainersTable from "./components/ContainersTable";

export default function ContainersOverview() {
    const { t } = useTranslation();
    const { shipmentId } = useParams();

    const { data: fetchedData, isLoading: isFetching } = useContainersQuery({
        enabled: true,
        shipmentId,
    });

    const {
        columnFilters,
        setColumnFilters,
        activeMode,
        statusFilterOptions,
        typeFilterOptions,
    } = useContainerFilters(fetchedData);

    const columns = useMemo(() => getColumns(t, activeMode), [activeMode, t]);

    return (
        <>
            <ContainersHeader />
            <div className="flex flex-col gap-4">
                <ContainersTable
                    columns={columns}
                    data={fetchedData}
                    isLoading={isFetching}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    statusFilterOptions={statusFilterOptions}
                    typeFilterOptions={typeFilterOptions}
                    allLabel={t('common.all')}
                />
            </div>
        </>
    );
}


