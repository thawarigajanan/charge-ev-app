export const CAR_TYPES = ["Tata", "MG", "Citron", "Mahindra", "Maruti Suzuki"] as const;
export type CarType = typeof CAR_TYPES[number];

export const MENU_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "Home", color: "blue" },
  { id: "cpo", label: "Find CPO", icon: "MapPin", color: "green" },
  { id: "sessions", label: "My Sessions", icon: "Clock", color: "purple" },
  { id: "payments", label: "Payments", icon: "CreditCard", color: "yellow" },
  { id: "settings", label: "Settings", icon: "Cog", color: "gray" },
];
