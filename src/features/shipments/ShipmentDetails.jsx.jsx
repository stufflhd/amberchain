import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import AmbTimeline from "@/components/Timeline";
import ContainerDetailsDialog from "./components/ContainerDetailsDialog";
import ShipmentStatusBadge from "./components/ShipmentStatusBadge";
import ImageCarousel from "./components/ImageCarousel";
import ParticipantAvatars from "./components/ParticipantAvatars";

import { stepsData } from "../../constants/steps";
import { getNavConfig } from "@/constants/navConfig";
import { generateTimelineItems, formatDisplayDate } from "./utils/shipmentsUtils";
import { Button } from "@/components/ui/button";
import ShipmentMapWrapper from "./components/map/ShipmentMapWrapper";

function ShipmentDetails({ shipment }) {
  const { t } = useTranslation();
  const cargoNav = getNavConfig(t).cargoNav;
  const shipmentSupportNav = getNavConfig(t).shipmentSupport;

  const timelineItems = useMemo(() => generateTimelineItems(shipment, stepsData), [shipment]);

  return (
    <article className="p-4 space-y-8 dashContentMax">
      <header className="flex items-start gap-8">
        <div className="w-1/2 space-y-4 pr-8">
          <div className="flex justify-between gap-4 items-center">
            <h2 className="large font-semibold">{t('shipments.shipmentDetails.shipmentTitle', { shipmentNumber: shipment.number })}</h2>
            <ShipmentStatusBadge status={shipment.status} />
          </div>
          <div className="flex justify-between gap-4 items-center">
            <p className="flex gap-4 text-sm">
              <span>{t('shipments.shipmentDetails.containerCount', { count: shipment.containerCount })}</span>
              <span><b>{t('shipments.shipmentDetails.etd')}</b> {formatDisplayDate(shipment.etd)}</span>
              <span><b>{t('shipments.shipmentDetails.lastUpdate')}</b> {formatDisplayDate(shipment.lastUpdated)}</span>
            </p>
            <ContainerDetailsDialog shipment={shipment} />
          </div>
        </div>
        <div className="w-1/2 ml-auto flex justify-end gap-8 items-start">
          <div className="w-1/2 border-l px-8 border-primary text-sm">
            <p><b>{t('shipments.shipmentDetails.vesselVehicle')}</b> {shipment.vesselName}</p>
            <p><b>{t('shipments.shipmentDetails.voyage')}</b> {shipment.voyage}</p>
          </div>
          <div className="w-1/2 border-l px-8 border-primary text-sm">
            <p><b>{t('shipments.shipmentDetails.eta')}</b> {formatDisplayDate(shipment.eta)}</p>
            <p><b>{t('shipments.shipmentDetails.transshipment')}</b> {shipment.transshipmentPorts}</p>
            {shipment.delay !== "No delay" && <small className="text-secondary font-semibold">{shipment.delay}</small>}
          </div>
        </div>
      </header>

      <section className="flex gap-8">
        <div className="w-1/3 space-y-4">
          <h3 className="large">{t('shipments.shipmentDetails.timeline')}</h3>
          <AmbTimeline items={timelineItems} />
        </div>
        <div className="w-2/3 space-y-4">
          <h3 className="large">{t('shipments.shipmentDetails.shipmentMap')}</h3>
          <ShipmentMapWrapper
            origin={shipment.originCoord}
            destination={shipment.destinationCoord}
            mode={shipment.mode}
            mapHeight="300px"
          />
          <div className="flex gap-2 flex-wrap">
            {cargoNav.map((link) => (
              <Link key={link.path} className="cursor-pointer" to={link.path}>
                <Button variant={'outline'} className="cursor-pointer flex-wrap break-words">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
          <div className="flex items-stretch gap-8">
            <div className="w-3/12 flex flex-col gap-2 justify-between">
              {shipmentSupportNav.map((link) => (
                <Link key={link.path} className="cursor-pointer w-full" to={link.path}>
                  <Button variant={'outline'} className="cursor-pointer w-full whitespace-break-spaces h-max">
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
            <ImageCarousel images={shipment.images} />
            <ParticipantAvatars participants={shipment.participants} />
          </div>
        </div>
      </section>
    </article>
  );
}
export default memo(ShipmentDetails);