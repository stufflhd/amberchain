import { useTranslation } from "react-i18next";
import { memo, useEffect, useMemo, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ContainerDetails from "./ContainerDetails";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import ContainerIcon from "@/components/icons/ContainerIcon";

const ContainerDetailsDialog = memo(({ shipment, containers }) => {
    const { t } = useTranslation();

    const hasContainers = containers && containers.length > 0;
    const [activeContainerId, setActiveContainerId] = useState(null);

    useEffect(() => {
        if (hasContainers) {
            setActiveContainerId(containers[0]?.id);
        } else {
            setActiveContainerId(null);
        }
    }, [containers, hasContainers]);

    const activeContainer = useMemo(() => {
        if (!activeContainerId || !hasContainers) return null;
        return containers.find(container => container.id === activeContainerId);
    }, [activeContainerId, containers, hasContainers]);

    const handleValueChange = useCallback((newValue) => {
        if (newValue) {
            setActiveContainerId(newValue);
        }
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} disabled={!hasContainers}>
                    {t('shipments.shipmentDetails.viewDetails')}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-fit sm:max-w-[90%] p-8 space-y-8 gap-0 overflow-hidden">
                <DialogTitle className={'z-50 relative mb-8'}>
                    {t('shipments.shipmentDetails.containerDetailsTitle', { shipmentNumber: shipment.number })}
                </DialogTitle>

                {hasContainers ? (
                    <>
                        <div className="overflow-hidden overflow-x-auto py-[2px] mb-4">
                            <ToggleGroup
                                type="single"
                                value={activeContainerId}
                                className="w-full !shadow-none"
                                onValueChange={handleValueChange}
                                variant="outline"
                            >
                                {containers.map(container => (
                                    <ToggleGroupItem
                                        key={container.id}
                                        value={container.id}
                                        className={"flex-none whitespace-nowrap w-max mt-0"}
                                    >
                                        {container.id}
                                    </ToggleGroupItem>
                                ))}
                            </ToggleGroup>
                        </div>

                        {activeContainer ? (
                            <div className="space-y-8 max-h-[60vh] relative overflow-auto">
                                <ContainerDetails container={activeContainer} />
                            </div>
                        ) : null}
                    </>
                ) : (
                    <p className="text-center text-muted-foreground p-8">
                        {t('shipments.shipmentDetails.noContainerDetails')}
                    </p>
                )}
                <ContainerIcon className="blur-[2px] absolute bottom-0 right-0 w-[70%] h-auto translate-x-[15%] opacity-20" />
            </DialogContent>
        </Dialog >
    );
});

ContainerDetailsDialog.displayName = 'ContainerDetailsDialog';

export default ContainerDetailsDialog;