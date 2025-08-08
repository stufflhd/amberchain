import { useId, useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AgreementDialog({ title, sections = [{ title: '', content: '' }], onAgree, onOpen, triggerClassName = '' }) {
    const [hasReadToBottom, setHasReadToBottom] = useState(false);
    const contentRef = useRef(null);

    const handleScroll = () => {
        const content = contentRef.current
        if (!content) return

        const scrollPercentage =
            content.scrollTop / (content.scrollHeight - content.clientHeight)
        if (scrollPercentage >= 0.99 && !hasReadToBottom) {
            setHasReadToBottom(true);
        }
    }

    const id = useId();

    return (
        <Dialog
            onOpenChange={(open) => {
                if (open) onOpen?.()
            }}
        >
            <DialogTrigger asChild>
                <Button variant="link" className={`cursor-pointer p-0 font-normal text-xs underline underline-offset-4 text-primary hover:text-primary ${triggerClassName}`}>{title}</Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b px-6 py-4 text-base">
                        {title}
                    </DialogTitle>
                    <div
                        ref={contentRef}
                        onScroll={handleScroll}
                        className="overflow-y-auto"
                    >
                        <DialogDescription asChild>
                            <div className="px-6 py-4">
                                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                                    <div className="space-y-4">

                                        {
                                            sections.map((sec, index) => (
                                                <div className="space-y-1" key={`${id}-${index}`}>
                                                    <p><strong>{sec.title}</strong></p>
                                                    <p>
                                                        {sec.content}
                                                    </p>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <DialogFooter className="border-t px-6 py-4 sm:items-center">
                    {!hasReadToBottom && (
                        <span className="text-muted-foreground grow text-xs max-sm:text-center">
                            Read all terms before accepting.
                        </span>
                    )}
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" disabled={!hasReadToBottom} onClick={() => onAgree?.()}>
                            I agree
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}