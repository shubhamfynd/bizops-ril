import React from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PettyCashEntry } from './PettyCashList';

interface PettyCashFormProps {
  onSubmit: (data: Omit<PettyCashEntry, 'id' | 'createdAt'>) => void;
}

export const PettyCashForm: React.FC<PettyCashFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<PettyCashEntry, 'id' | 'createdAt'>>({
    defaultValues: {
      purchaseDate: format(new Date(), 'yyyy-MM-dd'),
    }
  });

  const currentDateTime = format(new Date(), 'dd/MM/yyyy HH:mm');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label>Date and Time</Label>
          <Input
            value={currentDateTime}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="purchaseDate">Purchase Date</Label>
          <Input
            id="purchaseDate"
            type="date"
            {...register('purchaseDate', { required: 'Purchase date is required' })}
          />
          {errors.purchaseDate && (
            <p className="text-sm text-red-500">{errors.purchaseDate.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            {...register('quantity', { 
              required: 'Quantity is required',
              min: { value: 1, message: 'Quantity must be at least 1' }
            })}
          />
          {errors.quantity && (
            <p className="text-sm text-red-500">{errors.quantity.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="billNo">Bill No.</Label>
          <Input
            id="billNo"
            {...register('billNo', { required: 'Bill number is required' })}
          />
          {errors.billNo && (
            <p className="text-sm text-red-500">{errors.billNo.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>
          <Input
            id="amount"
            type="number"
            {...register('amount', { 
              required: 'Amount is required',
              min: { value: 0, message: 'Amount must be positive' }
            })}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="vendorName">Vendor Name</Label>
          <Input
            id="vendorName"
            {...register('vendorName', { required: 'Vendor name is required' })}
          />
          {errors.vendorName && (
            <p className="text-sm text-red-500">{errors.vendorName.message}</p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="vendorAddress">Vendor Address</Label>
          <Input
            id="vendorAddress"
            {...register('vendorAddress', { required: 'Vendor address is required' })}
          />
          {errors.vendorAddress && (
            <p className="text-sm text-red-500">{errors.vendorAddress.message}</p>
          )}
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