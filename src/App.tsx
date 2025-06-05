import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Map from "./components/Map";
import MyTasksPage from "@/pages/MyTasksPage";
import OtherStoreTasksPage from "@/pages/OtherStoreTasksPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
import Inventory from "./pages/Inventory";
import ScanSKU from "./pages/ScanSKU";
import ProductDetail from "./pages/ProductDetail";
import Deliveries from "./pages/Deliveries";
import DeliveryDetails from "./pages/DeliveryDetails";
import PreloadLogo from "./components/PreloadLogo";
import { ROUTES } from "./lib/routes";
import MySchedule from "./pages/MySchedule";
import DigitalRegister from "./pages/DigitalRegister";
import { VisitorRegister } from "@/pages/VisitorRegister";
import { StaffPurchase } from "@/pages/StaffPurchase";
import { PettyCashPurchase } from "@/pages/PettyCashPurchase";
import { EBCount } from "@/pages/EBCount";
// New pages from repositories
import StoreInsights from "./pages/insights/StoreInsights";
import StoreAnalytics from "./pages/insights/StoreAnalytics";
import StoreHeatmap from "./pages/insights/StoreHeatmap";
import CustomerJourney from "./pages/insights/CustomerJourney";
import StaffPerformance from "./pages/insights/StaffPerformance";
import Ticket from "./pages/Ticket";
import Analytics from "./pages/Analytics";
import StorePlanogram from "./pages/StorePlanogram";
// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Reduce retry attempts for faster failure detection
      refetchOnWindowFocus: false, // Disable refetching when window regains focus
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <PreloadLogo>
        <Toaster />
        <Sonner position="bottom-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.MAP} element={<Map />} />
            <Route path={ROUTES.MY_TASKS} element={<MyTasksPage />} />
            <Route path={ROUTES.OTHER_STORE_TASKS} element={<OtherStoreTasksPage />} />
            <Route path={ROUTES.TASK_DETAILS} element={<TaskDetailsPage />} />
            <Route path="/tasks" element={<MyTasksPage />} />
            <Route path={ROUTES.INVENTORY} element={<Inventory />} />
            <Route path={ROUTES.SCAN_SKU} element={<ScanSKU />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetail />} />
            <Route path={ROUTES.DELIVERIES} element={<Deliveries />} />
            <Route path={ROUTES.DELIVERY_DETAILS} element={<DeliveryDetails />} />
            
            {/* New Routes from ticket-wizard */}
            <Route path={ROUTES.TICKET_DASHBOARD} element={<Ticket />} />
            
            {/* New Routes from touch-store-insight */}
            <Route path={ROUTES.INSIGHTS} element={<StoreInsights />} />
            <Route path={ROUTES.STORE_HEATMAP} element={<StoreHeatmap />} />
            <Route path={ROUTES.CUSTOMER_JOURNEY} element={<CustomerJourney />} />
            <Route path={ROUTES.STAFF_PERFORMANCE} element={<StaffPerformance />} />
            
            {/* Fallback redirects for common mistyped paths */}
            <Route path="/task" element={<Navigate to="/tasks" replace />} />
            <Route path="/delivery" element={<Navigate to="/deliveries" replace />} />
            <Route path="/ticket" element={<Navigate to="/tickets" replace />} />
            <Route path="/insight" element={<Navigate to="/store-insights" replace />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* New Routes from my-schedule */}
            <Route path={ROUTES.STORE_PLANOMGRAM} element={<StorePlanogram />} />
            <Route path={ROUTES.MY_SCHEDULE} element={<MySchedule />} />
            
            {/* Digital Register routes */}
            <Route path={ROUTES.DIGITAL_REGISTER} element={<DigitalRegister />} />
            <Route path={ROUTES.VISITOR_REGISTER} element={<VisitorRegister />} />
            <Route path={ROUTES.STAFF_PURCHASE} element={<StaffPurchase />} />
            <Route path={ROUTES.PETTY_CASH_PURCHASE} element={<PettyCashPurchase />} />
            <Route path={ROUTES.EB_COUNT} element={<EBCount />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PreloadLogo>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
