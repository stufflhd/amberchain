import IconTrendingDown from "@/components/icons/IconTrendingDown";
import IconTrendingUp from "@/components/icons/IconTrendingUp";
import { Anchor, MapPin, Warehouse } from "lucide-react"

export const shipmentsCards = [
    {
        description: "Total Shipments Value",
        title: "$5,220",
        trend: "+12.5%",
        Icon: IconTrendingUp
    },
    {
        description: "New Bookings",
        title: "124",
        trend: "+2.5%",
        Icon: IconTrendingUp
    },
    {
        description: "Active Shipments",
        title: "46",
        trend: "+4%",
        Icon: IconTrendingUp,
        footerMain: "Active & in-transit"
    },
    {
        description: "Quote Conversion Rate",
        title: "12.5%",
        trend: "-0.5%",
        Icon: IconTrendingDown
    },
]

export const chartRaw = [
    // April
    { date: "2025-04-01", booked: 180, completed: 120 }, { date: "2025-04-02", booked: 250, completed: 180 }, { date: "2025-04-03", booked: 310, completed: 240 }, { date: "2025-04-04", booked: 360, completed: 280 }, { date: "2025-04-05", booked: 380, completed: 300 }, { date: "2025-04-06", booked: 340, completed: 280 }, { date: "2025-04-07", booked: 280, completed: 250 }, { date: "2025-04-08", booked: 240, completed: 230 }, { date: "2025-04-09", booked: 260, completed: 220 }, { date: "2025-04-10", booked: 320, completed: 240 }, { date: "2025-04-11", booked: 350, completed: 260 }, { date: "2025-04-12", booked: 310, completed: 250 }, { date: "2025-04-13", booked: 280, completed: 240 }, { date: "2025-04-14", booked: 260, completed: 230 }, { date: "2025-04-15", booked: 270, completed: 240 }, { date: "2025-04-16", booked: 290, completed: 250 }, { date: "2025-04-17", booked: 320, completed: 260 }, { date: "2025-04-18", booked: 300, completed: 270 }, { date: "2025-04-19", booked: 280, completed: 280 }, { date: "2025-04-20", booked: 270, completed: 290 }, { date: "2025-04-21", booked: 280, completed: 280 }, { date: "2025-04-22", booked: 300, completed: 270 }, { date: "2025-04-23", booked: 330, completed: 280 }, { date: "2025-04-24", booked: 310, completed: 290 }, { date: "2025-04-25", booked: 290, completed: 300 }, { date: "2025-04-26", booked: 270, completed: 310 }, { date: "2025-04-27", booked: 260, completed: 320 }, { date: "2025-04-28", booked: 250, completed: 310 }, { date: "2025-04-29", booked: 260, completed: 300 }, { date: "2025-04-30", booked: 270, completed: 290 },
    // May
    { date: "2025-05-01", booked: 280, completed: 280 }, { date: "2025-05-02", booked: 320, completed: 290 }, { date: "2025-05-03", booked: 350, completed: 300 }, { date: "2025-05-04", booked: 320, completed: 310 }, { date: "2025-05-05", booked: 280, completed: 320 }, { date: "2025-05-06", booked: 250, completed: 330 }, { date: "2025-05-07", booked: 260, completed: 340 }, { date: "2025-05-08", booked: 270, completed: 350 }, { date: "2025-05-09", booked: 260, completed: 330 }, { date: "2025-05-10", booked: 250, completed: 310 }, { date: "2025-05-11", booked: 260, completed: 290 }, { date: "2025-05-12", booked: 280, completed: 270 }, { date: "2_24-05-13", booked: 290, completed: 260 }, { date: "2025-05-14", booked: 300, completed: 250 }, { date: "2025-05-15", booked: 290, completed: 260 }, { date: "2025-05-16", booked: 280, completed: 270 }, { date: "2025-05-17", booked: 270, completed: 280 }, { date: "2025-05-18", booked: 280, completed: 290 }, { date: "2025-05-19", booked: 290, completed: 300 }, { date: "2025-05-20", booked: 300, completed: 290 }, { date: "2025-05-21", booked: 280, completed: 280 }, { date: "2025-05-22", booked: 260, completed: 270 }, { date: "2025-05-23", booked: 240, completed: 260 }, { date: "2025-05-24", booked: 230, completed: 250 }, { date: "2025-05-25", booked: 220, completed: 240 }, { date: "2025-05-26", booked: 230, completed: 230 }, { date: "2025-05-27", booked: 240, completed: 220 }, { date: "2025-05-28", booked: 250, completed: 210 }, { date: "2025-05-29", booked: 260, completed: 200 }, { date: "2025-05-30", booked: 270, completed: 210 }, { date: "2025-05-31", booked: 280, completed: 220 },
    // June
    { date: "2025-06-01", booked: 300, completed: 230 }, { date: "2025-06-02", booked: 330, completed: 240 }, { date: "2025-06-03", booked: 360, completed: 250 }, { date: "2025-06-04", booked: 380, completed: 260 }, { date: "2025-06-05", booked: 350, completed: 250 }, { date: "2025-06-06", booked: 300, completed: 240 }, { date: "2025-06-07", booked: 260, completed: 230 }, { date: "2025-06-08", booked: 280, completed: 240 }, { date: "2025-06-09", booked: 320, completed: 250 }, { date: "2025-06-10", booked: 350, completed: 260 }, { date: "2025-06-11", booked: 330, completed: 270 }, { date: "2025-06-12", booked: 300, completed: 280 }, { date: "2025-06-13", booked: 280, completed: 290 }, { date: "2025-06-14", booked: 260, completed: 270 }, { date: "2025-06-15", booked: 240, completed: 250 }, { date: "2025-06-16", booked: 230, completed: 230 }, { date: "2025-06-17", booked: 250, completed: 220 }, { date: "2025-06-18", booked: 280, completed: 210 }, { date: "2025-06-19", booked: 320, completed: 200 }, { date: "2025-06-20", booked: 300, completed: 210 }, { date: "2025-06-21", booked: 280, completed: 220 }, { date: "2025-06-22", booked: 290, completed: 230 }, { date: "2025-06-23", booked: 310, completed: 240 }, { date: "2025-06-24", booked: 330, completed: 250 }, { date: "2025-06-25", booked: 320, completed: 260 }, { date: "2025-06-26", booked: 310, completed: 250 }, { date: "2025-06-27", booked: 300, completed: 240 }, { date: "2025-06-28", booked: 310, completed: 230 }, { date: "2025-06-29", booked: 320, completed: 220 }, { date: "2025-06-30", booked: 330, completed: 210 },
];

