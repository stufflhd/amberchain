import React from 'react';
import { Badge } from "@/components/ui/badge";
import * as icons from "lucide-react";
import SuccessIcon from "@/components/icons/SuccessIcon";
import ErrorIcon from "@/components/icons/ErrorIcon";
import { format, parseISO } from 'date-fns';
import { enUS, fr } from 'date-fns/locale';
import ActiveIcon from '@/components/icons/ActiveIcon';

const iconComponents = {
    Package: icons.Package, Truck: icons.Truck, Anchor: icons.Anchor, Ship: icons.Ship,
    TrainFront: icons.TrainFront, Plane: icons.Plane, Warehouse: icons.Warehouse, MapPin: icons.MapPin,
    PlaneTakeoff: icons.PlaneTakeoff, PlaneLanding: icons.PlaneLanding, CheckCircle: icons.CheckCircle,
    User: icons.User, Bike: icons.Bike, FileText: icons.FileText, FolderClosed: icons.FolderClosed,
    ShoppingBag: icons.ShoppingBag, Package2: icons.Package2, Check: icons.Check,
};

const getStepIcon = (iconName) => {
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent className="mr-2 size-4" /> : <icons.Package className="mr-2 size-4" />;
};

export const getStatusConfig = (t) => ({
    active: { icon: <ActiveIcon />, text: t('shipments.status.active'), variant: "outline" },
    finished: { icon: <SuccessIcon />, text: t('shipments.status.finished'), variant: "outline" },
    delayed: { icon: <ErrorIcon />, text: t('shipments.status.delayed'), variant: "destructive" },
});

export const generateTimelineItems = (shipment, stepsData) => {
    if (!shipment?.route) return [];

    return shipment.route.map(routeStep => {
        const isCompleted = routeStep.completedSteps && routeStep.completedSteps.length > 0;
        if (!isCompleted) {
            return { label: routeStep.name, title: null, content: null, completed: false };
        }

        const stepsWithDetails = routeStep.completedSteps.map(stepValue => {
            const stepDetail = stepsData.find(s => s.value === stepValue);
            return (
                <Badge key={stepValue} variant={'outline'} className={'text-md bg-background/70 px-4'}>
                    {getStepIcon(stepDetail?.icon || 'Package')}
                    {stepDetail ? stepDetail.label : stepValue}
                </Badge>
            );
        });

        const title = stepsWithDetails.length > 0 ? stepsWithDetails[0] : null;
        const content = stepsWithDetails.length > 1 ? <div className="flex flex-col gap-2 mt-2">{stepsWithDetails.slice(1)}</div> : null;

        return { label: routeStep.name, title, content, completed: true };
    });
};

const locales = { en: enUS, fr };

export const formatDisplayDate = (dateString, { relative = false, lang = 'en' } = {}) => {
    if (!dateString) return "N/A";

    const date = parseISO(dateString);
    const locale = locales[lang] || enUS;

    if (relative) {
        return formatDistanceToNow(date, { addSuffix: true, locale });
    }

    return format(date, 'dd MMM yyyy, HH:mm', { locale });
};