import containersData from '@/constants/containers.json';
const fetchContainersData = (shipmentId) => {
    if (!shipmentId) return [];
    return containersData;
};

export const fetchContainers = async (shipmentId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return fetchContainersData(shipmentId);
};
