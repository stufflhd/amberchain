import { toast } from 'sonner';
import useLoadingStore from '@/store/useLoadingStore';

export async function handleApiRequest(promiseFn, messages = {}) {
    const setIsLoadingGlobally = useLoadingStore.getState().setIsLoadingGlobally;
    const toastId = toast.loading(messages.loading || 'Loading...');

    try {
        setIsLoadingGlobally(true);
        const result = await promiseFn();
        toast.success(messages.success || 'Success!', { id: toastId });
        return result;
    } catch (error) {
        const errorMessage = error?.message || messages.error || 'An error occurred';
        toast.error(errorMessage, { id: toastId });
        throw error;
    } finally {
        setIsLoadingGlobally(false);
    }
}