import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/tables/dataTableColumnHeader"
import LoadingIcon from "@/components/icons/loadingIcon"
import SuccessIcon from "@/components/icons/successIcon"
import ErrorIcon from "@/components/icons/errorIcon"
const statusIcons = {
    Confirmed: <SuccessIcon />,
    Pending: <LoadingIcon />,
    InTransit: <LoadingIcon />,
    Delayed: <ErrorIcon />,
}

export const columns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "docType",
        header: () => null,
        cell: () => null,
        enableSorting: false,
        filterFn: (row, id, value) => {
            if (!value) return true
            return String(row.getValue(id)) === String(value)
        },
    },

    {
        accessorKey: "shipmentId",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Shipment/Booking ID" />
        ),
        cell: ({ row, table }) => {
            const id = row.getValue("shipmentId");
            const shipment = row.original;
            const openDialog = table.options.meta?.openDialog;
            return (
                <button
                    type="button"
                    className="text-primary hover:underline font-medium"
                    title="View Details"
                    onClick={() => openDialog?.(shipment)}
                >
                    {id}
                </button>
            )
        },
    },
    {
        accessorKey: "customer",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer/Shipper" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const s = row.getValue("status")
            return (
                <Badge variant="outline" className='leading-6' >
                    {statusIcons[s] || null}
                    {s}
                </Badge>
            )
        },
    },
    {
        accessorKey: "mode",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Mode" />
        ),
    },
    {
        accessorKey: "stage",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Route/Stage" />
        ),
    },
    {
        accessorKey: "departure",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Departure Date" />
        ),
        cell: ({ row }) => {
            const d = row.getValue("departure")
            return <span className="tabular-nums">{d}</span>
        },
    },
    {
        accessorKey: "eta",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ETA" />
        ),
        cell: ({ row }) => {
            const d = row.getValue("eta")
            return <span className="tabular-nums">{d}</span>
        },
    },
    {
        accessorKey: "alerts",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Alerts" />
        ),
    },
    {
        accessorKey: "soc",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="SOC Availability" />
        ),
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            const shipment = row.original;
            const openDialog = table.options.meta?.openDialog;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(shipment.shipmentId)}>
                            Copy Shipment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => openDialog?.(shipment)}
                        >
                            View details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Track shipment</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]