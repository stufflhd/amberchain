import { DataTable } from "@/components/tables/DataTable";
import ContainerDetails from "../ContainerDetails";

export default function ContainersTable({
    columns,
    data,
    isLoading,
    columnFilters,
    setColumnFilters,
    statusFilterOptions,
    typeFilterOptions,
    allLabel,
}) {
    return (
        <DataTable
            columns={columns}
            data={data || []}
            isLoading={isLoading}
            expandable={true}
            renderExpandedRow={(containerObj) => <ContainerDetails containerObj={containerObj} />}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            tabsFilter={{
                columnId: "status",
                options: statusFilterOptions,
                allLabel,
            }}
            dropdownFilters={[
                {
                    columnId: "type",
                    title: "Type",
                    options: typeFilterOptions,
                },
            ]}
            initialColumnVisibility={{ type: false }}
        />
    );
}


