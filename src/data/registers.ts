import { 
  Users, 
  ClipboardList, 
  UserCheck, 
  Wallet, 
  BarChart2, 
  RotateCcw, 
  MessageSquare, 
  Calculator, 
  Package, 
  Key, 
  LayoutGrid, 
  RefreshCw, 
  UserCog, 
  ShoppingBag, 
  Clock, 
  Search, 
  HeartPulse, 
  Tags, 
  Shield, 
  FileText, 
  FileCheck,
  LucideIcon 
} from 'lucide-react';
import React from 'react';

export interface Register {
  id: string;
  name: string;
  icon: JSX.Element;
  description: string;
  lastUpdated?: string;
  pendingEntries?: number;
}

const createIcon = (Icon: typeof Users) => React.createElement(Icon, { className: "w-8 h-8 text-[#181f60]" });

export const registers: Register[] = [
  {
    id: 'visitor',
    name: 'Visitor',
    icon: createIcon(Users),
    description: 'Track store visitors and their details',
    lastUpdated: '2024-03-20',
    pendingEntries: 2
  },
  {
    id: 'attendance',
    name: 'Attendance',
    icon: createIcon(ClipboardList),
    description: 'Record staff attendance and working hours',
    lastUpdated: '2024-03-20',
    pendingEntries: 0
  },
  {
    id: '3pl-attendance',
    name: '3 PL Attendance',
    icon: createIcon(UserCheck),
    description: 'Track third-party logistics staff attendance',
    lastUpdated: '2024-03-19',
    pendingEntries: 1
  },
  {
    id: 'petty-cash',
    name: 'Petty Cash Purchase',
    icon: createIcon(Wallet),
    description: 'Record petty cash transactions and purchases',
    lastUpdated: '2024-03-20',
    pendingEntries: 0
  },
  {
    id: 'cms',
    name: 'CMS',
    icon: createIcon(BarChart2),
    description: 'Customer Management System records',
    lastUpdated: '2024-03-20',
    pendingEntries: 3
  },
  {
    id: 'returns',
    name: 'Returns',
    icon: createIcon(RotateCcw),
    description: 'Track product returns and refunds',
    lastUpdated: '2024-03-19',
    pendingEntries: 5
  },
  {
    id: 'customer-service',
    name: 'Customer Service (Feedback)',
    icon: createIcon(MessageSquare),
    description: 'Record customer feedback and service interactions',
    lastUpdated: '2024-03-20',
    pendingEntries: 2
  },
  {
    id: 'eb-count',
    name: 'EB Count',
    icon: createIcon(Calculator),
    description: 'Track end-of-business day counts',
    lastUpdated: '2024-03-20',
    pendingEntries: 0
  },
  {
    id: 'inward',
    name: 'Inward',
    icon: createIcon(Package),
    description: 'Record incoming inventory and deliveries',
    lastUpdated: '2024-03-20',
    pendingEntries: 4
  },
  {
    id: 'outward',
    name: 'Outward',
    icon: createIcon(Package),
    description: 'Track outgoing inventory and dispatches',
    lastUpdated: '2024-03-20',
    pendingEntries: 1
  },
  {
    id: 'key',
    name: 'Key',
    icon: createIcon(Key),
    description: 'Manage store keys and access control',
    lastUpdated: '2024-03-19',
    pendingEntries: 0
  },
  {
    id: 'slp-check',
    name: 'SLP Check/ DSIR',
    icon: createIcon(LayoutGrid),
    description: 'Store Layout Plan and DSIR compliance records',
    lastUpdated: '2024-03-20',
    pendingEntries: 2
  },
  {
    id: 'ajio',
    name: 'AJIO in/out',
    icon: createIcon(RefreshCw),
    description: 'Track AJIO product movements',
    lastUpdated: '2024-03-20',
    pendingEntries: 3
  },
  {
    id: 'staff-movement',
    name: 'Staff Movement',
    icon: createIcon(UserCog),
    description: 'Record staff movements within the store',
    lastUpdated: '2024-03-20',
    pendingEntries: 0
  },
  {
    id: 'staff-purchase',
    name: 'Staff Purchase',
    icon: createIcon(ShoppingBag),
    description: 'Track staff purchases and discounts',
    lastUpdated: '2024-03-19',
    pendingEntries: 1
  },
  {
    id: 'opening-closing',
    name: 'Opening & Closing',
    icon: createIcon(Clock),
    description: 'Store opening and closing records',
    lastUpdated: '2024-03-20',
    pendingEntries: 0
  },
  {
    id: 'lost-found',
    name: 'Lost & Found',
    icon: createIcon(Search),
    description: 'Track lost and found items',
    lastUpdated: '2024-03-20',
    pendingEntries: 2
  },
  {
    id: 'first-aid',
    name: 'First Aid Kit Usage',
    icon: createIcon(HeartPulse),
    description: 'Record first aid kit usage and replenishment',
    lastUpdated: '2024-03-19',
    pendingEntries: 0
  },
  {
    id: 'tag-audit',
    name: 'Tag Audit',
    icon: createIcon(Tags),
    description: 'Track product tag audits and compliance',
    lastUpdated: '2024-03-20',
    pendingEntries: 4
  },
  {
    id: 'eas-check',
    name: 'EAS Check',
    icon: createIcon(Shield),
    description: 'Electronic Article Surveillance checks',
    lastUpdated: '2024-03-20',
    pendingEntries: 1
  },
  {
    id: 'nrgp',
    name: 'NRGP',
    icon: createIcon(FileText),
    description: 'Non-Returnable Goods Protocol register',
    lastUpdated: '2024-03-19',
    pendingEntries: 2
  },
  {
    id: 'rgp',
    name: 'RGP',
    icon: createIcon(FileCheck),
    description: 'Returnable Goods Protocol register',
    lastUpdated: '2024-03-20',
    pendingEntries: 3
  }
]; 