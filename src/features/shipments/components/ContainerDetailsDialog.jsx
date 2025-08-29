import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContainerDetails from "./ContainerDetails";

// Renders a dialog to show details of all containers in a shipment
export default function ContainerDetailsDialog({ shipment }) {
    const { t } = useTranslation();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className={'cursor-pointer'}>
                    {t('shipments.shipmentDetails.viewDetails')}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-fit sm:max-w-[90%] p-0 gap-0">
                <div className="space-y-8 max-h-[70vh] p-8 relative overflow-hidden">
                    <DialogTitle className={'z-50 relative'}>
                        {t('shipments.shipmentDetails.containerDetailsTitle', { shipmentNumber: shipment.number })}
                    </DialogTitle>
                    {shipment.containers && shipment.containers.length > 0 ? (
                        shipment.containers.map((container, index) => (
                            <ContainerDetails key={index} container={container} />
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground py-8">
                            {t('shipments.shipmentDetails.noContainerDetails')}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}