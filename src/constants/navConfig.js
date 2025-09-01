import {
  Home, Package, ClipboardList, BookOpen, FileText, Compass, FileClock, Send, ShieldCheck, Wallet, Receipt, TrendingUp, Users, LayoutDashboard, Truck, UserPlus, LineChart, FolderKanban, Handshake, ScanSearch, Bell, BoltIcon, Flag, LogOut, NotebookText,
  Newspaper,
  Workflow,
  Store,
  Wrench,
  SquareKanban
} from "lucide-react";
export const getNavConfig = (t) => ({
  client: [
    { label: "My Shipments", path: "/dashboard/shipments" },
    { label: "Wallet", path: "/dashboard/wallet" }
  ],
  admin: [
    { label: "All Users", path: "/admin/users" },
    { label: "Finance", path: "/admin/finance" }
  ],
  allUsers: [
    { label: t('navbar.support'), path: "/support" },
    { label: t('navbar.contact'), path: "/contact" }
  ],
  clientTopNav: [
    { label: t('clientTopNav.account'), path: "/account", icon: BoltIcon },
    { label: t('clientTopNav.notifications'), path: "/notifications", icon: Bell },
    { label: t('clientTopNav.exclusivity'), path: "/exclusivity", icon: Flag },
    { label: t('clientTopNav.support'), path: "/support", icon: NotebookText },
    { label: t('clientTopNav.logout'), path: "/logout", icon: LogOut },
  ],
  clientDashNav: [
    {
      label: t('dashNav.manage'),
      path: "/manage",
      icon: SquareKanban
    },
    {
      label: t('dashNav.services'),
      path: "/services",
      icon: Wrench
    },
    {
      label: t('dashNav.company'),
      path: "/company",
      icon: Store
    },
    {
      label: t('dashNav.integrations'),
      path: "/integrations",
      icon: Workflow
    },
    {
      label: t('dashNav.news'),
      path: "/news",
      icon: Newspaper
    }
  ],
  clientDashFilterNav: [
    { label: t('clientDashFilterNav.view'), path: "/dashboard-view" },
    { label: t('clientDashFilterNav.active-shipments'), path: "/active-shipments" },
    { label: t('clientDashFilterNav.bookings'), path: "/bookings" },
    { label: t('clientDashFilterNav.quote-requests'), path: "/quote-requests" },
  ],
  cargoNav: [
    { label: t("cargoNav.deliveryOrder"), path: "/delivery-order" },
    { label: t("cargoNav.releaseCargo"), path: "/release-cargo" },
    { label: t("shipmentSupport.claimCargo"), path: "/claim-about-cargo" },
    { label: t("cargoNav.requestUpdate"), path: "/request-update" },
    { label: t("cargoNav.docsview"), path: "/docs-view" },
  ],
  shipmentSupport: [
    { label: t("shipmentSupport.reportDelay"), path: "/report-delay" },
    { label: t("shipmentSupport.ratingComment"), path: "/rating-and-comment" },
    { label: t("shipmentSupport.claimEquipment"), path: "/claim-about-equipment" },
    { label: t("shipmentSupport.emission"), path: "/emission" },
    { label: t("shipmentSupport.reportIssue"), path: "/report-issue" },
  ]
});

export const sidebarNav = (t) => [
  {
    label: t("dashboard.title"),
    items: [
      { label: t("dashboard.title"), path: "/dashboard", icon: LayoutDashboard }
    ]
  },
  {
    label: "My Shipments",
    items: [
      { label: t("sidebar.multimodal"), path: "/active-shipments", icon: Package },
      { label: t("sidebar.bookings"), path: "/dashboard/shipments/bookings", icon: ClipboardList },
      { label: t("sidebar.quotations"), path: "/dashboard/shipments/quotations", icon: BookOpen },
    ]
  },
  {
    label: "Plan & Book",
    items: [
      { label: t("sidebar.compareOptions"), path: "/dashboard/plan/compare-options", icon: Compass },
      { label: t("sidebar.instantQuote"), path: "/dashboard/plan/instant-quote", icon: FileText },
      { label: t("sidebar.book"), path: "/dashboard/plan/book", icon: Send },
      { label: t("sidebar.smartHelpers"), path: "/dashboard/plan/smart-helpers", icon: ScanSearch },
      { label: t("sidebar.readyLoad"), path: "/dashboard/plan/readyload", icon: Truck },
      { label: t("sidebar.trokeTrace"), path: "/dashboard/plan/troketrace", icon: FolderKanban },
      { label: t("sidebar.socForAll"), path: "/dashboard/plan/soc-for-all", icon: ShieldCheck },
      { label: t("sidebar.ireposition"), path: "/dashboard/plan/ireposition", icon: FileClock }
    ]
  },
  {
    label: "Operations",
    items: [
      { label: t("sidebar.manageDocuments"), path: "/dashboard/operations/documents", icon: FileText },
      { label: t("sidebar.tracking"), path: "/dashboard/operations/tracking", icon: Compass },
      { label: t("sidebar.depot"), path: "/dashboard/operations/depot", icon: Package },
      { label: t("sidebar.freeTime"), path: "/dashboard/operations/free-time", icon: FileClock },
      { label: t("sidebar.customs"), path: "/dashboard/operations/customs", icon: ShieldCheck },
    ]
  },
  {
    label: "Finance",
    items: [
      { label: t("sidebar.financeYourLog"), path: "/dashboard/finance/your-log", icon: TrendingUp },
      { label: t("sidebar.wallet"), path: "/dashboard/wallet", icon: Wallet },
      { label: t("sidebar.invoices"), path: "/dashboard/finance/invoices", icon: Receipt },
      { label: t("sidebar.trackCommission"), path: "/dashboard/finance/commission", icon: LineChart },
    ]
  },
  {
    label: "Interactions",
    items: [
      { label: t("sidebar.outsourceYourLog"), path: "/dashboard/interactions/outsource", icon: Handshake },
      { label: t("sidebar.assignAgent"), path: "/dashboard/interactions/assign-agent", icon: UserPlus },
      { label: t("sidebar.enhanceProfitability"), path: "/dashboard/interactions/enhance-profit", icon: TrendingUp },
    ]
  },
  {
    label: "Insights",
    items: [
      { label: t("sidebar.insights"), path: "/dashboard/insights", icon: LineChart }
    ]
  }
];