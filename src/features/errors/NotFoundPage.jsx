import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function NotFoundPage() {
    const { t } = useTranslation();
    return (

        <div className="font-sans h-screen text-center flex flex-col items-center justify-center">
            <div>
                <h1 className="next-error-h1 inline-block mr-5 pr-5 text-2xl font-medium align-top leading-[49px] border-r ">404</h1>
                <div className="inline-flex items-center gap-1">
                    <h2 className="text-sm font-normal leading-[49px] m-0">
                        {t('notFound.title')}
                    </h2>
                    <a href="/" className="text-sm hover:underline underline-offset-2">{t('notFound.cta')}</a>
                </div>
            </div>
        </div>
    )
}
