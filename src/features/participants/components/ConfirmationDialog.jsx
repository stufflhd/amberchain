import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function ConfirmationDialog({ isOpen, onOpenChange, onConfirm, title, description }) {
    const { t } = useTranslation();

    const handleConfirm = () => {
        onConfirm();
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="confirmation-dialog-description">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription id="confirmation-dialog-description">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-3 mt-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        {t('common.cancel')}
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        {t('common.confirm')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}