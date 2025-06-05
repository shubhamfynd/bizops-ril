import React, { useState } from 'react';
import { format } from 'date-fns';
import { AppointmentBlock, Appointment } from './AppointmentBlock';
import { getAppointmentsForUser } from '@/data/mySchedule';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface DailyCalendarProps {
  selectedUser: string;
}

export const DailyCalendar: React.FC<DailyCalendarProps> = ({ selectedUser }) => {
  const today = new Date();
  const appointments = getAppointmentsForUser(selectedUser);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Generate time slots from 8 AM to 8 PM
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 20) timeSlots.push(`${hour}:30`);
  }

  const getAppointmentForTime = (time: string) => {
    return appointments.find(apt => {
      const [hours, minutes] = time.split(':').map(Number);
      const slotTime = hours * 60 + minutes;
      const [startHours, startMinutes] = apt.startTime.split(':').map(Number);
      const startTime = startHours * 60 + startMinutes;
      const [endHours, endMinutes] = apt.endTime.split(':').map(Number);
      const endTime = endHours * 60 + endMinutes;
      
      return slotTime >= startTime && slotTime < endTime;
    });
  };

  // Calculate position for the green line
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = 8 * 60;
  const endMinutes = 20 * 60;
  const percent = ((nowMinutes - startMinutes) / (endMinutes - startMinutes)) * 100;
  const showGreenLine = nowMinutes >= startMinutes && nowMinutes <= endMinutes;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 relative">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          {format(today, 'EEEE, MMM d, yyyy')}
        </h2>
        <p className="text-sm text-gray-500">Today's Schedule</p>
      </div>
      
      <div className="p-4 relative">
        {/* Green line for current time */}
        {showGreenLine && (
          <div
            className="absolute left-16 right-0 h-0.5 bg-green-500 z-10"
            style={{ top: `calc(${percent}% )` }}
          />
        )}
        <div className="space-y-2">
          {timeSlots.map((time, index) => {
            const appointment = getAppointmentForTime(time);
            const isHalfHour = time.includes(':30');
            
            return (
              <div key={time} className="flex items-center">
                <div className="w-16 text-sm text-gray-500 font-medium">
                  {!isHalfHour ? time : ''}
                </div>
                <div className="flex-1 ml-4 h-8 relative">
                  {!isHalfHour && (
                    <div className="absolute inset-x-0 top-0 border-t border-gray-100"></div>
                  )}
                  {appointment && time === appointment.startTime && (
                    <AppointmentBlock
                      appointment={appointment}
                      onClick={() => {
                        setSelectedAppointment(appointment);
                        setDialogOpen(true);
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            {selectedAppointment && (
              <div className="p-2">
                {/* Back arrow at the top left */}
                <button
                  className="absolute left-4 top-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                  onClick={() => setDialogOpen(false)}
                  aria-label="Back"
                  style={{ zIndex: 10 }}
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                </button>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold">{selectedAppointment.customer || selectedAppointment.title}</span>
                  {selectedAppointment.priority === 'high' && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">Hard Block</span>
                  )}
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">Upcoming</span>
                </div>
                <div className="flex items-center mb-2 text-gray-700">
                  <span className="mr-2">🕒</span>
                  <span>{selectedAppointment.startTime} AM - {selectedAppointment.endTime} AM</span>
                </div>
                <div className="flex items-center mb-2 text-gray-700">
                  <span className="mr-2">👤</span>
                  <span>Technical Support</span>
                </div>
                <div className="flex items-center mb-2 text-gray-700">
                  <span className="mr-2">📍</span>
                  <span>Tech Counter</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Notes</span>
                  <div className="text-gray-600 text-sm mt-1">{selectedAppointment.description || 'No notes.'}</div>
                </div>
                {selectedAppointment.type === 'customer' && (
                  <button
                    className="w-full mb-2 border border-blue-300 rounded-lg py-2 text-blue-700 font-medium hover:bg-blue-50 transition"
                    onClick={() => {/* handle view customer profile */}}
                  >
                    View Customer Profile
                  </button>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
