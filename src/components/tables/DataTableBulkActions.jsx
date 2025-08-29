import React from 'react'
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

export default function DataTableBulkActions({ table, actions = [] }) {
    const { t } = useTranslation();
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const numSelected = selectedRows.length;

    if (numSelected === 0 || actions.length === 0) {
        return null;
    }

    const handleActionSelect = (onSelect) => {
        onSelect(selectedRows);
        table.resetRowSelection();
    };

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
                {numSelected} {t("common.selected")}
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        Actions
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {actions.map((action, index) => (
                        <DropdownMenuItem
                            key={index}
                            onClick={() => handleActionSelect(action.onSelect)}
                            className="cursor-pointer"
                        >
                            {action.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}