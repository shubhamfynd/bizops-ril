
import { StoreInsight, HeatmapData, ZoneData, StaffPerformanceData, CustomerJourneyPoint } from "@/lib/types";

export const storeInsights: StoreInsight[] = [
  {
    id: "SI-001",
    date: "2025-05-21",
    footfall: 1245,
    conversion: 32.5,
    averageDwellTime: 18.7,
    salesPerSqFt: 48.2,
    customerSatisfaction: 4.3
  },
  {
    id: "SI-002",
    date: "2025-05-20",
    footfall: 1187,
    conversion: 30.8,
    averageDwellTime: 19.2,
    salesPerSqFt: 45.6,
    customerSatisfaction: 4.2
  },
  {
    id: "SI-003",
    date: "2025-05-19",
    footfall: 1350,
    conversion: 33.7,
    averageDwellTime: 20.1,
    salesPerSqFt: 51.3,
    customerSatisfaction: 4.4
  },
  {
    id: "SI-004",
    date: "2025-05-18",
    footfall: 952,
    conversion: 28.4,
    averageDwellTime: 17.3,
    salesPerSqFt: 40.8,
    customerSatisfaction: 4.1
  },
  {
    id: "SI-005",
    date: "2025-05-17",
    footfall: 1402,
    conversion: 34.2,
    averageDwellTime: 21.5,
    salesPerSqFt: 53.7,
    customerSatisfaction: 4.5
  }
];

export const heatmapData: HeatmapData[] = Array.from({ length: 100 }, (_, i) => ({
  x: i % 10,
  y: Math.floor(i / 10),
  value: Math.floor(Math.random() * 100)
}));

export const zoneData: ZoneData[] = [
  { zoneId: "Z1", zoneName: "Entrance", dwellTime: 5.2, traffic: 1245, conversion: 15.3 },
  { zoneId: "Z2", zoneName: "Men's Clothing", dwellTime: 12.7, traffic: 687, conversion: 28.4 },
  { zoneId: "Z3", zoneName: "Women's Clothing", dwellTime: 15.3, traffic: 892, conversion: 32.1 },
  { zoneId: "Z4", zoneName: "Children's Section", dwellTime: 10.8, traffic: 456, conversion: 25.6 },
  { zoneId: "Z5", zoneName: "Electronics", dwellTime: 18.2, traffic: 634, conversion: 30.7 },
  { zoneId: "Z6", zoneName: "Home Goods", dwellTime: 14.5, traffic: 523, conversion: 27.3 },
  { zoneId: "Z7", zoneName: "Checkout", dwellTime: 8.3, traffic: 935, conversion: 85.2 }
];

export const staffPerformanceData: StaffPerformanceData[] = [
  { staffId: "S1", name: "John Smith", department: "Men's Clothing", salesValue: 12580, customersServed: 78, avgServiceTime: 12.3, customerSatisfaction: 4.5 },
  { staffId: "S2", name: "Mary Johnson", department: "Women's Clothing", salesValue: 15230, customersServed: 92, avgServiceTime: 10.8, customerSatisfaction: 4.7 },
  { staffId: "S3", name: "Robert Davis", department: "Electronics", salesValue: 18750, customersServed: 65, avgServiceTime: 15.2, customerSatisfaction: 4.3 },
  { staffId: "S4", name: "Susan Miller", department: "Home Goods", salesValue: 9850, customersServed: 70, avgServiceTime: 11.5, customerSatisfaction: 4.4 },
  { staffId: "S5", name: "David Wilson", department: "Customer Service", salesValue: 0, customersServed: 112, avgServiceTime: 8.7, customerSatisfaction: 4.6 }
];

export const customerJourneyData: CustomerJourneyPoint[] = [
  { stage: "Entry", touchpoint: "Store Entrance", dwellTime: 2.5, conversion: 100, dropoff: 0 },
  { stage: "Browse", touchpoint: "Main Display", dwellTime: 5.8, conversion: 85.3, dropoff: 14.7 },
  { stage: "Engage", touchpoint: "Product Section", dwellTime: 12.3, conversion: 65.7, dropoff: 19.6 },
  { stage: "Try", touchpoint: "Fitting Room", dwellTime: 8.7, conversion: 48.2, dropoff: 17.5 },
  { stage: "Decide", touchpoint: "Product Selection", dwellTime: 6.2, conversion: 39.5, dropoff: 8.7 },
  { stage: "Purchase", touchpoint: "Checkout", dwellTime: 7.4, conversion: 35.8, dropoff: 3.7 }
];

export default {
  storeInsights,
  heatmapData,
  zoneData,
  staffPerformanceData,
  customerJourneyData
};
