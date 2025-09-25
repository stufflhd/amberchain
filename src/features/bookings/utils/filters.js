export const buildModeFilterOptions = (t) => ([
    { value: "Sea", label: t('modes.sea') },
    { value: "Air", label: t('modes.air') },
    { value: "Road", label: t('modes.road') },
    { value: "Rail", label: t('modes.rail') },
    { value: "E-BUSINESS", label: t('modes.ebusiness') },
]);

export const buildStatusFilterOptions = (t) => ([
    { value: "Confirmed", label: t('bookings.status.confirmed') },
    { value: "Pending", label: t('bookings.status.pending') },
    { value: "Cancelled", label: t('bookings.status.cancelled') },
]);

export const buildTabsFilterConfig = (t) => ({
    columnId: "mode",
    options: buildModeFilterOptions(t),
    allLabel: t('common.all'),
});


