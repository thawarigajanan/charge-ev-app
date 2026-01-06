export interface User {
  id: string;
  phone?: string;
  email?: string;
  fullName?: string;
  carType?: CarType;
  isNewUser: boolean;
}

export type CarType = "Tata" | "MG" | "Citron" | "Mahindra" | "Maruti Suzuki";

export interface ChargePoint {
  id: string;
  name: string;
  address: string;
  availablePorts: number;
  totalPorts: number;
  distance: number;
  pricePerKwh: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LoginCredentials {
  phoneOrEmail: string;
  otp?: string;
}
