import useLoadingStore from "@/store/useLoadingStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function RootLayout() {
    const { isLoadingGlobally } = useLoadingStore();

    useEffect(() => {
        if (isLoadingGlobally) {
            document.body.classList.add("BodyLoading");
        } else {
            document.body.classList.remove("BodyLoading");
        }
    }, [isLoadingGlobally]);

    return (
        <>
            <Outlet />
            <Toaster />
        </>
    );
}
