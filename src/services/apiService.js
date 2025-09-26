import shipmentsData from '@/constants/shipments.json';
import bookingsData from '@/constants/bookings.json';
import quotationsData from '@/constants/quotations.json';

// --- Shipments ---
const searchShipments = (searchTerm) => {
    if (!searchTerm) return [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return shipmentsData.filter(shipment => {
        return Object.values(shipment).some(value =>
            String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );
    }).map(shipment => ({ ...shipment, type: 'shipment' }));
};

export const fetchAllShipments = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return shipmentsData.filter((item) => item.status === 'active');
};

// --- Bookings ---
const searchBookings = (searchTerm) => {
    if (!searchTerm) return [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return bookingsData.filter(booking => {
        return Object.values(booking).some(value =>
            String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );
    }).map(booking => ({ ...booking, type: 'booking' }));
};

export const fetchAllBookings = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return bookingsData;
};

// --- Quotations ---
const searchQuotations = (searchTerm) => {
    if (!searchTerm) return [];
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return quotationsData.filter(q => {
        return Object.values(q).some(value => String(value).toLowerCase().includes(lowerCaseSearchTerm));
    }).map(q => ({ ...q, type: 'quotation' }));
};

export const fetchAllQuotations = async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return quotationsData;
};

// --- Combined Search ---
export const searchAll = async ({ searchTerm = '' }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const shipmentResults = searchShipments(searchTerm);
    const bookingResults = searchBookings(searchTerm);
    const quotationResults = searchQuotations(searchTerm);
    return [...shipmentResults, ...bookingResults, ...quotationResults];
};