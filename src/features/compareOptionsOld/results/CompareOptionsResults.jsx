import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Ship,
  Clock,
  Flag,
  MapPin,
  Info,
  TrendingUp,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/**
 * Compare Options Results Display
 * Shows shipping options in a list with filters
 */
export default function CompareOptionsResults({
  options = [],
  onBook,
  onBack,
}) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    placeOfLoading: true,
    portOfOrigin: false,
    oceanFreight: false,
    portOfDestination: false,
    placeOfDischarge: false,
  });

  const handleFilterToggle = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  const handleBook = (option) => {
    if (onBook) onBook(option);
  };

  const handleBackToForm = () => {
    if (onBack) onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button onClick={handleBackToForm}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("compareOptions.results.backToForm")}
            </Button>
            <Button variant="ghost" size="sm">
              <Flag className="h-4 w-4 mr-2" />
              {t("compareOptions.results.filter")}
            </Button>
            <Button variant="ghost" size="sm">
              {t("compareOptions.results.clear")}
            </Button>
            <div className="flex items-center gap-2 text-sm text-primary">
              <Info className="h-4 w-4" />
              {t("compareOptions.results.stayUpdated")}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              {t("compareOptions.results.disclaimer")}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t("compareOptions.results.sortBy")}
            </span>
            <Button variant="outline" size="sm">
              {t("compareOptions.results.recommended")}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Filters Sidebar and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">
                {t("compareOptions.results.filter")}
              </h3>

              {/* Included Services */}
              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-medium">
                  {t("compareOptions.results.includedServices")}
                </h4>
                {Object.entries({
                  placeOfLoading: t(
                    "compareOptions.results.filters.placeOfLoading"
                  ),
                  portOfOrigin: t(
                    "compareOptions.results.filters.portOfOrigin"
                  ),
                  oceanFreight: t(
                    "compareOptions.results.filters.oceanFreight"
                  ),
                  portOfDestination: t(
                    "compareOptions.results.filters.portOfDestination"
                  ),
                  placeOfDischarge: t(
                    "compareOptions.results.filters.placeOfDischarge"
                  ),
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={key}
                      checked={filters[key]}
                      onChange={() => handleFilterToggle(key)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor={key} className="text-sm cursor-pointer">
                      {label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">
                  {t("compareOptions.results.price")}
                </h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="4436"
                    className="w-20 px-2 py-1 text-sm border rounded"
                  />
                  <input
                    type="number"
                    placeholder="4582"
                    className="w-20 px-2 py-1 text-sm border rounded"
                  />
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="4000"
                    max="5000"
                    className="w-full"
                  />
                </div>
              </div>

              {/* Transit Time */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">
                  {t("compareOptions.results.transitTime")}
                </h4>
                <div className="flex gap-2 mb-2">
                  <input
                    type="number"
                    placeholder="25"
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                  <span className="text-sm self-center">
                    {t("compareOptions.results.days")}
                  </span>
                  <input
                    type="number"
                    placeholder="27"
                    className="w-16 px-2 py-1 text-sm border rounded"
                  />
                  <span className="text-sm self-center">
                    {t("compareOptions.results.days")}
                  </span>
                </div>
                <div className="relative pt-1">
                  <input type="range" min="20" max="35" className="w-full" />
                </div>
              </div>

              {/* Rate Status */}
              <div>
                <h4 className="text-sm font-medium mb-3">
                  {t("compareOptions.results.rateStatus")}
                </h4>
                <Button variant="outline" size="sm" className="w-full">
                  {t("compareOptions.results.indicative")}
                </Button>
              </div>
            </Card>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-4">
            {options.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {t("compareOptions.results.noResults")}
                </p>
              </Card>
            ) : (
              options.map((option) => (
                <Card
                  key={option.id}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    {/* Left Section */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-md">
                          <Ship className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {option.carrier}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            ID: {option.id}
                          </p>
                        </div>
                      </div>

                      {/* Route Information */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="gap-1">
                            {option.indicative
                              ? t("compareOptions.results.indicative")
                              : t("compareOptions.results.confirmed")}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Ship className="h-3 w-3" />
                            {option.container}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="h-3 w-3" />
                            {option.transitDays}{" "}
                            {t("compareOptions.results.days")}
                          </Badge>
                        </div>
                      </div>

                      {/* Route Details */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-start gap-2 flex-1">
                          <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{option.fromPort}</p>
                            <p className="text-sm text-muted-foreground">
                              {option.from}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="flex-1 relative">
                          <div className="h-1 bg-gradient-to-r from-primary via-primary/50 to-primary rounded-full relative">
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                            {option.via && (
                              <div className="absolute left-1/2 -translate-x-1/2 -top-6 text-xs text-muted-foreground">
                                <TrendingUp className="h-3 w-3 mx-auto mb-1" />
                                {option.via}
                              </div>
                            )}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 flex-1 justify-end">
                          <div className="text-right">
                            <p className="font-medium">{option.toPort}</p>
                            <p className="text-sm text-muted-foreground">
                              {option.to}
                            </p>
                          </div>
                          <Flag className="h-4 w-4 mt-1 text-muted-foreground" />
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Price */}
                    <div className="ml-6 text-right">
                      <p className="text-2xl font-bold text-primary">
                        {option.currency} {option.price.toLocaleString()}
                      </p>
                      <Button
                        className="mt-4 w-full"
                        onClick={() => handleBook(option)}
                      >
                        {t("compareOptions.results.preBook")}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
