import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function useDocumentTitle(title) {
    const { t, i18n } = useTranslation();
    useEffect(() => {
        if (title) {
            title == 'AMBERCHAINS' ? document.title = title : document.title = `${t(title)} | AMBERCHAINS`
        };
    }, [title, i18n.language]);
}