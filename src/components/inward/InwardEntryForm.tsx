import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

const inwardEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  fromLocation: z.string().min(1, 'From Location is required'),
  vendor: z.string().min(1, 'Vendor is required'),
  brand: z.string().min(1, 'Brand is required'),
  stnInvoiceNo: z.string().min(1, 'STN/Invoice No. is required'),
  stnDate: z.string().min(1, 'STN Date is required'),
  deliveryNo: z.string().min(1, 'Delivery No/AWB Number is required'),
  noOfBoxes: z.number().min(1, 'Number of boxes must be at least 1'),
  materialDocQuantity: z.number().min(0, 'Material document quantity must be non-negative'),
  countedQuantity: z.number().min(0, 'Counted quantity must be non-negative'),
  difference: z.number().optional(),
  grnNumber: z.string().min(1, 'GRN Number is required'),
  grnDate: z.string().min(1, 'GRN Date is required'),
  grdcNo: z.string().min(1, 'GRDC No is required'),
  dateOfGrdc: z.string().min(1, 'Date of GRDC is required'),
  status: z.enum(['open', 'closed']),
  inwardBy: z.string().min(1, 'Inward By is required'),
  wayBillDetails: z.string().min(1, 'Way Bill Details is required'),
  waybillOutwardBy: z.string().min(1, 'Waybill Outward By is required'),
  supervisorSign: z.string().min(1, 'Supervisor Sign is required'),
  remarks: z.string().optional(),
});

type InwardEntryFormData = z.infer<typeof inwardEntrySchema>;

interface InwardEntryFormProps {
  onSubmit: (data: InwardEntryFormData) => void;
  initialData?: InwardEntryFormData;
  isEditing?: boolean;
}