export const shipments = [
    {
        route: [
            { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: Warehouse },
            { name: "Port of Rotterdam", type: "Port of Loading", icon: Anchor },
            { name: "Port of Shanghai", type: "Port of Discharge", icon: Anchor },
            { name: "Shanghai, China", type: "Place of Discharge", icon: MapPin },
        ], 
        docType: "B/L", shipmentId: "BL-58239", customer: "GlobalTrade LLC", status: "Confirmed", mode: "Sea", stage: "Precarriage", departure: "2025-07-22", eta: "2025-08-05", alerts: "None", soc: "Yes", origin: [4.4777, 51.9244], destination: [121.4737, 31.2304]
    }, // Rotterdam to Shanghai
    {
        route: [
            { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: Warehouse },
            { name: "Port of Rotterdam", type: "Port of Loading", icon: Anchor },
            { name: "Port of Shanghai", type: "Port of Discharge", icon: Anchor },
            { name: "Shanghai, China", type: "Place of Discharge", icon: MapPin },
        ], docType: "CONTAINER", shipmentId: "CON-49203", customer: "FastFreight", status: "Pending", mode: "Air", stage: "Shipping Route", departure: "2025-07-21", eta: "2025-07-25", alerts: "Missing Docs", soc: "No", origin: [-0.1278, 51.5074], destination: [-74.0060, 40.7128]
    }, // London to New York
    {
        route: [
            { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: Warehouse },
            { name: "Port of Rotterdam", type: "Port of Loading", icon: Anchor },
            { name: "Port of Shanghai", type: "Port of Discharge", icon: Anchor },
            { name: "Shanghai, China", type: "Place of Discharge", icon: MapPin },
        ], docType: "BOOKING", shipmentId: "BKG-11002", customer: "LogisticPro", status: "Confirmed", mode: "Land", stage: "Oncarriage", departure: "2025-07-19", eta: "2025-07-23", alerts: "GPS Issue", soc: "Yes", origin: [-118.2437, 34.0522], destination: [-87.6298, 41.8781]
    }, // Los Angeles to Chicago
    {
        route: [
            { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: Warehouse },
            { name: "Port of Rotterdam", type: "Port of Loading", icon: Anchor },
            { name: "Port of Shanghai", type: "Port of Discharge", icon: Anchor },
            { name: "Shanghai, China", type: "Place of Discharge", icon: MapPin },
        ], docType: "LTA", shipmentId: "LTA-88011", customer: "AeroCargo", status: "InTransit", mode: "Air", stage: "Air Leg", departure: "2025-07-10", eta: "2025-07-18", alerts: "None", soc: "No", origin: [139.6917, 35.6895], destination: [-122.4194, 37.7749]
    }, // Tokyo to San Francisco
    {
        route: [
            { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: Warehouse },
            { name: "Port of Rotterdam", type: "Port of Loading", icon: Anchor },
            { name: "Port of Shanghai", type: "Port of Discharge", icon: Anchor },
            { name: "Shanghai, China", type: "Place of Discharge", icon: MapPin },
        ], docType: "CMR", shipmentId: "CMR-22091", customer: "RoadLink", status: "Pending", mode: "Land", stage: "Border Crossing", departure: "2025-07-12", eta: "2025-07-20", alerts: "Customs Hold", soc: "Yes", origin: [2.3522, 48.8566], destination: [13.4050, 52.5200]
    }, // Paris to Berlin
    {
        route: [
            { name: "Rotterdam, Netherlands", type: "Place of Loading", icon: Warehouse },
            { name: "Port of Rotterdam", type: "Port of Loading", icon: Anchor },
            { name: "Port of Shanghai", type: "Port of Discharge", icon: Anchor },
            { name: "Shanghai, China", type: "Place of Discharge", icon: MapPin },
        ], docType: "B/L", shipmentId: "BL-58240", customer: "OceanWay", status: "InTransit", mode: "Sea", stage: "Main Leg", departure: "2025-07-14", eta: "2025-08-02", alerts: "Weather", soc: "No", origin: [114.1694, 22.3193], destination: [-118.2437, 34.0522]
    }, // Hong Kong to Los Angeles
    { docType: "BOOKING", shipmentId: "BKG-11003", customer: "SupplyMax", status: "Confirmed", mode: "Rail", stage: "Rail Hub", departure: "2025-07-16", eta: "2025-07-28", alerts: "None", soc: "Yes" },
    { docType: "CONTAINER", shipmentId: "CON-49204", customer: "ShipperOne", status: "Delayed", mode: "Sea", stage: "Port Handling", departure: "2025-07-08", eta: "2025-07-30", alerts: "Congestion", soc: "No" },
    { docType: "CMR", shipmentId: "CMR-22092", customer: "RoadLink", status: "Confirmed", mode: "Land", stage: "Oncarriage", departure: "2025-07-05", eta: "2025-07-15", alerts: "None", soc: "Yes" },
]

export const docTypeOptions = [
    { label: "B/L", value: "B/L" },
    { label: "LTA", value: "LTA" },
    { label: "CMR", value: "CMR" },
    { label: "CONTAINER", value: "CONTAINER" },
    { label: "BOOKING", value: "BOOKING" },
]

export const series = [
    { key: "booked", label: "Booked", color: "var(--primary)" },
    { key: "completed", label: "Completed", color: "var(--secondary)" },
]