import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, HelpCircle } from "lucide-react";

export default function PopUp({ showSuccessPopup, setShowSuccessPopup }) {
  const wizardOptions = {
    "Logistics Services": {
      subOptions: [
        { value: "freight-forwarding", label: "Freight Forwarding", description: "Complete end-to-end freight management services including booking, tracking, and delivery coordination" },
        { value: "warehousing", label: "Warehousing", description: "Secure storage facilities with advanced inventory management and distribution capabilities" }
      ]
    },
    Transportation: {
      subOptions: [
        { value: "domestic-shipping", label: "Domestic Shipping", description: "Fast and reliable domestic delivery services with real-time tracking and guaranteed delivery times" },
        { value: "international-shipping", label: "International Shipping", description: "Global shipping solutions with comprehensive customs support and international logistics expertise" }
      ]
    },
    "Customs & Compliance": {
      subOptions: [
        { value: "customs-clearance", label: "Customs Clearance", description: "Professional customs documentation and clearance services ensuring smooth border crossings" },
        { value: "trade-compliance", label: "Trade Compliance", description: "Comprehensive regulatory compliance services to meet international trade requirements" },
        { value: "certification", label: "Certification", description: "Product certification and quality assurance services for international market compliance" },
        { value: "insurance", label: "Insurance", description: "Comprehensive cargo and liability insurance coverage for complete shipment protection" },
        { value: "inspection", label: "Inspection", description: "Professional quality inspection and verification services ensuring product standards" },
        { value: "documentation", label: "Documentation", description: "Complete trade documentation management including certificates, permits, and compliance papers" },
        { value: "consulting", label: "Consulting", description: "Expert trade and logistics consulting services for strategic supply chain optimization" }
      ]
    }
  };

  const mainCategories = Object.keys(wizardOptions);

  const [selectedMain, setSelectedMain] = useState(mainCategories[0]);
  const [selectedSub, setSelectedSub] = useState(wizardOptions[mainCategories[0]].subOptions[0].value);

  const handleMainSelect = (main) => {
    const firstSub = wizardOptions[main].subOptions[0];
    setSelectedMain(main);
    setSelectedSub(firstSub.value);
  };

  const handleSubSelect = (sub) => {
    setSelectedSub(sub.value);
  };

  const currentDescription = wizardOptions[selectedMain].subOptions.find(sub => sub.value === selectedSub)?.description;

  return (
    <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
    <DialogContent className="max-w-3xl sm:max-w-2xl p-0">
  <DialogHeader className="p-6 pb-4">
    <div className="flex justify-between items-center">
      <DialogTitle className="text-xl font-semibold">Select Service Type</DialogTitle>
    </div>
  </DialogHeader>

  <div className="px-6 pb-4">
    {/* Main Categories - Flexible grid */}
    <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-2 mb-6">
      {mainCategories.map((main) => (
        <Button
          key={main}
          variant={selectedMain === main ? "default" : "outline"}
          className={`h-12 rounded-md px-3 break-words ${
            selectedMain === main 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
              : "bg-background hover:bg-accent text-foreground border border-border"
          }`}
          onClick={() => handleMainSelect(main)}
        >
          <span className="text-sm font-medium text-center">{main}</span>
        </Button>
      ))}
    </div>

    {/* Sub Options - Flexible wrap */}
    <div className="flex flex-wrap gap-2 mb-6">
      {wizardOptions[selectedMain].subOptions.map((sub) => (
        <Button
          key={sub.value}
          variant={selectedSub === sub.value ? "default" : "outline"}
          className={`flex-1 min-w-[120px] h-12 rounded-none border-r-0 last:border-r ${
            selectedSub === sub.value 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
              : "bg-background hover:bg-accent text-foreground border-border"
          }`}
          onClick={() => handleSubSelect(sub)}
        >
          <span className="text-sm font-medium">{sub.label}</span>
        </Button>
      ))}
    </div>

    {/* Description */}
    <div className="bg-muted p-4 rounded-lg mb-4">
      <p className="text-sm text-muted-foreground leading-relaxed">
        {currentDescription}
      </p>
    </div>

    {/* Terms Question Mark */}
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">INCOTERMS</span>
      <HelpCircle className="h-4 w-4 text-muted-foreground" />
    </div>
  </div>

  {/* Footer */}
  <div className="px-6 py-4 bg-muted/50 border-t">
    <div className="flex justify-center">
      <Button 
        onClick={() => setShowSuccessPopup(false)} 
        className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2"
      >
        Confirm Selection
      </Button>
    </div>
  </div>
</DialogContent>

    </Dialog>
  );
}
