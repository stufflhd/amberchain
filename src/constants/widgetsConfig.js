import AlertIcon from "@/components/icons/AlertIcon ";
import ChecklistIcon from "@/components/icons/ChecklistIcon";
import TrackingIcon from "@/components/icons/TrackingIcon";
import TransportationIcon from "@/components/icons/TransportationIcon";
import WalletIcon from "@/components/icons/WalletIcon";
import WarehouseIcon from "@/components/icons/WarehouseIcon";

export const widgetsConfig = [
    [
        { to: '/wallet', icon: WalletIcon, title: 'Wallet' },
        { to: '/alerts', icon: AlertIcon, title: 'Alerts' },
    ],
    [
        { to: '/tasks', icon: ChecklistIcon, title: 'Outstanding Tasks' },
        { to: '/soc-units', icon: WarehouseIcon, title: 'SOC UNITS Available' },
    ],
    [
        { to: '/containers', icon: TransportationIcon, title: 'ReadytoLoad Containers' },
        { to: '/troketrace', icon: TrackingIcon, title: 'TROKETRACE' },
    ],
]