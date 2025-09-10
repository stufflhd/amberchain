import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { participants as allParticipants } from "@/constants/participants";
import { cn } from "@/lib/utils";
import ParticipantsManager from "@/features/participants";

export default function ParticipantAvatars({ participants, className = '' }) {
    const { t } = useTranslation();
    const participantObjs = participants
        .map(pid => allParticipants.find(p => p.id === pid))
        .filter(Boolean);

    const maxVisible = 4;
    const visibleParticipants = participantObjs.slice(0, maxVisible);
    const hiddenCount = participantObjs.length - maxVisible;

    return (
        <div className={cn("w-4/12 flex flex-col items-center mt-12 space-y-4", className)}>
            <h3 className="large">{t('shipments.shipmentDetails.participants')}</h3>
            {participantObjs.length > 0 ? (
                <>
                    <div className="bg-muted flex items-center rounded-full p-0.5">
                        <div className="flex -space-x-3">
                            {visibleParticipants.map((p, index) => (
                                <img
                                    key={index}
                                    className="ring-muted rounded-full ring-2"
                                    src={p.avatarUrl}
                                    width={40}
                                    height={40}
                                    alt={p.name}
                                />
                            ))}
                        </div>
                        {hiddenCount > 0 && (
                            <Button
                                variant="secondary"
                                className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent -ml-2"
                            >
                                +{hiddenCount}
                            </Button>
                        )}
                    </div>
                    <ParticipantsManager participants={participants} />
                </>
            ) : (
                <p className="text-sm text-muted-foreground">{t('shipments.shipmentDetails.noParticipants')}</p>
            )}
        </div>
    );
};