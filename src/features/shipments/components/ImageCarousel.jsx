import { useTranslation } from "react-i18next";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ImageCarousel({ images }) {
    const { t } = useTranslation();

    if (!images || images.length === 0) {
        return (
            <div className="w-5/12 px-4 flex items-center justify-center bg-muted rounded-md">
                <p className="text-muted-foreground text-sm">{t('shipments.shipmentDetails.noImages')}</p>
            </div>
        );
    }

    return (
        <div className="w-5/12 px-4 items-center flex">
            <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full [&_[data-slot='carousel-content']]:rounded-md [&_[data-slot='carousel-content']]:h-full h-full"
            >
                <CarouselContent className="h-full [&_[data-slot='carousel-item']]:bg-primary/10  [&_img]:w-full [&_img]:h-full [&_img]:absolute [&_img]:inset-0 [&_img]:object-cover [&_[data-slot='carousel-item']]:overflow-hidden [&_[data-slot='carousel-item']]:relative">
                    {images.map((src, index) => (
                        <CarouselItem key={index}>
                            <img src={src} alt={t('shipments.shipmentDetails.imageAlt', { index: index + 1 })} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};