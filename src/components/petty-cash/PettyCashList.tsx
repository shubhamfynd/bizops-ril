import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface PettyCashEntry {
  id: string;
  description: string;
  purchaseDate: string;
  quantity: number;
  billNo: string;
  amount: number;
  vendorName: string;
  vendorAddress: string;
  remarks?: string;
  createdAt: string;
}

interface PettyCashListProps {
  entries: PettyCashEntry[];
}

export const PettyCashList: React.FC<PettyCashListProps> = ({ entries }) => {
  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = format(new Date(entry.createdAt), 'dd/MM/yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, PettyCashEntry[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <div key={date} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">{date}</h3>
          {dateEntries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Description</span>
                      <p className="text-sm">{entry.description}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Purchase Date</span>
                      <p className="text-sm">{format(new Date(entry.purchaseDate), 'dd/MM/yyyy')}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Quantity</span>
                      <p className="text-sm">{entry.quantity}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Bill No.</span>
                      <p className="text-sm">{entry.billNo}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Amount</span>
                      <p className="text-sm">₹{entry.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Vendor Name</span>
                      <p className="text-sm">{entry.vendorName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Vendor Address</span>
                      <p className="text-sm">{entry.vendorAddress}</p>
                    </div>
                    {entry.remarks && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Remarks</span>
                        <p className="text-sm">{entry.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Entry created at: {format(new Date(entry.createdAt), 'dd/MM/yyyy HH:mm')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}; 