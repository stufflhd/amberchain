import { fetchContainers } from "@/services/containersService";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetch containers for a specific shipment
 */
export const useContainersQuery = ({ enabled = true, shipmentId }) => {
    return useQuery({
        queryKey: ['containers', shipmentId],
        queryFn: () => fetchContainers(shipmentId),
        enabled: !!shipmentId && enabled,
    });
};
