import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "@/constants/langs";
import { GlobeIcon } from "lucide-react";
import { useId } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const id = useId();
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <Select value={i18n.language} onValueChange={changeLanguage}>
            <SelectTrigger
                id={`language-${id}`}
                className="rounded-full [&>svg]:text-muted-foreground/80 hover:bg-accent hover:text-accent-foreground px-2 max-h-8 shadow-none [&>svg]:shrink-0"
                aria-label="Select language">
                <GlobeIcon size={16} aria-hidden="true" />
                <SelectValue className="hidden sm:inline-flex h-min" placeholder=""/>
            </SelectTrigger>
            <SelectContent
                className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
                {languages.map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                        <span className="flex items-center gap-2">
                            <span className="truncate">{lang.label}</span>
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}