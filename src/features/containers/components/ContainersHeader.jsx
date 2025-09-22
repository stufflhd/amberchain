import { useTranslation } from "react-i18next";
import DashNav from "@/components/dashboard/DashNav";
import DashboardSearch from "@/components/dashboard/DashboardSearch";

export default function ContainersHeader() {
    const { t } = useTranslation();
    return (
        <div className="gap-4 flex flex-col">
            <DashNav DashTitle={t('pageTitles.containers-view')} />
            <DashboardSearch />
        </div>
    );
}


