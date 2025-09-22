import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

export default function ParticipantsTabs({ activeTab, setActiveTab, tabs }) {
    const participantsTab = tabs.find(tab => tab.id === "participants");
    const addParticipantTab = tabs.find(tab => tab.id === "addParticipant");

    return (
        <div className="flex items-center justify-between w-full">
            <ToggleGroup
                type="single"
                value={activeTab === "participants" ? "participants" : undefined}
                onValueChange={(value) => { if (value) setActiveTab(value); }}
                variant="outline"
            >
                {participantsTab && (
                    <ToggleGroupItem value={participantsTab.id} className={'bg-background'}>
                        {participantsTab.label}
                    </ToggleGroupItem>
                )}
            </ToggleGroup>

            {addParticipantTab && (
                <Button variant="default" onClick={() => setActiveTab("addParticipant")} className={'rounded-full'}> 
                    {addParticipantTab.label}
                </Button>
            )}
        </div>
    );
}