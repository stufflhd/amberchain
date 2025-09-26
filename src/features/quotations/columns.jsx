import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/tables/dataTableColumnHeader";
import i18n from "@/i18n";
import { formatDisplayDate } from "@/features/bookings/utils/bookingsUtils";

const getDynamicHeader = (mode, t) => {
  const commonHeaders = {
    quotationId: t('quotations.table.columns.quotationId'),
    readinessDate: t('quotations.table.columns.readinessDate'),
    cargoType: t('quotations.table.columns.cargoType'),
    price: t('quotations.common.price'),
    status: t('quotations.common.status'),
    carrier: t('quotations.common.carrier'),
  };

  switch (mode) {
    case 'Sea':
      return {
        ...commonHeaders,
        origin: t('quotations.table.columns.pol'),
        destination: t('quotations.table.columns.pod'),
        finalDestination: t('quotations.table.columns.finalPod'),
        vehicleOrPackageInfo: t('quotations.table.columns.containerSize'),
        commodityInfo: t('quotations.table.columns.commodity'),
      };
    case 'Air':
      return {
        ...commonHeaders,
        origin: t('quotations.table.columns.aod'),
        destination: t('quotations.table.columns.aoa'),
        finalDestination: t('quotations.table.columns.finalPod'),
        vehicleOrPackageInfo: t('quotations.table.columns.packageType'),
        commodityInfo: t('quotations.table.columns.numberOfCommodity'),
      };
    case 'Road':
      return {
        ...commonHeaders,
        origin: t('quotations.table.columns.consolidationPoint'),
        destination: t('quotations.table.columns.deconsolidationPoint'),
        finalDestination: t('quotations.table.columns.finalPod'),
        vehicleOrPackageInfo: t('quotations.table.columns.truckType'),
        commodityInfo: t('quotations.table.columns.commodity'),
      };
    case 'Rail':
      return {
        ...commonHeaders,
        origin: t('quotations.table.columns.ror'),
        destination: t('quotations.table.columns.rrd'),
        finalDestination: t('quotations.table.columns.finalPod'),
        vehicleOrPackageInfo: t('quotations.table.columns.packageType'),
        commodityInfo: t('quotations.table.columns.numberOfCommodity'),
      };
    case 'E-BUSINESS':
      return {
        ...commonHeaders,
        por: t('quotations.table.columns.fulfillmentCenter'),
        origin: t('quotations.table.columns.firstMile'),
        destination: t('quotations.table.columns.sortationHub'),
        finalDestination: t('quotations.table.columns.lastMile'),
        vehicleOrPackageInfo: t('quotations.table.columns.packageType'),
        commodityInfo: t('quotations.table.columns.numberOfCommodity'),
      };
    default:
      return {
        ...commonHeaders,
        origin: t('quotations.table.columns.pol'),
        destination: t('quotations.table.columns.pod'),
        finalDestination: t('quotations.table.columns.finalPod'),
        vehicleOrPackageInfo: t('quotations.table.columns.containerSize'),
        commodityInfo: t('quotations.table.columns.commodity'),
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
    { accessorKey: "id", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.quotationId} /> },
    { accessorKey: "readinessDate", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.readinessDate} />, cell: ({ row }) => formatDisplayDate(row.original.readinessDate, { lang: i18n.language }) },
    { accessorKey: "por", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.por} /> },
    { accessorKey: "origin", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.origin} /> },
    { accessorKey: "destination", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.destination} /> },
    { accessorKey: "finalDestination", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.finalDestination} /> },
    { accessorKey: "cargoType", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.cargoType} /> },
    { accessorKey: "vehicleOrPackageInfo", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.vehicleOrPackageInfo} /> },
    { accessorKey: "commodityInfo", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.commodityInfo} /> },
    { accessorKey: "price", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.price} /> },
    { accessorKey: "status", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.status} /> },
    { accessorKey: "carrier", header: ({ column }) => <DataTableColumnHeader column={column} title={headers.carrier} /> },
    { accessorKey: "mode", header: "Mode", enableHiding: true },
  ];
};