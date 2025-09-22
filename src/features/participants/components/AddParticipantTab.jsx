import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParticipantsSearch } from '@/queries/useParticipantsSearch';
import { getParticipantColumns } from '../columns';
import { toast } from 'sonner';
import { addParticipant } from '@/services/participantsService';
import SearchInput from './SearchInput';
import DataTableWithSkeleton from './DataTableWithSkeleton';
import PermissionsDialog from './PermissionsDialog';
import { Button } from '@/components/ui/button';

export default function AddParticipantTab() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
    const { data: participants, isLoading } = useParticipantsSearch(searchTerm);

    const columns = getParticipantColumns({
        t,
        type: 'add',
        onAddWithPermissions: (participant) => {
            setSelectedRows([participant]);
            requestAnimationFrame(() => setIsPermissionsOpen(true));
        }
    });

    const openPermissionsForSelection = useCallback(() => {
        if (!selectedRows || selectedRows.length === 0) return;
        requestAnimationFrame(() => setIsPermissionsOpen(true));
    }, [selectedRows]);

    const handleSavePermissions = useCallback(async (permissions) => {
        try {
            const participantsToAdd = [...selectedRows];
            await Promise.all(
                participantsToAdd.map(participant =>
                    addParticipant({ ...participant, authorisations: permissions })
                )
            );

            setIsPermissionsOpen(false);

            requestAnimationFrame(() => {
                setSelectedRows([]);
                setSearchTerm("");
                toast.success(t('participants.management.successMessage'));
            });
        } catch (error) {
            toast.error(t('participants.management.addError'));
        }
    }, [selectedRows, t]);

    const bulkActions = [];

    return (
        <div className="flex flex-col mt-4">
            <SearchInput value={searchTerm} onChange={setSearchTerm} />

            <div className="flex flex-col sapce-y-4 [&_.dataTablePagination]:hidden">
                {selectedRows.length > 0 && (
                    <div className="dataTableBulkActions flex items-center gap-2 ml-auto mb-2 -mt-8.5">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {selectedRows.length} {t('common.selected')}
                        </span>
                        <Button variant="outline" size="sm" onClick={openPermissionsForSelection}>
                            {t('participants.management.addParticipants')}
                        </Button>
                    </div>
                )}
                {
                    participants?.length > 0 && (
                        <DataTableWithSkeleton
                            columns={columns}
                            data={participants || []}
                            isLoading={isLoading}
                            setSelectedRows={setSelectedRows}
                            selectedRows={selectedRows}
                            enablePagination={false}
                            enableColumnFilters={false}
                            enableGlobalFilter={false}
                            bulkActions={bulkActions}
                            columnCount={columns.length}
                            rowCount={3}
                        />
                    )
                }
            </div>

            <PermissionsDialog
                isOpen={isPermissionsOpen}
                onClose={() => setIsPermissionsOpen(false)}
                onSave={handleSavePermissions}
                participants={selectedRows}
                title={t('participants.management.setPermissions')}
                description={t('participants.management.selectInitialPermissions')}
                saveButtonText={t('participants.management.addWithPermissions')}
            />
        </div>
    );
}