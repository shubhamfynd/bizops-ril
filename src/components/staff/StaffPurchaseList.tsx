import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Article {
  articleCode: string;
  description: string;
  mrp: number;
  discountedPrice: number;
}

export interface StaffPurchaseEntry {
  id: string;
  staffName: string;
  department: string;
  transactionDate: string;
  transactionId: string;
  cashierId: string;
  transactionValue: number;
  articles: Article[];
  remarks?: string;
  createdAt: string;
}

interface StaffPurchaseListProps {
  entries: StaffPurchaseEntry[];
}

export const StaffPurchaseList: React.FC<StaffPurchaseListProps> = ({ entries }) => {
  // Group entries by date
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = format(new Date(entry.transactionDate), 'dd/MM/yyyy');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, StaffPurchaseEntry[]>);

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
                      <span className="text-sm font-medium text-gray-500">Staff Name</span>
                      <p className="text-sm">{entry.staffName}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Department</span>
                      <p className="text-sm">{entry.department}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Transaction ID</span>
                      <p className="text-sm">{entry.transactionId}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Cashier ID</span>
                      <p className="text-sm">{entry.cashierId}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Transaction Date</span>
                      <p className="text-sm">{format(new Date(entry.transactionDate), 'dd/MM/yyyy HH:mm')}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Transaction Value</span>
                      <p className="text-sm">₹{entry.transactionValue.toLocaleString()}</p>
                    </div>
                    {entry.remarks && (
                      <div>
                        <span className="text-sm font-medium text-gray-500">Remarks</span>
                        <p className="text-sm">{entry.remarks}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Articles</h4>
                  <div className="space-y-2">
                    {entry.articles.map((article, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Code:</span>
                          <p>{article.articleCode}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Description:</span>
                          <p>{article.description}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">MRP:</span>
                          <p>₹{article.mrp.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Discounted Price:</span>
                          <p>₹{article.discountedPrice.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}; 