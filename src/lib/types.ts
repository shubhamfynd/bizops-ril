
export interface DeliveryAssociate {
  id: string;
  name: string;
  phone: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  items: ShipmentItem[];
  totalItems: number;
  scheduledTime: string; // ISO string
  status: "pending" | "in-transit" | "delivered" | "failed";
  associateId?: string;
  eta?: string; // ISO string
}

export interface ShipmentItem {
  id: string;
  name: string;
  quantity: number;
  sku: string;
}

export type TimeSlot = "morning" | "afternoon" | "evening";

// New types for ticket-wizard integration
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  category: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  createdBy: string;
  attachments?: TicketAttachment[];
  comments?: TicketComment[];
  department?: string;
  location?: string;
  dueDate?: string;
}

export interface TicketAttachment {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface TicketComment {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
  attachments?: TicketAttachment[];
}

// New types for touch-store-insight integration
export interface StoreInsight {
  id: string;
  date: string;
  footfall: number;
  conversion: number;
  averageDwellTime: number;
  salesPerSqFt: number;
  customerSatisfaction: number;
}

export interface HeatmapData {
  x: number;
  y: number;
  value: number;
}

export interface ZoneData {
  zoneId: string;
  zoneName: string;
  dwellTime: number;
  traffic: number;
  conversion: number;
}

export interface StaffPerformanceData {
  staffId: string;
  name: string;
  department: string;
  salesValue: number;
  customersServed: number;
  avgServiceTime: number;
  customerSatisfaction: number;
}

export interface CustomerJourneyPoint {
  stage: string;
  touchpoint: string;
  dwellTime: number;
  conversion: number;
  dropoff: number;
}
