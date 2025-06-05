import { DeliveryAssociate, Shipment } from "@/lib/types";
import { format, addHours } from "date-fns";

// Create the current date
const today = new Date();

// Helper function to create a date string with an offset of hours
const createDateWithOffset = (hours: number) => {
  const date = new Date(today);
  date.setHours(today.getHours() + hours);
  return date.toISOString();
};

// Mock delivery associates
export const mockDeliveryAssociates: DeliveryAssociate[] = [
  {
    id: "da1",
    name: "John Smith",
    phone: "555-123-4567",
    currentLocation: {
      lat: 37.7749,
      lng: -122.4194
    }
  },
  {
    id: "da2",
    name: "Emma Johnson",
    phone: "555-987-6543",
    currentLocation: {
      lat: 37.7833,
      lng: -122.4167
    }
  },
  {
    id: "da3",
    name: "Michael Brown",
    phone: "555-456-7890",
    currentLocation: {
      lat: 37.7833,
      lng: -122.4167
    }
  }
];

// Morning deliveries (4am-10am)
export const morningDeliveries: Shipment[] = [
  {
    id: "s1",
    trackingNumber: "TRK1234567",
    items: [
      { id: "i1", name: "Coffee Beans (Premium)", quantity: 20, sku: "CB001" },
      { id: "i2", name: "Milk (Whole)", quantity: 15, sku: "MK001" }
    ],
    totalItems: 2,
    scheduledTime: createDateWithOffset(1), // 1 hour from now
    status: "in-transit",
    associateId: "da1",
    eta: createDateWithOffset(1)
  },
  {
    id: "s2",
    trackingNumber: "TRK7654321",
    items: [
      { id: "i3", name: "Pastries (Assorted)", quantity: 30, sku: "PA001" },
      { id: "i4", name: "Sugar (Packets)", quantity: 100, sku: "SG001" }
    ],
    totalItems: 2,
    scheduledTime: createDateWithOffset(2), // 2 hours from now
    status: "delivered",
    associateId: "da2",
    eta: createDateWithOffset(2)
  },
  {
    id: "s3",
    trackingNumber: "TRK9876543",
    items: [
      { id: "i5", name: "Tea (Assorted)", quantity: 15, sku: "TA001" }
    ],
    totalItems: 1,
    scheduledTime: createDateWithOffset(3), // 3 hours from now
    status: "pending"
  }
];

// Afternoon deliveries (10am-4pm)
export const afternoonDeliveries: Shipment[] = [
  {
    id: "s4",
    trackingNumber: "TRK2468135",
    items: [
      { id: "i6", name: "Coffee Cups", quantity: 500, sku: "CC001" },
      { id: "i7", name: "Napkins", quantity: 1000, sku: "NP001" }
    ],
    totalItems: 2,
    scheduledTime: createDateWithOffset(6), // 6 hours from now
    status: "in-transit",
    associateId: "da3",
    eta: createDateWithOffset(6)
  },
  {
    id: "s5",
    trackingNumber: "TRK1357924",
    items: [
      { id: "i8", name: "Flavored Syrups", quantity: 10, sku: "FS001" }
    ],
    totalItems: 1,
    scheduledTime: createDateWithOffset(7), // 7 hours from now
    status: "pending"
  }
];

// Evening deliveries (4pm-10pm)
export const eveningDeliveries: Shipment[] = [
  {
    id: "s6",
    trackingNumber: "TRK8642975",
    items: [
      { id: "i9", name: "Coffee Beans (Regular)", quantity: 25, sku: "CB002" },
      { id: "i10", name: "To-Go Lids", quantity: 500, sku: "TL001" }
    ],
    totalItems: 2,
    scheduledTime: createDateWithOffset(10), // 10 hours from now
    status: "pending",
    associateId: "da1",
    eta: createDateWithOffset(10)
  }
];

// Get all deliveries
export const getAllDeliveries = (): Shipment[] => {
  return [...morningDeliveries, ...afternoonDeliveries, ...eveningDeliveries];
};

// Find a delivery by ID
export const getDeliveryById = (id: string): Shipment | undefined => {
  return getAllDeliveries().find(delivery => delivery.id === id);
};

// Find associate by ID
export const getAssociateById = (id: string): DeliveryAssociate | undefined => {
  return mockDeliveryAssociates.find(associate => associate.id === id);
};
