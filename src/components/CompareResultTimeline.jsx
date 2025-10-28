import React from "react"
import { MapPin } from "lucide-react"

const CompareResultTimeline = ({ items }) => {
  const getIcon = (type, fillIcon = false) => {
    const iconClass = fillIcon ? "w-5 h-5 text-white" : "w-4 h-4 text-white"
    return <MapPin className={iconClass} />
  }

  return (
    <div className="w-full h-full flex flex-col justify-between relative">
      {items.map((item, index) => {
        const type = item.type?.toLowerCase()
        const isPLType = type === "plor" || type === "plod"
        const isMainPoint = type === "pol" || type === "pod"
        const isLast = index === items.length - 1

        return (
          <div
            key={index}
            className="relative flex gap-3 sm:gap-4 flex-1"
            style={{
              animation: `fadeInLeft 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Label */}
            <div className="w-20 sm:w-24 flex items-start justify-end pt-2 flex-shrink-0">
              {!isPLType && item.label && (
                <div
                  className="text-[10px] sm:text-xs font-semibold text-primary uppercase tracking-wide text-right leading-tight opacity-0"
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.15}s both`
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>

            {/* Middle Section */}
            <div className="relative flex flex-col items-center flex-shrink-0 flex-1">
              {/* Icon Circle */}
              <div
                className={`relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 hover:scale-110 ${
                  isMainPoint
                    ? "bg-primary border-primary shadow-lg"
                    : isPLType
                    ? "bg-primary/40 border-primary/40 shadow-md"
                    : "bg-primary border-primary shadow-md"
                } ${item.optional ? "border-dashed opacity-70" : ""}`}
              >
                <div className={isMainPoint ? "animate-pulse" : ""}>
                  {getIcon(item.type, true)}
                </div>

                {/* Ping effect */}
                {isMainPoint && (
                  <span
                    className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"
                    style={{
                      animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
                    }}
                  />
                )}
              </div>

              {/* Line Between Items */}
              {!isLast && (
                <div
                  className="w-0.5 flex-1 bg-primary"
                  style={{
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                />
              )}
            </div>

            {/* Right Side */}
            <div className="flex-1 min-w-0 pt-1 pb-4">
              {item.title && (
                <div
                  className={`transition-colors ${
                    isPLType
                      ? "text-xs sm:text-sm text-muted-foreground italic flex items-center gap-1"
                      : "text-sm sm:text-base font-medium text-foreground"
                  } opacity-0`}
                  style={{
                    animation: `fadeIn 0.5s ease-out ${index * 0.1 + 0.2}s both`
                  }}
                >
                  {isPLType && (
                    <MapPin className="w-3 h-3 opacity-60 flex-shrink-0" />
                  )}
                  <span className="break-words">{item.title}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default CompareResultTimeline
