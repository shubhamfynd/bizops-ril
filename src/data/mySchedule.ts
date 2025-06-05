
import { Appointment } from '@/components/MySchedule/AppointmentBlock';

const mockAppointments: Record<string, Appointment[]> = {
  current: [
    {
      id: '1',
      title: 'Customer Consultation',
      type: 'customer',
      startTime: '9:00',
      endTime: '10:00',
      customer: 'John Smith',
      description: 'Product inquiry and fitting'
    },
    {
      id: '2', 
      title: 'Inventory Check',
      type: 'task',
      startTime: '10:30',
      endTime: '11:30',
      description: 'Weekly inventory audit - Electronics section',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Customer Appointment',
      type: 'customer', 
      startTime: '13:00',
      endTime: '14:00',
      customer: 'Sarah Johnson',
      description: 'Return and exchange'
    },
    {
      id: '4',
      title: 'Store Setup',
      type: 'task',
      startTime: '15:00',
      endTime: '16:00',
      description: 'Prepare display for new arrivals',
      priority: 'high'
    },
    {
      id: '5',
      title: 'Customer Meeting',
      type: 'customer',
      startTime: '16:30',
      endTime: '17:30',
      customer: 'Mike Davis',
      description: 'Personal shopping session'
    }
  ],
  sarah: [
    {
      id: '6',
      title: 'Team Meeting',
      type: 'task',
      startTime: '8:00',
      endTime: '9:00',
      description: 'Daily standup with team',
      priority: 'high'
    },
    {
      id: '7',
      title: 'VIP Customer',
      type: 'customer',
      startTime: '10:00',
      endTime: '11:30',
      customer: 'Emma Wilson',
      description: 'High-value customer consultation'
    },
    {
      id: '8',
      title: 'Store Operations',
      type: 'task',
      startTime: '14:00',
      endTime: '15:00',
      description: 'Review daily sales reports',
      priority: 'medium'
    }
  ],
  mike: [
    {
      id: '9',
      title: 'Customer Service',
      type: 'customer',
      startTime: '9:30',
      endTime: '10:30',
      customer: 'Alex Brown',
      description: 'Product demonstration'
    },
    {
      id: '10',
      title: 'Stock Replenishment',
      type: 'task',
      startTime: '11:00',
      endTime: '12:00',
      description: 'Restock popular items',
      priority: 'medium'
    },
    {
      id: '11',
      title: 'Customer Appointment',
      type: 'customer',
      startTime: '15:30',
      endTime: '16:30',
      customer: 'Lisa Chang',
      description: 'Special order pickup'
    }
  ],
  emma: [
    {
      id: '12',
      title: 'Inventory Audit',
      type: 'task',
      startTime: '8:30',
      endTime: '10:00',
      description: 'Monthly inventory count - Warehouse',
      priority: 'high'
    },
    {
      id: '13',
      title: 'Supplier Meeting',
      type: 'customer',
      startTime: '11:00',
      endTime: '12:00',
      customer: 'TechCorp Supplies',
      description: 'Quarterly review meeting'
    },
    {
      id: '14',
      title: 'System Update',
      type: 'task',
      startTime: '14:30',
      endTime: '15:30',
      description: 'Update inventory management system',
      priority: 'medium'
    }
  ]
};

export const getAppointmentsForUser = (userId: string): Appointment[] => {
  return mockAppointments[userId] || [];
};

export const getAllUsers = () => {
  return [
    { id: 'current', name: 'My Schedule', role: 'Store Associate' },
    { id: 'sarah', name: 'Sarah Johnson', role: 'Store Manager' },
    { id: 'mike', name: 'Mike Chen', role: 'Sales Associate' },
    { id: 'emma', name: 'Emma Davis', role: 'Inventory Specialist' },
  ];
};
