 import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTable } from "@/components/tables/DataTable";
import { getColumns } from "./columns";
import containersData from "@/constants/containers.json";
import ContainerDetails from "./ContainerDetails";
import DashNav from "@/components/dashboard/DashNav";
import DashboardSearch from "@/components/dashboard/DashboardSearch";

export default function ContainersOverview() {
    const { t } = useTranslation();
    const [columnFilters, setColumnFilters] = useState([]);

    const activeMode = useMemo(() => {
        const modeFilter = columnFilters.find(f => f.id === 'mode');
        return modeFilter ? modeFilter.value : 'all';
    }, [columnFilters]);

    const columns = useMemo(() => getColumns(t, activeMode), [activeMode, t]);

    // const modeFilterOptions = [
    //     { value: "Sea", label: t('modes.sea') },
    //     { value: "Air", label: t('modes.air') },
    //     { value: "Road", label: t('modes.road') },
    //     { value: "Rail", label: t('modes.rail') },
    //     { value: "E-BUSINESS", label: t('modes.ebusiness') },
    // ];

    return (
        <>
            <div className="gap-4 flex flex-col">
                <DashNav DashTitle={t('pageTitles.containers-view')} />
                <DashboardSearch />
            </div>
            <div className="flex flex-col gap-4">
                <DataTable
                    columns={columns}
                    data={containersData}
                    isLoading={false}
                    expandable={true}
                    renderExpandedRow={(containerObj) => <ContainerDetails containerObj={containerObj} />}
                    columnFilters={columnFilters}
                    setColumnFilters={setColumnFilters}
                    // tabsFilter={{
                    //     columnId: "mode",
                    //     options: modeFilterOptions,
                    //     allLabel: t('common.all'),
                    // }}
                    initialColumnVisibility={{ mode: false }}
                />
            </div>
        </>
    );
}


