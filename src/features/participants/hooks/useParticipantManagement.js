import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const useParticipantManagement = () => {
    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState("participants");
    const [isManagerOpen, setManagerOpen] = useState(false);
    const [isDeleteOpen, setDeleteOpen] = useState(false);
    const [isPermissionsOpen, setPermissionsOpen] = useState(false);
    const [participantsForAction, setParticipantsForAction] = useState([]);
    const [selectionResetKey, setSelectionResetKey] = useState(0);

    const handleDelete = useCallback((participants) => {
        setParticipantsForAction(participants);
        setDeleteOpen(true);
    }, []);

    const handleEditPermissions = useCallback((participant) => {
        setParticipantsForAction([participant]);
        setPermissionsOpen(true);
    }, []);

    const handleBulkUpdatePermissions = useCallback((participants) => {
        setParticipantsForAction(participants);
        setPermissionsOpen(true);
    }, []);

    const confirmDelete = useCallback(() => {
        console.log('Deleting participants:', participantsForAction);
        toast.success(t('participants.management.participantsDeleted', { count: participantsForAction.length }));
        setDeleteOpen(false);
        setParticipantsForAction([]);
        setSelectionResetKey((k) => k + 1);
    }, [participantsForAction, t]);

    const confirmPermissionUpdate = useCallback((permissions) => {
        console.log('Updating permissions for:', participantsForAction, 'with:', permissions);
        toast.success(t('participants.management.permissionsUpdated'));
        setPermissionsOpen(false);
        setParticipantsForAction([]);
        setSelectionResetKey((k) => k + 1);
    }, [participantsForAction, t]);

    return {
        state: {
            activeTab,
            participantsForAction,
            selectionResetKey,
        },
        actions: {
            setActiveTab,
            setManagerOpen,
            setDeleteOpen,
            setPermissionsOpen,
            handleDelete,
            handleEditPermissions,
            handleBulkUpdatePermissions,
            confirmDelete,
            confirmPermissionUpdate,
        },
        dialogs: {
            isManagerOpen,
            isDeleteOpen,
            isPermissionsOpen,
        }
    };
};