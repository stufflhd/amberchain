import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { PERMISSION_LABELS } from '@/constants/permissions';
import { DataTableColumnHeader } from '@/components/tables/dataTableColumnHeader';

const baseColumns = (t) => [
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
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    { accessorKey: "id", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.profileId')} /> },
    { accessorKey: "company", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.company')} /> },
    { accessorKey: "user", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.userName')} /> },
    { accessorKey: "businessProfile", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.businessProfile')} /> },
    { accessorKey: "party", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.party')} /> },
    { accessorKey: "email", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.email')} /> },
    { accessorKey: "phone", header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.phone')} /> },
];

const managementColumns = (t, onEditPermissions, onDelete) => [
    {
        accessorKey: "authorisations",
        header: ({ column }) => <DataTableColumnHeader column={column} title={t('participants.table.authorisations')} />,
        cell: ({ row }) => {
            const authorisations = row.getValue("authorisations");
            if (!authorisations || authorisations.length === 0) return t('common.none');
            return authorisations.map(auth => PERMISSION_LABELS[auth] || auth).join(", ");
        },
    },
    {
        id: "actions",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">{t('common.openMenu')}</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEditPermissions(row.original)}>
                        {t('participants.management.editPermissions')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete([row.original])}>
                        {t('common.delete')}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    }
];

export const getParticipantColumns = (options) => {
    const { t, type = 'add', onEditPermissions, onDelete } = options;
    const columns = [...baseColumns(t)];

    if (type === 'management') {
        const manageCols = managementColumns(t, onEditPermissions, onDelete);
        columns.push(...manageCols);
    }
    
    return columns;
};