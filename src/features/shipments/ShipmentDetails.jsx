import React, { memo, useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AmbTimeline from "@/components/Timeline";
import StatusBadge from "@/components/StatusBadge";
import ImageCarousel from "./components/ImageCarousel";
import ParticipantAvatars from "../participants/ParticipantAvatars";
import ShipmentInfoHeader from "./components/ShipmentInfoHeader";
import ContainerDetailsDialog from "./components/ContainerDetailsDialog";
import { getNavConfig } from "@/constants/navConfig";
import { generateTimelineItems } from "./utils/shipmentsUtils";
import { Button } from "@/components/ui/button";
import ShipmentMapWrapper from "../../components/map/ShipmentMapWrapper";
import containersData from "../../constants/containers";
import { stepsData } from "../../constants/steps";

function ShipmentDetails({ shipment }) {
  const { t } = useTranslation();
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    const relevantContainers = containersData.filter(c => shipment.containerIds.includes(c.id));
    setContainers(relevantContainers);
  }, [shipment.containerIds]);

  const cargoNav = getNavConfig(t).cargoNav;
  const shipmentSupportNav = getNavConfig(t).shipmentSupport;
  const timelineItems = useMemo(() => generateTimelineItems(shipment, stepsData), [shipment]);

  return (
    <article className="p-2 sm:p-6 space-y-4 sm:space-y-8 dashContentMax">
      <ShipmentInfoHeader
        shipment={shipment}
        containerCount={containers.length}
      />
      <section className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-1/3 sm:space-y-4">
          <h3 className="large">{t('shipments.shipmentDetails.timeline')}</h3>
          <AmbTimeline items={timelineItems} />
        </div>
        <div className="w-full sm:w-2/3 space-y-4">
          <h3 className="large">{t('shipments.shipmentDetails.shipmentMap')}</h3>
          <ShipmentMapWrapper
            origin={shipment.originCoord}
            destination={shipment.destinationCoord}
            mode={shipment.mode}
            mapHeight="300px"
          />
          <div className="flex gap-2 flex-wrap">
            {cargoNav.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant={'outline'} className="flex-wrap break-words">
                  {link.label}
                </Button>
              </Link>
            ))}
          </div>
          <div className="flex items-stretch gap-8">
            <div className="w-3/12 flex flex-col gap-2 justify-between">
              {shipmentSupportNav.map((link) => (
                <Link key={link.path} className="w-full" to={link.path}>
                  <Button variant={'outline'} className="w-full whitespace-break-spaces h-max">
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