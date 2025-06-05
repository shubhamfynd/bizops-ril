import React from 'react';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface EBCountEntry {
  id: string;
  brandName: string;
  physicalQuantity: number;
  sohQuantity: number;
  shortExcess: number;
  brandSign: string; // Base64 encoded signature
  createdAt: string;
}

interface EBCountListProps {
  entries: EBCountEntry[];
}

export const EBCountList: React.FC<EBCountListProps> = ({ entries }) => {
  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = format(new Date(entry.createdAt), 'dd/MM/yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, EBCountEntry[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <div key={date} className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">{date}</h2>
          <div className="grid gap-3">
            {dateEntries.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">{entry.brandName}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <p>Physical Quantity: {entry.physicalQuantity}</p>
                      <p>SOH Quantity: {entry.sohQuantity}</p>
                      <p>
                        Short/Excess:{' '}
                        <Badge
                          variant={entry.shortExcess === 0 ? "default" : entry.shortExcess > 0 ? "destructive" : "outline"}
                          className={entry.shortExcess === 0 ? "bg-green-500" : entry.shortExcess > 0 ? "bg-red-500" : ""}
                        >
                          {entry.shortExcess}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {entry.brandSign && (
                      <img
                        src={entry.brandSign}
                        alt="Brand Signature"
                        className="h-16 w-32 object-contain border rounded"
                      />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}; 