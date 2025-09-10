import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function BookingActions({ actions = [] }) {
    const { t } = useTranslation();

    const handleActionClick = (actionId) => {
        console.log(`Action clicked: ${actionId}`);
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {actions.map((action) => (
                <Button
                    key={action.id}
                    onClick={() => handleActionClick(action.id)}
                    disabled={!action.enabled}
                    variant={'outline'}
                    className={'cursor-pointer'}
                >
                    {t(action.label)}
                </Button>
            ))}
        </div>
    );
}