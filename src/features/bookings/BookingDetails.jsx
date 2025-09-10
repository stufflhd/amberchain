import { memo } from "react";
import { useTranslation } from "react-i18next";
import { HardHat } from "lucide-react";

import ShipmentMapWrapper from "../../components/map/ShipmentMapWrapper";
import ParticipantAvatars from "../participants/ParticipantAvatars";
import BookingTabs from "./components/BookingTabs";
import BookingStatusTimeline from "./components/BookingStatusTimeline";
import BookingRoute from "./components/BookingRoute";
import { formatDisplayDate } from "./utils/bookingsUtils";
import i18n from "@/i18n";
import { cn } from "@/lib/utils";

function BookingDetails({ booking }) {

    const { t } = useTranslation();

    const sectionClassNames = "border-t border-primary/50 pt-8";

    return (
        <article className="p-2 sm:p-6 space-y-4 sm:space-y-8 dashContentMax2">
            {/* Top Section */}
            <section className="flex flex-col lg:flex-row justify-between gap-8">
                {/* Left Side */}
                <div className="lg:w-5/12 space-y-8">
                    <h2 className="text-xl font-bold">{t('bookings.table.columns.bookingId')}: {booking.id}</h2>
                    <BookingStatusTimeline timeline={booking.timeline} />
                    <div className="flex items-center gap-4 justify-between">
                        <div className="flex items-start gap-2 text-sm">
                            <HardHat className="h-6 w-6 text-primary mt-1.5" />
                            <span className="text-base">{booking.equipmentIds.length} {t('bookings.details.equipments')} <br /> {t('bookings.table.columns.readinessDate')}: {formatDisplayDate(booking.readinessDate, { lang: i18n.language })}</span>
                        </div>
                        <ParticipantAvatars participants={booking.participantIds} className="mt-0" />
                    </div>
                </div>

                {/* Devider */}
                <div className="flex flex-col justify-stretch items-center w-[1px]" >
                    <div className="w-1 h-full border-l border-primary/50" />
                </div>
                {/* Right Side */}
                <div className="lg:w-7/12 space-y-3">
                    <BookingRoute route={booking.route} />
                    <ShipmentMapWrapper
                        origin={booking.originCoord}
                        destination={booking.destinationCoord}
                        mode={booking.mode}
                        mapHeight="300px"
                    />
                </div>
            </section>

            {/* Middle and Bottom Section */}
            <section className={cn(sectionClassNames)}>
                <BookingTabs booking={booking} />
            </section>

        </article>
    );
}

export default memo(BookingDetails);