import React, { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"
import { useNavigate } from "react-router-dom"

const modeImages = {
  sea: "/public/confetti-svgrepo-com.svg",
  air: "/public/confetti-svgrepo-com.svg",
  road: "/public/confetti-svgrepo-com.svg",
  rail: "/public/confetti-svgrepo-com.svg",
  ecommerce: "/public/confetti-svgrepo-com.svg"
  
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
className="w-full h-64 sm:h-80 object-contain bg-center bg-no-repeat"
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
