import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ParticipantsTabs({ activeTab, setActiveTab, tabs }) {
    return (
        <ToggleGroup
            type="single"
            value={activeTab}
            onValueChange={(value) => { if (value) setActiveTab(value) }}
            variant="outline"
        >
            {tabs.map(tab => (
                <ToggleGroupItem key={tab.id} value={tab.id} className={'bg-background'}>
                    {tab.label}
                </ToggleGroupItem>
            ))}
        </ToggleGroup>
    );
}