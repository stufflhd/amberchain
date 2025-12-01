import React from "react"
import Result from "./Result"

export default function ResultsBody({ quotes }) {
  if (!quotes.length) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        No matching results for your selection. Try adjusting your filters.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {quotes.map((quote) => (
        <Result key={quote.id} quote={quote} />
      ))}
    </div>
  )
}
