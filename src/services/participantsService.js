import { participants as participantsData } from '@/constants/participants';

export const searchParticipants = async (searchTerm) => {
    await new Promise(resolve => setTimeout(resolve, 300));

    if (!searchTerm) return participantsData;
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return participantsData.filter(participant => {
        return Object.values(participant).some(value =>
            String(value).toLowerCase().includes(lowerCaseSearchTerm)
        );
    });
};

export const addParticipant = async (participant) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        success: true,
        participant: {
            ...participant,
            id: `P${Date.now()}`
        }
    };
};
