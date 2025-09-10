import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PARTICIPANT_PERMISSIONS } from '@/constants/permissions';

export default function PermissionsDialog({
    isOpen,
    onClose,
    onSave,
    participants = [],
    initialPermissions = [],
    title,
    description,
    saveButtonText
}) {
    const { t } = useTranslation();
    const [permissions, setPermissions] = useState(initialPermissions);

    useEffect(() => {
        if (isOpen) {
            setPermissions(initialPermissions);
        } else {
            setPermissions([]);
        }
    }, [isOpen]);

    const handlePermissionToggle = (permission) => {
        setPermissions(current =>
            current.includes(permission)
                ? current.filter(p => p !== permission)
                : [...current, permission]
        );
    };

    const handleSave = () => {
        onSave(permissions);
        onClose();
    };

    const participantCount = participants.length;
    const dialogTitle = participantCount > 0
        ? `${title} (${t('participants.management.participantsSelected', { count: participantCount })})`
        : title;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="space-y-2 py-4">
                    {Object.values(PARTICIPANT_PERMISSIONS).map(permission => (
                        <div key={permission} className="flex items-center space-x-2">
                            <Checkbox
                                id={`perm-${permission}`}
                                checked={permissions.includes(permission)}
                                onCheckedChange={() => handlePermissionToggle(permission)}
                            />
                            <label htmlFor={`perm-${permission}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {t(`participants.authorisations.${permission}`)}
                            </label>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="ghost" onClick={onClose}>
                        {t('common.cancel')}
                    </Button>
                    <Button onClick={handleSave}>
                        {saveButtonText}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}