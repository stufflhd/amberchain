// CompareResults.jsx (updated)
import React from "react"
import { useShipmentStore } from "../../../../store/shipmentStore"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Weight, Plane, Truck, Ship, Package, CalendarClock, AlertCircle, Clock, Package2, Container, Building2, Timer } from "lucide-react"
import ShipmentMap from "@/components/map/ShipmentMap"
import BookingForm from "./BookingForm"
import { useGeocoding } from "@/hooks/useGeocoding"
import "@/App.css"

export default function CompareResults() {
  const { data } = useShipmentStore()
  const [expanded, setExpanded] = React.useState(false)
  const price = data.price ?? (data.mode === "Air" ? "1,200" : "450")
  
  // Geocode the locations for the map
  const { coordinates: originCoords, isLoading: originLoading, error: originError } = useGeocoding(data.pol)
  const { coordinates: destinationCoords, isLoading: destLoading, error: destError } = useGeocoding(data.pod)
  
  const modeIcon = {
    Air: <Plane className="w-5 h-5 text-primary" />,
    Road: <Truck className="w-5 h-5 text-primary" />,
    Sea: <Ship className="w-5 h-5 text-primary" />,
  }[data.mode] || <Package className="w-5 h-5 text-muted-foreground" />

  function TimelineStep({ label, value, icon, isActive = false, isLast = false }) {
    return (
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}>
          {icon}
        </div>
        <div className="flex-1 pb-6">
          <div className="text-sm font-medium text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground mt-1">{value || "—"}</div>
          {!isLast && (
            <div className="absolute left-4 top-8 w-0.5 h-6 bg-border"></div>
          )}
        </div>
      </div>
    )
  }

  return (
    <Card 
      className="mx-auto my-8 border shadow-sm transition-all duration-300 bg-card text-card-foreground w-full max-w-6xl cursor-pointer hover:shadow-md"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Updated Header Layout */}
      <CardHeader className="border-b p-4 bg-muted/40">
        <div className="flex items-center justify-between">
          {/* Left: Company Name */}
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">
                Amber Chains Logistics
              </CardTitle>
              <CardDescription className="text-sm">Shipping Partner</CardDescription>
            </div>
          </div>
          
          {/* Center: Service Type, Commodity, and Route */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-1">
              {modeIcon}
              <span className="text-lg font-bold">{data.mode || "—"} FCL</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{data.commodity || "No commodity selected"}</div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {data.pol ? data.pol.split(',')[0].trim() : "—"} → {data.pod ? data.pod.split(',')[0].trim() : "—"}
              </span>
            </div>
          </div>
          
          {/* Right: Days Left, Price, Weight, and Book Button */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">5 days left</span>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-muted-foreground">Price</div>
                <div className="text-lg font-bold text-success">${price}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Weight className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">{data.grossWeight ? `${data.grossWeight} kg` : "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold px-4 py-2"
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  setExpanded(!expanded)
                }}
                className="text-xs font-medium px-3 py-2"
                size="sm"
              >
                {expanded ? "Hide" : "Details"}
                <CalendarClock className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {expanded && (
          <div className="p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
            {/* Top Section: Timeline and Map - Equal Height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column - Timeline */}
              <div className="lg:col-span-5">
                <div className="bg-card rounded-xl border p-6 shadow-sm h-[400px] flex flex-col">
                  <h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Route Timeline
                  </h3>
                  <div className="relative flex-1">
                    <TimelineStep 
                      label="Port of Loading (POL)" 
                      value={data.pol} 
                      icon={<MapPin className="w-4 h-4" />}
                      isActive={true}
                    />
                    {data.pold && (
                      <TimelineStep 
                        label="Port of Loading Discharge (POLD)" 
                        value={data.pold} 
                        icon={<Package2 className="w-4 h-4" />}
                        isActive={true}
                      />
                    )}
                    {data.polr && (
                      <TimelineStep 
                        label="Port of Loading Receipt (POLR)" 
                        value={data.polr} 
                        icon={<Package2 className="w-4 h-4" />}
                        isActive={true}
                      />
                    )}
                    <TimelineStep 
                      label="Port of Discharge (POD)" 
                      value={data.pod} 
                      icon={<MapPin className="w-4 h-4" />}
                      isActive={true}
                      isLast={true}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Map */}
              <div className="lg:col-span-7">
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden h-[400px]">
                  {originLoading || destLoading ? (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        Loading map coordinates...
                      </div>
                    </div>
                  ) : originError || destError ? (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                      <div className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        Unable to load map coordinates
                      </div>
                    </div>
                  ) : originCoords && destinationCoords ? (
                    <ShipmentMap 
                      origin={originCoords} 
                      destination={destinationCoords} 
                      mapHeight="400px" 
                      mode={data.mode} 
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-muted/50">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Enter valid locations to view map
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Bottom Section: Booking Form */}
            <BookingForm />
          </div>
        )}

      </CardContent>
    </Card>
  )
}


