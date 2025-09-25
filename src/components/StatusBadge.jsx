import React from "react";
import { Badge } from "@/components/ui/badge";
import SuccessIcon from "@/components/icons/SuccessIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import ActiveIcon from "@/components/icons/ActiveIcon";
import LoadingIcon from "./icons/LoadingIcon";

const getIconForStatus = (status) => {
    const value = (status || "").toString().toLowerCase();

    if (/(cancel|error|fail|reject|deliver|delay|return|issue)/.test(value)) {
        return <ErrorIcon/>;
    }

    if (/(confirm|finish|complete|loaded|stuffed|success)/.test(value)) {
        return <SuccessIcon/>;
    }

    if (/(pending|progress|processing|await|wait|new|ongoing)/.test(value)) {
        return <LoadingIcon/>;
    }

    return <ActiveIcon/>;
};

export default function StatusBadge({ status, variant = "outline", className = "leading-6 bg-background" }) {
    const Icon = getIconForStatus(status);
    return (
        <Badge variant={variant} className={className}>
            {Icon}
            {status || "-"}
        </Badge>
    );
}


