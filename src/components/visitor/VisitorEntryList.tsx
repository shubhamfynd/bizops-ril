import React from 'react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface VisitorEntry {
  id: string;
  visitorName: string;
  comingFrom: string;
  meetingWith: string;
  phoneNumber: string;
  purpose: string;
  visitingPassNumber: string;
  timeIn: string;
  timeOut?: string;
  remarks?: string;
  createdAt: string;
}

interface VisitorEntryListProps {
  entries: VisitorEntry[];
}

const formatDate = (date: string) => {
  const parsedDate = parseISO(date);
  if (isToday(parsedDate)) return 'Today';
  if (isYesterday(parsedDate)) return 'Yesterday';
  return format(parsedDate, 'MMMM d, yyyy');
};

const formatTime = (date: string) => {
  return format(parseISO(date), 'h:mm a');
};

export const VisitorEntryList: React.FC<VisitorEntryListProps> = ({ entries }) => {
  const groupedEntries = entries.reduce((groups, entry) => {
    const date = formatDate(entry.createdAt);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(entry);
    return groups;
  }, {} as Record<string, VisitorEntry[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([date, dateEntries]) => (
        <div key={date}>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{date}</h2>
          <div className="space-y-3">
            {dateEntries.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{entry.visitorName}</h3>
                      <Badge variant="outline" className="text-xs">
                        {entry.visitingPassNumber}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      From: {entry.comingFrom}
                    </p>
                    <p className="text-sm text-gray-600">
                      Meeting with: {entry.meetingWith}
                    </p>
                    <p className="text-sm text-gray-600">
                      Purpose: {entry.purpose}
                    </p>
                    {entry.remarks && (
                      <p className="text-sm text-gray-600">
                        Remarks: {entry.remarks}
                      </p>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Time In:</span> {formatTime(entry.timeIn)}
                    </div>
                    {entry.timeOut && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Time Out:</span> {formatTime(entry.timeOut)}
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      Phone: {entry.phoneNumber}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
      {entries.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No entries found
        </div>
      )}
    </div>
  );
}; 