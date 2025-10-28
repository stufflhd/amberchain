import React from "react";
import TrackingIcon from "./icons/TrackingIcon";
import ChecklistIcon from "./icons/ChecklistIcon";
import TransportationIcon from "./icons/TransportationIcon";
import LoaderIcon from "./icons/LoaderIcon";
import ErrorIcon from "./icons/ErrorIcon";
import SuccessIcon from "./icons/SuccessIcon";

// Timeline step template
function TimelineStep({ label, value, icon, optional }) {
  return (
    <div className="flex items-start gap-3 relative">
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground z-10 ${optional ? 'opacity-60 scale-75' : ''}`}
        title={optional ? 'Optional' : undefined}
      >
        {icon}
      </div>
      <div className="flex-1 pb-8">
        <div className="text-sm font-medium text-foreground flex items-center gap-2">
          {label}
          {optional && (
            <span className="text-xs text-muted-foreground italic ml-1">(optional)</span>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{value || "—"}</div>
      </div>
    </div>
  );
}

// Timeline template component
export default function CompareTimelineTemplate({ steps }) {
  // Example steps if none provided
  const defaultSteps = [
    {
      label: "Port of Loading (POL)",
      value: "Shanghai, CN",
      icon: <TransportationIcon className="w-5 h-5" />,
    },
    {
      label: "Port of Loading Receipt (PLOR)",
      value: "Warehouse, CN",
      icon: <ChecklistIcon className="w-5 h-5" />,
      optional: true,
    },
    {
      label: "Port of Loading Discharge (PLOD)",
      value: "Depot, SG",
      icon: <ChecklistIcon className="w-5 h-5" />,
      optional: true,
    },
    {
      label: "Port of Discharge (POD)",
      value: "Singapore, SG",
      icon: <TransportationIcon className="w-5 h-5" />,
    },
  ];
  const timelineSteps = steps || defaultSteps;

  return (
    <div className="bg-card rounded-xl border p-6 shadow-sm w-full max-w-lg mx-auto">
      <h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
        <LoaderIcon size={5} color="primary" />
        Route Timeline
      </h3>
      <div className="flex flex-col gap-6">
        {timelineSteps.map((step, idx) => (
          <TimelineStep key={idx} {...step} />
        ))}
      </div>
    </div>
  );
}
