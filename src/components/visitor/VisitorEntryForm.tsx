import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VisitorEntry } from './VisitorEntryList';

interface VisitorEntryFormProps {
  onSubmit: (data: Omit<VisitorEntry, 'id' | 'createdAt'>) => void;
}

export const VisitorEntryForm: React.FC<VisitorEntryFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<VisitorEntry, 'id' | 'createdAt'>>();
  const currentDate = format(new Date(), 'dd/MM/yyyy');

  const handleFormSubmit = (data: Omit<VisitorEntry, 'id' | 'createdAt'>) => {
    // Convert time strings to full ISO datetime strings
    const today = new Date();
    const [timeInHours, timeInMinutes] = data.timeIn.split(':');
    const [timeOutHours, timeOutMinutes] = data.timeOut?.split(':') || ['', ''];

    const timeIn = new Date(today);
    timeIn.setHours(parseInt(timeInHours), parseInt(timeInMinutes), 0, 0);

    let timeOut = undefined;
    if (timeOutHours && timeOutMinutes) {
      timeOut = new Date(today);
      timeOut.setHours(parseInt(timeOutHours), parseInt(timeOutMinutes), 0, 0);
    }

    onSubmit({
      ...data,
      timeIn: timeIn.toISOString(),
      timeOut: timeOut?.toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="visitorName">Visitor Name</Label>
          <Input
            id="visitorName"
            {...register('visitorName', { required: 'Visitor name is required' })}
          />
          {errors.visitorName && (
            <p className="text-sm text-red-500">{errors.visitorName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="comingFrom">Coming From</Label>
          <Input
            id="comingFrom"
            {...register('comingFrom', { required: 'Company name is required' })}
          />
          {errors.comingFrom && (
            <p className="text-sm text-red-500">{errors.comingFrom.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="meetingWith">Meeting With</Label>
          <Input
            id="meetingWith"
            {...register('meetingWith', { required: 'Meeting person is required' })}
          />
          {errors.meetingWith && (
            <p className="text-sm text-red-500">{errors.meetingWith.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            {...register('phoneNumber', { required: 'Phone number is required' })}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purpose">Purpose</Label>
          <Input
            id="purpose"
            {...register('purpose', { required: 'Purpose is required' })}
          />
          {errors.purpose && (
            <p className="text-sm text-red-500">{errors.purpose.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="visitingPassNumber">Visiting Pass Number</Label>
          <Input
            id="visitingPassNumber"
            {...register('visitingPassNumber', { required: 'Pass number is required' })}
          />
          {errors.visitingPassNumber && (
            <p className="text-sm text-red-500">{errors.visitingPassNumber.message}</p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Date</Label>
          <Input
            value={currentDate}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeIn">Time In</Label>
          <Input
            id="timeIn"
            type="time"
            {...register('timeIn', { required: 'Time in is required' })}
          />
          {errors.timeIn && (
            <p className="text-sm text-red-500">{errors.timeIn.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeOut">Time Out</Label>
          <Input
            id="timeOut"
            type="time"
            {...register('timeOut')}
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Input
            id="remarks"
            {...register('remarks')}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Create Entry</Button>
      </div>
    </form>
  );
}; 