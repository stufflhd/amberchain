import React from "react"
import { CheckCircle, X } from "lucide-react"

export default function SuccessBanner({
  title = "Success",
  children,
  icon: Icon = CheckCircle,
  onClose,
  className = "",
}) {
  return (
    <div className={`flex items-start gap-3 bg-green-100 dark:bg-green-900/40 border border-green-300 dark:border-green-800 rounded-lg p-4 shadow-sm ${className}`}>
      <Icon className="text-green-600 dark:text-green-400 w-6 h-6 mt-0.5 flex-shrink-0" />
      <div className="text-sm text-green-800 dark:text-green-200">
        <p className="font-semibold text-green-900 dark:text-green-100">{title}</p>
        <div className="text-green-700 dark:text-green-300">{children}</div>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="ml-auto text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
