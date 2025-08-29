import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { getStatusConfig } from "../utils/shipmentsUtils";

export default function ShipmentStatusBadge({ status }) {
    const { t } = useTranslation();
    const statusConfig = getStatusConfig(t);
    const config = statusConfig[status] || statusConfig.active;

    return (
        <Badge variant={config.variant} className="leading-6 bg-background">
            {config.icon}
            {config.text}
        </Badge>
    );
}