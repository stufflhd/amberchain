import * as React from "react";
import { DataTableColumnHeader } from "@/components/tables/DataTableColumnHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ShipmentStatusBadge from "./components/ShipmentStatusBadge";
import { formatDisplayDate } from "@/features/shipments/utils/shipmentsUtils";
import i18n from "@/i18n";
import { Checkbox } from "@/components/ui/checkbox";

const getDynamicHeader = (mode, t) => {
  switch (mode) {
    case 'Sea':
      return { number: "B/L Number", por: t('shipments.table.columns.por'), origin: "POL", destination: "POD", finalDestination: t('shipments.table.columns.finalPod') };
    case 'Air':
      return { number: "LTA Number", por: t('shipments.table.columns.por'), origin: "AOD", destination: "AOA", finalDestination: t('shipments.table.columns.finalPod') };
    case 'Road':
      return { number: "CMR Number", por: t('shipments.table.columns.por'), origin: "Consolidation Point", destination: "Deconsolidation Point", finalDestination: t('shipments.table.columns.finalPod') };
    case 'Rail':
      return { number: "Rail Waybill Number", por: t('shipments.table.columns.por'), origin: "ROR", destination: "RRD", finalDestination: t('shipments.table.columns.finalPod') };
    case 'E-BUSINESS':
      return {
        number: t('shipments.table.columns.docNumberEBiz'),
        por: t('shipments.table.columns.fulfillmentCenter'),
        origin: t('shipments.table.columns.firstMile'),
        destination: t('shipments.table.columns.sortationHub'),
        finalDestination: t('shipments.table.columns.lastMile')
      };
    default:
      return {
        number: t('shipments.table.columns.documentNumber'),
        por: t('shipments.table.columns.por'),
        origin: t('shipments.table.columns.origin'),
        destination: t('shipments.table.columns.destination'),
        finalDestination: t('shipments.table.columns.finalPod')
      };
  }
};

export const getColumns = (t, activeMode = 'all') => {
  const headers = getDynamicHeader(activeMode, t);

  return [
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
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.shipmentId')} />,
    },
    {
      accessorKey: "number",
      header: ({ column }) => <DataTableColumnHeader column={column} title={headers.number} />,
    },
    {
      accessorKey: "por",
      header: ({ column }) => <DataTableColumnHeader column={column} title={headers.por} />,
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
      accessorKey: "finalDestination",
      header: ({ column }) => <DataTableColumnHeader column={column} title={headers.finalDestination} />,
    },
    {
      accessorKey: "etd",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.etd')} />,
      cell: ({ row }) => formatDisplayDate(row.original.etd, { lang: i18n.language })
    },
    {
      accessorKey: "eta",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.eta')} />,
      cell: ({ row }) => formatDisplayDate(row.original.eta, { lang: i18n.language })
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.status')} />,
      cell: ({ row }) => <ShipmentStatusBadge status={row.original.status} />,
      filterFn: (row, id, value) => value.includes(row.getValue(id)),
    },
    {
      accessorKey: "carrier",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.carrier')} />,
    },
    {
      accessorKey: "smart_tool",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.smartTool')} />,
      cell: ({ row }) => <span className={row.original.smart_tool === "Used" ? 'text-primary' : 'text-secondary'}>{row.original.smart_tool}</span>,
    },
    {
      accessorKey: "terminal",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.terminal')} />,
    },
    {
      accessorKey: "task",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('shipments.table.columns.task')} />,
      cell: ({ row }) => row.original.task || "-",
    },
    {
      accessorKey: "mode",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('filters.mode')} />,
      enableHiding: true,
      filterFn: (row, id, value) => value === row.getValue(id),
    },
    {
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()} >
              <span className="sr-only">{t('common.openMenu')}</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>{t('shipments.table.actions.viewDetails')}</DropdownMenuItem>
            <DropdownMenuItem>{t('shipments.table.actions.reportIssue')}</DropdownMenuItem>
            <DropdownMenuItem>{t('shipments.table.actions.manageDocs')}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
};