import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTableWithSkeleton from './DataTableWithSkeleton';

export default function ParticipantsList({ participants, columns, onUpdatePermissions, onDelete }) {
    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = useState([]);

    const bulkActions = [
        {
            label: t('participants.management.updatePermissions'),
            onSelect: (rows) => {
                setSelectedRows([]);
                requestAnimationFrame(() => onUpdatePermissions(rows));
            }
        },
        {
            label: t('common.delete'),
            onSelect: (rows) => {
                setSelectedRows([]);
                requestAnimationFrame(() => onDelete(rows));
            }
        }
    ];

    return (
        <div className="flex flex-col">
            <DataTableWithSkeleton
                columns={columns}
                data={participants}
                isLoading={!participants}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                bulkActions={bulkActions}
                enablePagination={false}
                columnCount={columns.length}
                rowCount={5}
            />
        </div>
    );
}