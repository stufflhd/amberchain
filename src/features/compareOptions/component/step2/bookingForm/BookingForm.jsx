import React, { useState, useMemo, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { useShipmentStore } from "@/store/shipmentStore";
import { BookingConfirmationPopup } from "@/components/ui/booking-confirmation-popup";
import CargoDetailsSection from "./CargoDetailsSection";
import TemperatureControlSection from "./TemperatureControlSection";
import DeliveryRequirementsSection from "./DeliveryRequirementsSection";
import ServiceAddonsSection from "./ServiceAddonsSection";

function BookingForm() {
  const data = useShipmentStore((s) => s.data);
  const setField = useShipmentStore((s) => s.setField);

  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

  const handleBookNow = useCallback(() => {
    console.log("Booking data:", data);
    setShowConfirmationPopup(true);
  }, [data]);

  const shouldShowCargoInfo = useMemo(() => {
    const isHazardous = data.cargoType == "Hazardous" && ["sea", "rail", "road", "air"].includes(data.mode);
    const isOversized = 
      (data.cargoType == "Oversized" && ["sea", "rail", "road"].includes(data.mode)) ||
      (data.mode == "road" && data.shipmentType == "LTL") ||
      ["air", "ecommerce"].includes(data.mode);
    const hasPackageInfo = 
      (data.shipmentType == "LCL" && ["sea", "rail"].includes(data.mode)) ||
      (data.shipmentType == "LTL" && data.mode == "road") ||
      ["air", "ecommerce"].includes(data.mode);
    const isRoadFTL = data.mode == "road" && data.shipmentType == "FTL";
    const isAirStackable = data.mode == "air";

    return isHazardous || isOversized || hasPackageInfo || isRoadFTL || isAirStackable;
  }, [data.cargoType, data.mode, data.shipmentType]);

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 space-y-6">
      <div className="border-b border-border/50 pb-3">
        <h3 className="text-lg font-semibold text-foreground">Booking Details</h3>
        <p className="text-xs text-muted-foreground mt-0.5">Configure your shipment settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div className="space-y-6">
          {shouldShowCargoInfo && <CargoDetailsSection data={data} setField={setField} />}

          {data.cargoType == "Perishable" && ["sea", "rail", "road", "air"].includes(data.mode) && (
            <TemperatureControlSection data={data} setField={setField} />
          )}

          {data.mode == "road" && <DeliveryRequirementsSection data={data} setField={setField} />}
        </div>

        <ServiceAddonsSection data={data} setField={setField} />
      </div>

      <div className="flex justify-center pt-4 border-t border-border/50">
        <Button
          onClick={handleBookNow}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-12 h-11 rounded-lg shadow-sm hover:shadow transition-all"
        >
          Book Now
        </Button>
      </div>

      <BookingConfirmationPopup
        isOpen={showConfirmationPopup}
        onClose={() => setShowConfirmationPopup(false)}
        bookingData={data}
      />
    </div>
  );
}

export default memo(BookingForm);