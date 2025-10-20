import { toast } from "sonner";
import useLoadingStore from "@/store/useLoadingStore";

const formatErrorMessage = (error) => {
  if (error.errors && Array.isArray(error.errors)) {
    return error.errors
      .map((err) => {
        const field = err.field
          ? err.field
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
              .replace("dto ", "")
              .trim()
          : "Field";

        return `${field}: ${err.defaultMessage || "Invalid value"}`;
      })
      .join("\n");
  }

  return error.message || "An error occurred. Please try again.";
};

export async function handleApiRequest(promiseFn, messages = {}) {
  const setIsLoadingGlobally = useLoadingStore.getState().setIsLoadingGlobally;
  const toastId = toast.loading(messages.loading || "Loading...");

  try {
    setIsLoadingGlobally(true);
    const result = await promiseFn();
    toast.success(messages.success || "Success!", { id: toastId });
    return result;
  } catch (error) {
    let errorMessage = messages.error || "An error occurred. Please try again.";

    try {
      if (error.isValidationError) {
        const errorData = JSON.parse(error.message);
        if (errorData) {
          errorMessage = formatErrorMessage(errorData);
        }
      } else {
        errorMessage = error.message || errorMessage;
      }
    } catch (e) {
      errorMessage = e.message || errorMessage;
    }

    toast.error(errorMessage, {
      id: toastId,
      duration: errorMessage.includes("\n") ? 10000 : 5000,
    });
    throw error;
  } finally {
    setIsLoadingGlobally(false);
  }
}
