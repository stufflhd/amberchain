import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import DetailsTab from "./DetailsTab";
import EquipmentTab from "./EquipmentTab";
import BookingActions from "./BookingActions";
import DocumentsTab from "./DocumentsTab";
import EVGMTab from "./EVGMTab";
import ShippingInstructionTab from "./ShippingInstruction";
import PaymentTab from "./PaymentTab";

export default function BookingTabs({ booking }) {

    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("details");

    const tabs = [
        { id: "details", label: t('bookings.details.tabs.details') },
        { id: "equipment", label: t('bookings.details.tabs.equipment') },
        { id: "documents", label: t('bookings.details.tabs.documents') },
        { id: "evgm", label: t('bookings.details.tabs.evgm') },
        { id: "shippingInst", label: t('bookings.details.tabs.shippingInst') },
        { id: "payment", label: t('bookings.details.tabs.payment') }
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case "details":
                return <DetailsTab booking={booking} />;
            case "equipment":
                return <EquipmentTab equipmentIds={booking.equipmentIds} />;
            case "documents":
                return <DocumentsTab documentIds={booking.documentIds} />;
            case "evgm":
                return <EVGMTab evgmIds={booking.evgmIds} />;
            case "shippingInst":
                return <ShippingInstructionTab shippingInstructionIds={booking.shippingInstructionIds} />;
            case "payment":
                return <PaymentTab paymentIds={booking.paymentIds} />;
            default:
                return <div className="p-4 border rounded-md">{t('common.comingSoon')}</div>;
        }
    };

    return (
        <div className="space-y-8 w-full">
            <div className="flex justify-between">
                <ToggleGroup
                    type="single"
                    value={activeTab}
                    onValueChange={(value) => { if (value) setActiveTab(value) }}
                    variant="outline"
                >
                    {tabs.map(tab => (
                        <ToggleGroupItem key={tab.id} value={tab.id} className={'bg-background'}>
                            {tab.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
                <BookingActions actions={booking.actions} />
            </div>
            {renderTabContent()}
        </div>
    );
}