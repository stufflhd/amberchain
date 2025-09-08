import React from "react";
import { useTranslation } from "react-i18next";
import ShipmentStatusBadge from "./ShipmentStatusBadge";
import ContainerDetailsDialog from "./ContainerDetailsDialog";
import { formatDisplayDate } from "../utils/shipmentsUtils";
import containersData from "../../../constants/containers";

const getModeSpecificLabels = (mode, t) => {
    switch (mode) {
        case "Sea":
            return { vehicle: t('shipments.shipmentDetails.vessel'), voyage: t('shipments.shipmentDetails.voyage'), transshipment: t('shipments.shipmentDetails.transshipment') };
        case "Air":
        case "E-BUSINESS":
            return { vehicle: t('shipments.shipmentDetails.flight'), voyage: t('shipments.shipmentDetails.flightNumber'), transshipment: t('shipments.shipmentDetails.transshipment') };
        case "Road":
            return { vehicle: t('shipments.shipmentDetails.truck'), voyage: t('shipments.shipmentDetails.tripNumber'), transshipment: t('shipments.shipmentDetails.transshipment') };
        case "Rail":
            return { vehicle: t('shipments.shipmentDetails.railCarrier'), voyage: t('shipments.shipmentDetails.railCarrierNumber'), transshipment: t('shipments.shipmentDetails.tansitRailTerminal') };
        default:
            return { vehicle: t('shipments.shipmentDetails.vehicle'), voyage: t('shipments.shipmentDetails.reference'), transshipment: t('shipments.shipmentDetails.transshipment') };
    }
};

export default function ShipmentInfoHeader({ shipment, containerCount }) {
    const { t } = useTranslation();
    const modeLabels = getModeSpecificLabels(shipment.mode, t);

    const containers = containersData.filter(c => shipment.containerIds?.includes(c.id));

    return (
        <header className="flex flex-col sm:flex-row items-start gap-8">
            <div className="w-full sm:w-1/2 sm:space-y-4 pr-0 sm:pr-8">
                <div className="flex justify-between gap-4 items-center">
                    <h2 className="large font-semibold">{t('shipments.shipmentDetails.shipmentTitle', { shipmentNumber: shipment.number })}</h2>
                    <ShipmentStatusBadge status={shipment.status} />
                </div>
                <div className="flex justify-between gap-4 items-end sm:items-center">
                    <p className="flex sm:gap-4 text-sm flex-col sm:flex-row">
                        {containerCount > 0 && <span>{t('shipments.shipmentDetails.containerCount', { count: containerCount })}</span>}
                        <span><b>{t('shipments.shipmentDetails.etd')}</b> {formatDisplayDate(shipment.etd)}</span>
                        <span><b>{t('shipments.shipmentDetails.lastUpdate')}</b> {formatDisplayDate(shipment.lastUpdated)}</span>
                    </p>
                    <ContainerDetailsDialog shipment={shipment} containers={containers} />
                </div>
            </div>
            <div className="w-full sm:w-1/2 sm:ml-auto flex flex-col sm:flex-row justify-end gap-8 items-start">
                <div className="w-full sm:w-1/2 border-l px-8 border-primary text-sm">
                    <p><b>{modeLabels.vehicle}</b> {shipment.vesselName}</p>
                    <p><b>{modeLabels.voyage}</b> {shipment.voyage}</p>
                </div>
                <div className="w-full sm:w-1/2 border-l px-8 border-primary text-sm">
                    <p><b>{t('shipments.shipmentDetails.eta')}</b> {formatDisplayDate(shipment.eta)}</p>
                    {
                        shipment.mode != 'Road' && (
                            <p><b>{modeLabels.transshipment}</b> {shipment.transshipmentPorts}</p>
                        )
                    }
                    {shipment.delay !== "No delay" && <small className="text-secondary font-semibold">{shipment.delay}</small>}
                    {
                        shipment.notes.map((note)=>(
                            <small>{note}</small>
                        ))
                    }
                </div>
            </div>
        </header>
    );
}