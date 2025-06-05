import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import SignaturePad from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EBCountEntry } from './EBCountList';

interface EBCountFormProps {
  onSubmit: (data: Omit<EBCountEntry, 'id' | 'createdAt' | 'shortExcess'>) => void;
}

export const EBCountForm: React.FC<EBCountFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Omit<EBCountEntry, 'id' | 'createdAt' | 'shortExcess'>>();
  const signaturePadRef = useRef<SignaturePad>(null);
  const [signature, setSignature] = useState<string>('');

  const physicalQuantity = watch('physicalQuantity', 0);
  const sohQuantity = watch('sohQuantity', 0);
  const shortExcess = physicalQuantity - sohQuantity;

  const handleClearSignature = () => {
    signaturePadRef.current?.clear();
    setSignature('');
  };

  const handleSaveSignature = () => {
    if (signaturePadRef.current?.isEmpty()) {
      return;
    }
    const signatureData = signaturePadRef.current?.toDataURL() || '';
    setSignature(signatureData);
  };

  const onSubmitForm = (data: Omit<EBCountEntry, 'id' | 'createdAt' | 'shortExcess'>) => {
    if (!signature) {
      alert('Please provide a brand signature');
      return;
    }
    onSubmit({
      ...data,
      brandSign: signature
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="brandName">Brand Name</Label>
          <Input
            id="brandName"
            {...register('brandName', { required: 'Brand name is required' })}
          />
          {errors.brandName && (
            <p className="text-sm text-red-500">{errors.brandName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="physicalQuantity">Physical Quantity</Label>
          <Input
            id="physicalQuantity"
            type="number"
            {...register('physicalQuantity', { 
              required: 'Physical quantity is required',
              min: { value: 0, message: 'Quantity must be positive' }
            })}
          />
          {errors.physicalQuantity && (
            <p className="text-sm text-red-500">{errors.physicalQuantity.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sohQuantity">SOH Quantity</Label>
          <Input
            id="sohQuantity"
            type="number"
            {...register('sohQuantity', { 
              required: 'SOH quantity is required',
              min: { value: 0, message: 'Quantity must be positive' }
            })}
          />
          {errors.sohQuantity && (
            <p className="text-sm text-red-500">{errors.sohQuantity.message}</p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Short/Excess</Label>
          <Input
            value={shortExcess}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label>Brand Sign</Label>
          <div className="border rounded-lg p-2">
            <SignaturePad
              ref={signaturePadRef}
              canvasProps={{
                className: 'w-full h-32 border rounded'
              }}
            />
            <div className="flex justify-end gap-2 mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClearSignature}
              >
                Clear
              </Button>
              <Button
                type="button"
                onClick={handleSaveSignature}
              >
                Save Signature
              </Button>
            </div>
          </div>
          {signature && (
            <div className="mt-2">
              <img
                src={signature}
                alt="Saved Signature"
                className="h-16 w-32 object-contain border rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit">Create Entry</Button>
      </div>
    </form>
  );
}; 