export const InwardEntryForm: React.FC<InwardEntryFormProps> = ({ onSubmit, initialData, isEditing = false }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(initialData?.date ? new Date(initialData.date) : new Date());
  const [selectedStnDate, setSelectedStnDate] = useState<Date | undefined>(initialData?.stnDate ? new Date(initialData.stnDate) : new Date());
  const [selectedGrnDate, setSelectedGrnDate] = useState<Date | undefined>(initialData?.grnDate ? new Date(initialData.grnDate) : new Date());
  const [selectedGrdcDate, setSelectedGrdcDate] = useState<Date | undefined>(initialData?.dateOfGrdc ? new Date(initialData.dateOfGrdc) : new Date());

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<InwardEntryFormData>({
    resolver: zodResolver(inwardEntrySchema),
    defaultValues: initialData || {
      status: 'open',
      date: new Date().toISOString().split('T')[0],
      stnDate: new Date().toISOString().split('T')[0],
      grnDate: new Date().toISOString().split('T')[0],
      dateOfGrdc: new Date().toISOString().split('T')[0],
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedDate(initialData.date ? new Date(initialData.date) : new Date());
      setSelectedStnDate(initialData.stnDate ? new Date(initialData.stnDate) : new Date());
      setSelectedGrnDate(initialData.grnDate ? new Date(initialData.grnDate) : new Date());
      setSelectedGrdcDate(initialData.dateOfGrdc ? new Date(initialData.dateOfGrdc) : new Date());
    }
  }, [initialData, reset]);

  const materialDocQuantity = watch('materialDocQuantity') || 0;
  const countedQuantity = watch('countedQuantity') || 0;
  const difference = countedQuantity - materialDocQuantity;

  const onSubmitForm = (data: InwardEntryFormData) => {
    onSubmit({
      ...data,
      difference,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      {/* Basic Information - Read-only when editing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !selectedDate && 'text-muted-foreground'
                )}
                disabled={isEditing}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setValue('date', date ? format(date, 'yyyy-MM-dd') : '');
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromLocation">From Location *</Label>
          <Input
            id="fromLocation"
            {...register('fromLocation')}
            placeholder="Enter source location"
            disabled={isEditing}
            className={isEditing ? 'bg-gray-50' : ''}
          />
          {errors.fromLocation && <p className="text-sm text-red-500">{errors.fromLocation.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor *</Label>
          <Input
            id="vendor"
            {...register('vendor')}
            placeholder="Enter vendor name"
            disabled={isEditing}
            className={isEditing ? 'bg-gray-50' : ''}
          />
          {errors.vendor && <p className="text-sm text-red-500">{errors.vendor.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <Input
            id="brand"
            {...register('brand')}
            placeholder="Enter brand name"
            disabled={isEditing}
            className={isEditing ? 'bg-gray-50' : ''}
          />
          {errors.brand && <p className="text-sm text-red-500">{errors.brand.message}</p>}
        </div>
      </div>

      {/* Document Information - Read-only when editing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="stnInvoiceNo">STN/Invoice No. *</Label>
          <Input
            id="stnInvoiceNo"
            {...register('stnInvoiceNo')}
            placeholder="Enter STN/Invoice number"
            disabled={isEditing}
            className={isEditing ? 'bg-gray-50' : ''}
          />
          {errors.stnInvoiceNo && <p className="text-sm text-red-500">{errors.stnInvoiceNo.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stnDate">STN Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !selectedStnDate && 'text-muted-foreground'
                )}
                disabled={isEditing}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedStnDate ? format(selectedStnDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedStnDate}
                onSelect={(date) => {
                  setSelectedStnDate(date);
                  setValue('stnDate', date ? format(date, 'yyyy-MM-dd') : '');
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.stnDate && <p className="text-sm text-red-500">{errors.stnDate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="deliveryNo">Delivery No/AWB Number *</Label>
          <Input
            id="deliveryNo"
            {...register('deliveryNo')}
            placeholder="Enter delivery/AWB number"
          />
          {errors.deliveryNo && <p className="text-sm text-red-500">{errors.deliveryNo.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="noOfBoxes">No. of Boxes *</Label>
          <Input
            id="noOfBoxes"
            type="number"
            {...register('noOfBoxes', { valueAsNumber: true })}
            placeholder="Enter number of boxes"
          />
          {errors.noOfBoxes && <p className="text-sm text-red-500">{errors.noOfBoxes.message}</p>}
        </div>
      </div>

      {/* Quantity Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="materialDocQuantity">Material Document Quantity *</Label>
          <Input
            id="materialDocQuantity"
            type="number"
            {...register('materialDocQuantity', { valueAsNumber: true })}
            placeholder="Enter document quantity"
          />
          {errors.materialDocQuantity && <p className="text-sm text-red-500">{errors.materialDocQuantity.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="countedQuantity">Counted Quantity *</Label>
          <Input
            id="countedQuantity"
            type="number"
            {...register('countedQuantity', { valueAsNumber: true })}
            placeholder="Enter counted quantity"
          />
          {errors.countedQuantity && <p className="text-sm text-red-500">{errors.countedQuantity.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="difference">Difference (Auto-calculated)</Label>
          <Input
            id="difference"
            value={difference}
            disabled
            className="bg-muted"
          />
        </div>
      </div>

      {/* GRN Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grnNumber">GRN Number *</Label>
          <Input
            id="grnNumber"
            {...register('grnNumber')}
            placeholder="Enter GRN number"
          />
          {errors.grnNumber && <p className="text-sm text-red-500">{errors.grnNumber.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grnDate">GRN Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !selectedGrnDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedGrnDate ? format(selectedGrnDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedGrnDate}
                onSelect={(date) => {
                  setSelectedGrnDate(date);
                  setValue('grnDate', date ? format(date, 'yyyy-MM-dd') : '');
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.grnDate && <p className="text-sm text-red-500">{errors.grnDate.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grdcNo">GRDC No (For Short Deliveries) *</Label>
          <Input
            id="grdcNo"
            {...register('grdcNo')}
            placeholder="Enter GRDC number"
          />
          {errors.grdcNo && <p className="text-sm text-red-500">{errors.grdcNo.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dateOfGrdc">Date of GRDC *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !selectedGrdcDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedGrdcDate ? format(selectedGrdcDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={selectedGrdcDate}
                onSelect={(date) => {
                  setSelectedGrdcDate(date);
                  setValue('dateOfGrdc', date ? format(date, 'yyyy-MM-dd') : '');
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dateOfGrdc && <p className="text-sm text-red-500">{errors.dateOfGrdc.message}</p>}
        </div>
      </div>

      {/* Status and Personnel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select onValueChange={(value) => setValue('status', value as 'open' | 'closed')} defaultValue="open">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="inwardBy">Inward By *</Label>
          <Input
            id="inwardBy"
            {...register('inwardBy')}
            placeholder="Enter inward personnel name"
          />
          {errors.inwardBy && <p className="text-sm text-red-500">{errors.inwardBy.message}</p>}
        </div>
      </div>

      {/* Waybill Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="wayBillDetails">Way Bill Details *</Label>
          <Input
            id="wayBillDetails"
            {...register('wayBillDetails')}
            placeholder="Enter waybill details"
          />
          {errors.wayBillDetails && <p className="text-sm text-red-500">{errors.wayBillDetails.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="waybillOutwardBy">Waybill Outward By *</Label>
          <Input
            id="waybillOutwardBy"
            {...register('waybillOutwardBy')}
            placeholder="Enter outward personnel name"
          />
          {errors.waybillOutwardBy && <p className="text-sm text-red-500">{errors.waybillOutwardBy.message}</p>}
        </div>
      </div>

      {/* Supervisor Sign */}
      <div className="space-y-2">
        <Label htmlFor="supervisorSign">Supervisor Sign *</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="supervisorSign"
            {...register('supervisorSign')}
            placeholder="Enter supervisor signature or name"
          />
          <Button type="button" variant="outline" size="sm">
            <PenTool className="h-4 w-4 mr-2" />
            Sign
          </Button>
        </div>
        {errors.supervisorSign && <p className="text-sm text-red-500">{errors.supervisorSign.message}</p>}
      </div>

      {/* Remarks */}
      <div className="space-y-2">
        <Label htmlFor="remarks">Remarks</Label>
        <Textarea
          id="remarks"
          {...register('remarks')}
          placeholder="Enter any additional remarks"
          rows={3}
        />
        {errors.remarks && <p className="text-sm text-red-500">{errors.remarks.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-[#181f60] hover:bg-[#4f5fff]">
          {isEditing ? 'Submit Entry' : 'Create Entry'}
        </Button>
      </div>
    </form>
  );
}; 