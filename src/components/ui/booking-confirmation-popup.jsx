import React from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, ExternalLink } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function BookingConfirmationPopup({ isOpen, onClose, bookingData }) {
  const navigate = useNavigate()

  const handleViewQuotations = () => {
    navigate("/quotations")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-primary">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your cold chain booking has been successfully submitted. You can now view and manage your quotations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-primary">Booking Summary</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><span className="font-medium">Cold Treatment:</span> {bookingData?.coldTreatment?.required ? "Yes" : "No"}</p>
              <p><span className="font-medium">Temperature Control:</span> {bookingData?.temperatureSchedule?.enabled ? "Yes" : "No"}</p>
              <p><span className="font-medium">Cargo Probes:</span> {bookingData?.probes?.numberOfCargoProbes || 0}</p>
              {bookingData?.cargo && (
                <p><span className="font-medium">Cargo Type:</span> {bookingData.cargo.packageType || "Not specified"}</p>
              )}
            </div>
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
