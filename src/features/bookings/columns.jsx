import { Checkbox } from "@/components/ui/checkbox";
import { formatDisplayDate } from "./utils/bookingsUtils";
import { BookingStatusBadge } from "./utils/bookingsUtils";
import i18n from "@/i18n";
import { DataTableColumnHeader } from "@/components/tables/dataTableColumnHeader";

const getDynamicHeader = (mode, t) => {
    switch (mode) {
        case 'Sea':
            return { origin: "POL", destination: "POD" };
        case 'Air':
            return { origin: "AOD", destination: "AOA" };
        case 'Road':
            return { origin: "Consolidation Point", destination: "Deconsolidation Point" };
        case 'Rail':
            return { origin: "ROR", destination: "RRD" };
        case 'E-BUSINESS':
            return { origin: t('bookings.table.columns.firstMile'), destination: t('bookings.table.columns.sortationHub') };
        default:
            return { origin: t('bookings.table.columns.origin'), destination: t('bookings.table.columns.destination') };
    }
};

export const getColumns = (t, activeMode = 'all') => {
    const headers = getDynamicHeader(activeMode, t);

    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <div className="min-w-8">
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.bookingId')} />,
        },
        {
            accessorKey: "readinessDate",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.readinessDate')} />,
            cell: ({ row }) => formatDisplayDate(row.original.readinessDate, { lang: i18n.language })
        },
        {
            accessorKey: "por",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.por')} />,
        },
        {
            accessorKey: "origin",
            header: ({ column }) => <DataTableColumnHeader column={column} title={headers.origin} />,
        },
        {
            accessorKey: "destination",
            header: ({ column }) => <DataTableColumnHeader column={column} title={headers.destination} />,
        },
        {
            accessorKey: "finalPod",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.finalPod')} />,
        },
        {
            accessorKey: "etd",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.etd')} />,
            cell: ({ row }) => formatDisplayDate(row.original.etd, { lang: i18n.language })
        },
        {
            accessorKey: "eta",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.eta')} />,
            cell: ({ row }) => formatDisplayDate(row.original.eta, { lang: i18n.language })
        },
        {
            accessorKey: "status",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.status')} />,
            cell: ({ row }) => <BookingStatusBadge status={row.original.status} />,
            filterFn: (row, id, value) => value.includes(row.getValue(id)),
        },
        {
            accessorKey: "carrier",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.carrier')} />,
        },
        {
            accessorKey: "smartTool",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.smartTool')} />,
        },
        {
            accessorKey: "terminal",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.terminal')} />,
        },
        {
            accessorKey: "task",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('bookings.table.columns.task')} />,
        },
        {
            accessorKey: "mode",
            header: ({ column }) => <DataTableColumnHeader column={column} title={t('filters.mode')} />,
            enableHiding: true,
            filterFn: (row, id, value) => value === row.getValue(id),
        }
    ];
};