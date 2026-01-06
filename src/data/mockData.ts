import { ChargePoint } from "../types";

export const chargePoints: ChargePoint[] = [
  {
    id: "1",
    name: "EV Station Downtown",
    address: "123 Main St, City Center",
    availablePorts: 4,
    totalPorts: 6,
    distance: 1.2,
    pricePerKwh: 0.35,
    coordinates: { lat: 40.7128, lng: -74.0060 }
  },
  {
    id: "2",
    name: "Green Energy Hub",
    address: "456 Oak Ave, North District",
    availablePorts: 2,
    totalPorts: 4,
    distance: 2.5,
    pricePerKwh: 0.32,
    coordinates: { lat: 40.7589, lng: -73.9851 }
  },
  {
    id: "3",
    name: "Solar Charging Park",
    address: "789 Pine Rd, East Side",
    availablePorts: 6,
    totalPorts: 8,
    distance: 3.8,
    pricePerKwh: 0.28,
    coordinates: { lat: 40.7489, lng: -73.9680 }
  },
  {
    id: "4",
    name: "Urban EV Point",
    address: "101 Maple Blvd, West End",
    availablePorts: 1,
    totalPorts: 3,
    distance: 0.8,
    pricePerKwh: 0.38,
    coordinates: { lat: 40.7549, lng: -73.9840 }
  },
  {
    id: "5",
    name: "Highway Rest Stop",
    address: "202 Highway 1, Exit 45",
    availablePorts: 8,
    totalPorts: 12,
    distance: 5.2,
    pricePerKwh: 0.40,
    coordinates: { lat: 40.7420, lng: -73.9897 }
  },
];
