// Routes configuration for the application
export const ROUTES = {
  // Original routes
  HOME: "/home",
  MAP: "/map",
  MY_TASKS: "/my-tasks",
  OTHER_STORE_TASKS: "/other-store-tasks",
  TASK_DETAILS: "/task/:id",
  INVENTORY: "/inventory",
  SCAN_SKU: "/scan-sku",
  PRODUCT_DETAIL: "/product/:id",
  DELIVERIES: "/deliveries",
  DELIVERY_DETAILS: "/delivery/:id",
  
  // New routes from ticket-wizard
  TICKET_DASHBOARD: "/tickets",
  
  // New routes from touch-store-insight
  INSIGHTS: "/insights",
  STORE_ANALYTICS: "/analytics",
  STORE_HEATMAP: "/heatmap",
  CUSTOMER_JOURNEY: "/customer-journey",
  STAFF_PERFORMANCE: "/staff-performance",

  // New routes from my-schedule
  MY_SCHEDULE: "/my-schedule",
  STORE_PLANOMGRAM: "/store-planogram",

  // Digital Register routes
  DIGITAL_REGISTER: "/digital-register",
  VISITOR_REGISTER: "/visitor-register",
  STAFF_PURCHASE: "/staff-purchase",
  PETTY_CASH_PURCHASE: "/petty-cash-purchase",

  EB_COUNT: '/eb-count',
} as const;

export default ROUTES;
