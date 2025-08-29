import shipmentsData from '@/constants/shipments.json';

const searchShipments = (searchTerm) => {
    if (!searchTerm) return [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return shipmentsData.filter(shipment => {
        return Object.values(shipment).some(value =>
            String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );
    }).map(shipment => ({ ...shipment, type: 'shipment' }));
};

export const searchAll = async ({ searchTerm = '' }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const shipmentResults = searchShipments(searchTerm);
    return [...shipmentResults];
};

export const fetchAllShipments = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return shipmentsData;
};