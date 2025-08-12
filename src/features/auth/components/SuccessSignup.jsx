import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AnimatedGridPattern } from '@/components/magicui/AnimatedGridPattern'
import { cn } from '@/lib/utils'
import { t } from "i18next"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function SuccessSignup() {

    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const handleDialogClose = () => {
        setOpen(false);
        navigate('/auth/login');
    };

    return (
        <Dialog open={open} onOpenChange={(opened) => !opened && handleDialogClose()}>
            <DialogContent className="p-0 bg-transparent border-none shadow-none w-auto">
                <div className="relative flex h-auto w-full max-w-xl items-center justify-center overflow-hidden rounded-xl border bg-background p-10">
                    <AnimatedGridPattern
                        numSquares={40}
                        maxOpacity={0.07}
                        duration={3}
                        repeatDelay={1}
                        className={cn(
                            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
                        )}
                    />
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="flex items-center justify-center w-20 h-20 mb-8 bg-chart-2/20 rounded-full">
                            <div className="flex items-center justify-center w-16 h-16 bg-chart-2/30 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24">
                                    <path fill="#5dad49" d="M14.975,13.63c-0.97,0.97-2.55,0.97-3.51,0l-2.72-2.51c-0.39-0.39-0.39-1.03,0-1.42	c0.39-0.39,1.02-0.39,1.41,0l2.57,2.36c0.27,0.27,0.71,0.27,0.99,0l6.073-6.323c0,0,0-0.001-0.001-0.001l1.955-2.034	c0.39-0.39,0.39-1.02,0-1.41c-0.39-0.39-1.03-0.39-1.42,0l-1.321,1.376c-0.334,0.348-0.875,0.417-1.27,0.14	c-1.953-1.37-4.416-2.06-7.048-1.723c-4.561,0.584-8.202,4.362-8.637,8.939C1.43,17.513,7.034,22.887,13.587,21.877	c4.117-0.634,7.467-3.897,8.235-7.991c0.357-1.902,0.158-3.72-0.447-5.342c-0.196-0.525-0.883-0.655-1.271-0.252L14.975,13.63z"></path>
                                </svg>
                            </div>
                        </div>
                        <DialogTitle className="text-4xl font-bold ">
                            {t("SuccessSignup.title")}
                        </DialogTitle>
                        <DialogDescription className="mt-3 text-lg text-foreground/70">
                            {t("SuccessSignup.sub-title")}
                        </DialogDescription>
                        <div className="flex w-full gap-4 mt-8">
                            <Button className="flex-1" asChild>
                                <a href="/auth/login">{t("SuccessSignup.cta1")}</a>
                            </Button>
                            <Button className="flex-1" variant="outline" asChild>
                                <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer">{t("SuccessSignup.cta2")}</a>
                            </Button>
                        </div>
                        <div className="flex flex-col items-center mt-12">
                            <div className="relative z-50 flex -space-x-3">
                                <img
                                    className="w-10 h-10 border-2 rounded-full"
                                    src="https://i.pravatar.cc/40?img=34"
                                    alt="Avatar 01"
                                />
                                <img
                                    className="w-10 h-10 border-2 rounded-full"
                                    src="https://i.pravatar.cc/40?img=65"
                                    alt="Avatar 02"
                                />
                                <img
                                    className="w-10 h-10 border-2 rounded-full"
                                    src="https://i.pravatar.cc/40?img=13"
                                    alt="Avatar 03"
                                />
                                <img
                                    className="w-10 h-10 border-2 rounded-full"
                                    src="https://i.pravatar.cc/40?img=18"
                                    alt="Avatar 04"
                                />
                                <img
                                    className="w-10 h-10 border-2 rounded-full"
                                    src="https://i.pravatar.cc/40?img=8"
                                    alt="Avatar 05"
                                />
                            </div>
                            <p className="mt-4 text-sm text-foreground/50">
                                {t("SuccessSignup.footerP1")} <span className="font-semibold text-foreground/70">1,500+</span> {t("SuccessSignup.footerP2")}
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}