export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";
export type GearStatus = "ACTIVE" | "INACTIVE";
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED";
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  status: UserStatus;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  _count?: { gearItems: number };
}

export interface GearItem {
  id: string;
  name: string;
  description: string;
  brand?: string | null;
  pricePerDay: string;
  images: string[];
  stock: number;
  availableStock: number;
  specifications?: Record<string, unknown> | null;
  status: GearStatus;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  categoryId: string;
  category?: Category;
  provider?: { id: string; name: string; email?: string };
  reviews?: Review[];
}

export interface RentalOrderItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  subtotal: string;
  gearItem: GearItem;
}

export interface RentalOrder {
  id: string;
  customerId: string;
  startDate: string;
  endDate: string;
  totalAmount: string;
  status: RentalStatus;
  createdAt: string;
  updatedAt: string;
  items: RentalOrderItem[];
  payments?: Payment[];
  customer?: { id: string; name: string; email: string };
}

export interface Payment {
  id: string;
  transactionId: string;
  rentalOrderId: string;
  amount: string;
  method: "STRIPE";
  provider: string;
  status: PaymentStatus;
  stripeSessionId?: string | null;
  paidAt?: string | null;
  createdAt: string;
  rentalOrder?: RentalOrder;
}

export interface Review {
  id: string;
  customerId: string;
  gearItemId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  customer?: { id: string; name: string };
}

export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorShape {
  success: false;
  message: string;
  errorDetails?: unknown;
}

export interface PaginatedGear {
  gear: GearItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
