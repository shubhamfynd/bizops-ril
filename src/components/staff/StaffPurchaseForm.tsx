import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { StaffPurchaseEntry, Article } from './StaffPurchaseList';
import { Plus, Trash2 } from 'lucide-react';

interface StaffPurchaseFormProps {
  onSubmit: (data: Omit<StaffPurchaseEntry, 'id' | 'createdAt'>) => void;
}

export const StaffPurchaseForm: React.FC<StaffPurchaseFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<Omit<StaffPurchaseEntry, 'id' | 'createdAt'>>({
    defaultValues: {
      articles: [{ articleCode: '', description: '', mrp: 0, discountedPrice: 0 }],
      transactionDate: format(new Date(), 'yyyy-MM-dd'),
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'articles'
  });

  const currentDate = format(new Date(), 'dd/MM/yyyy');

  const handleFormSubmit = (data: Omit<StaffPurchaseEntry, 'id' | 'createdAt'>) => {
    // Calculate total transaction value
    const totalValue = data.articles.reduce((sum, article) => sum + article.discountedPrice, 0);
    
    onSubmit({
      ...data,
      transactionValue: totalValue,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="staffName">Staff Name</Label>
          <Input
            id="staffName"
            {...register('staffName', { required: 'Staff name is required' })}
          />
          {errors.staffName && (
            <p className="text-sm text-red-500">{errors.staffName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Input
            id="department"
            {...register('department', { required: 'Department is required' })}
          />
          {errors.department && (
            <p className="text-sm text-red-500">{errors.department.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="transactionId">Transaction ID</Label>
          <Input
            id="transactionId"
            {...register('transactionId', { required: 'Transaction ID is required' })}
          />
          {errors.transactionId && (
            <p className="text-sm text-red-500">{errors.transactionId.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cashierId">Cashier ID</Label>
          <Input
            id="cashierId"
            {...register('cashierId', { required: 'Cashier ID is required' })}
          />
          {errors.cashierId && (
            <p className="text-sm text-red-500">{errors.cashierId.message}</p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Transaction Date</Label>
          <Input
            value={currentDate}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="col-span-2">
          <div className="flex items-center justify-between mb-2">
            <Label>Articles</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ articleCode: '', description: '', mrp: 0, discountedPrice: 0 })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Article
            </Button>
          </div>
          
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Article Code</Label>
                  <Input
                    {...register(`articles.${index}.articleCode`, { required: 'Article code is required' })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input
                    {...register(`articles.${index}.description`, { required: 'Description is required' })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>MRP</Label>
                  <Input
                    type="number"
                    {...register(`articles.${index}.mrp`, { 
                      required: 'MRP is required',
                      min: { value: 0, message: 'MRP must be positive' }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Discounted Price</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      {...register(`articles.${index}.discountedPrice`, { 
                        required: 'Discounted price is required',
                        min: { value: 0, message: 'Price must be positive' }
                      })}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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