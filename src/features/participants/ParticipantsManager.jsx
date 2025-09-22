import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { participants as allParticipants } from "@/constants/participants";
import { getParticipantColumns } from './columns';
import { useParticipantManagement } from './hooks/useParticipantManagement';
import ParticipantsTabs from './components/ParticipantsTabs';
import ParticipantsList from './components/ParticipantsList';
import AddParticipantTab from './components/AddParticipantTab';
import ConfirmationDialog from './components/ConfirmationDialog';
import PermissionsDialog from './components/PermissionsDialog';

export default function ParticipantsManager({ participants: participantIds }) {
    const { t } = useTranslation();
    const {
        state,
        actions,
        dialogs
    } = useParticipantManagement();

    const tabs = useMemo(() => ([
        { id: "participants", label: t('participants.management.title') },
        { id: "addParticipant", label: t('participants.management.addParticipant') }
    ]), [t]);

    const participants = useMemo(() => participantIds
        .map(id => allParticipants.find(p => p.id === id))
        .filter(Boolean), [participantIds]);

    const managementColumns = useMemo(() => getParticipantColumns({
        t,
        type: 'management',
        onEditPermissions: actions.handleEditPermissions,
        onDelete: actions.handleDelete,
    }), [t, actions.handleEditPermissions, actions.handleDelete]);

    const renderTabContent = useCallback(() => {
        switch (state.activeTab) {
            case "participants":
                return <ParticipantsList
                    participants={participants}
                    columns={managementColumns}
                    onUpdatePermissions={actions.handleBulkUpdatePermissions}
                    onDelete={actions.handleDelete}
                />;
            case "addParticipant":
                return <AddParticipantTab />;
            default:
                return null;
        }
    }, [state.activeTab, participants, managementColumns, actions.handleBulkUpdatePermissions, actions.handleDelete]);

    return (
        <>
            <Dialog open={dialogs.isManagerOpen} onOpenChange={actions.setManagerOpen}>
                <DialogTrigger asChild>
                    <Button variant={'outline'} className="cursor-pointer">
                        <Plus className="size-3 mr-1" /> {t('shipments.shipmentDetails.addParticipant')}
                    </Button>
                </DialogTrigger>
                <DialogContent className={'!w-full !max-w-[90%] xl:!max-w-6xl'} aria-describedby="participants-dialog-description">
                    <DialogHeader className={'gap-0'}>
                        <DialogTitle className={'mb-4'}>{t('participants.management.title')}</DialogTitle>
                        <DialogDescription id="participants-dialog-description" asChild>
                            <ParticipantsTabs activeTab={state.activeTab} setActiveTab={actions.setActiveTab} tabs={tabs} />
                        </DialogDescription>
                        {renderTabContent()}
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <ConfirmationDialog
                isOpen={dialogs.isDeleteOpen}
                onOpenChange={actions.setDeleteOpen}
                onConfirm={actions.confirmDelete}
                title={t('common.confirmDelete')}
                description={t('participants.management.deleteConfirmation', { count: state.participantsForAction.length })}
            />

            <PermissionsDialog
                isOpen={dialogs.isPermissionsOpen}
                onClose={() => actions.setPermissionsOpen(false)}
                onSave={actions.confirmPermissionUpdate}
                participants={state.participantsForAction}
                initialPermissions={state.participantsForAction[0]?.authorisations || []}
                title={t('participants.management.managePermissions')}
                description={t('participants.management.selectPermissions')}
                saveButtonText={t('participants.management.saveChanges')}
            />
        </>
    );
}