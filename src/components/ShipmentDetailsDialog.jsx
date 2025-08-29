import React from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ShipmentMap } from "./ShipmentMap";
import { Separator } from "@/components/ui/separator";
import { Package, User, MapPin, Calendar, Ship, AlertCircle, Anchor, Warehouse } from "lucide-react";

const SummaryItem = ({ icon, label, value }) => (
    <div className="text-sm">
        <div className="flex items-center text-muted-foreground">
            {React.cloneElement(icon, { className: "h-4 w-4 mr-2" })}
            <span>{label}</span>
        </div>
        <p className="font-semibold text-foreground mt-1">{value}</p>
    </div>
);

const RouteStep = ({ icon, title, subtitle, isLast = false }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                    {React.cloneElement(icon, { className: "h-5 w-5 text-primary" })}
                </div>
            </div>
            {!isLast && <div className="w-px h-full border-l-2 border-dashed" />}
        </div>
        <div className="pb-8 pt-1">
            <p className="font-semibold text-foreground">{title}</p>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
    </div>
);

export function ShipmentDetailsDialog({ shipment, onClose }) {
  const isOpen = !!shipment;
  
  if (!isOpen) return null;

  const routeSteps = shipment.route || [
    { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: <Warehouse /> },
    { name: "Port of Rotterdam", type: "Port of Loading", icon: <Anchor /> },
    { name: "Port of Shanghai", type: "Port of Discharge", icon: <Anchor /> },
    { name: "Shanghai, China", type: "Place of Discharge", icon: <MapPin /> },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full !max-w-6xl p-0 border-0 overflow-hidden" style={{ height: '600px' }}>
        <div className="relative w-full h-full">
          {shipment.origin && shipment.destination && (
            <ShipmentMap origin={shipment.origin} destination={shipment.destination} />
          )}

          <div className="absolute top-0 left-0 h-full w-[400px] bg-background/80 backdrop-blur-sm shadow-2xl flex flex-col">
            <div className="p-6 space-y-4 flex-shrink-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">{shipment.shipmentId}</h2>
                        <p className="text-sm text-muted-foreground">{shipment.docType}</p>
                    </div>
                    <Badge className="text-sm py-1 px-3">{shipment.status}</Badge>
                </div>
            </div>

            <Separator />

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Route</h3>
                    {routeSteps.map((step, index) => (
                        <RouteStep 
                            key={index}
                            icon={step.icon}
                            title={step.name}
                            subtitle={step.type}
                            isLast={index === routeSteps.length - 1}
                        />
                    ))}
                </div>

                <Separator />
                
                <div>
                    <h3 className="text-lg font-semibold mb-4">Summary</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        <SummaryItem icon={<User />} label="Customer" value={shipment.customer} />
                        <SummaryItem icon={<Package />} label="Mode" value={shipment.mode} />
                        <SummaryItem icon={<Calendar />} label="Departure" value={shipment.departure} />
                        <SummaryItem icon={<Calendar />} label="ETA" value={shipment.eta} />
                        <SummaryItem icon={<Ship />} label="Current Stage" value={shipment.stage} />
                        <SummaryItem icon={<AlertCircle />} label="Alerts" value={shipment.alerts} />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}