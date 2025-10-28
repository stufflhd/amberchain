import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"
import { useNavigate } from "react-router-dom"

const modeImages = {
  sea: "https://c.pxhere.com/photos/70/2a/freighter_ship_cargo_shipping_transport_industry_transportation_freight-553552.jpg!d",
  air: "https://c.pxhere.com/photos/94/38/plane_air_force_military_flight_fly_airplane_transportation-816197.jpg!d",
  road: "https://c.pxhere.com/photos/67/0c/truck_semi_truck_semi_truck_desert_new_mexico_weigh_station_transportation_shipping-593542.jpg!d",
  rail: "https://images.pexels.com/photos/11560608/pexels-photo-11560608.jpeg",
  ecommerce: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"
}

export function BookingConfirmationPopup({ isOpen, onClose, bookingData }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (bookingData) {
      localStorage.setItem("submittedBooking", JSON.stringify(bookingData))
    }
  }, [bookingData])

  const handleViewQuotations = () => {
    navigate("/quotations")
    onClose()
  }

  const selectedMode = bookingData?.mode || "ecommerce"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
     <DialogContent className="sm:max-w-2xl p-6"> {/* wider popup */}
  <div className="flex flex-col items-center text-center">
    <div className="w-full mb-6 rounded-2xl overflow-hidden shadow-xl">
      <img
        src={modeImages[selectedMode] || modeImages["ecommerce"]}
        alt={selectedMode}
        className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <DialogTitle className="text-3xl font-bold text-primary mb-2">
      Booking Confirmed!
    </DialogTitle>

    <DialogDescription className="text-sm text-muted-foreground dark:text-muted-foreground/80 mb-6 max-w-[90%]">
      Your booking has been successfully submitted. You can now view and manage your quotations.
    </DialogDescription>
  </div>

  <div className="flex flex-col sm:flex-row gap-3">
    <Button 
      onClick={handleViewQuotations}
      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
      size="lg"
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      View Quotations
    </Button>
    <Button 
      onClick={onClose}
      variant="outline" 
      className="flex-1"
      size="lg"
    >
      Close
    </Button>
  </div>
</DialogContent>

    </Dialog>
  )
}
