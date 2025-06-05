import React from 'react';
import { Calendar, Store } from 'lucide-react';

export interface Appointment {
  id: string;
  title: string;
  type: 'customer' | 'task';
  startTime: string;
  endTime: string;
  customer?: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface AppointmentBlockProps {
  appointment: Appointment;
  onClick?: () => void;
}

export const AppointmentBlock: React.FC<AppointmentBlockProps> = ({ appointment, onClick }) => {
  const getDuration = () => {
    const [startHours, startMinutes] = appointment.startTime.split(':').map(Number);
    const [endHours, endMinutes] = appointment.endTime.split(':').map(Number);
    const durationMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    return Math.max(durationMinutes / 30, 1); // Minimum 1 slot height
  };

  const getAppointmentStyles = () => {
    // Ongoing event check
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [startHours, startMinutes] = appointment.startTime.split(':').map(Number);
    const [endHours, endMinutes] = appointment.endTime.split(':').map(Number);
    const startTime = startHours * 60 + startMinutes;
    const endTime = endHours * 60 + endMinutes;
    const isOngoing = nowMinutes >= startTime && nowMinutes < endTime;
    if (isOngoing) {
      return {
        bg: 'bg-green-100 border-green-400',
        text: 'text-green-900',
        icon: 'text-green-600',
        time: 'text-green-700',
      };
    }
    if (appointment.type === 'customer') {
      return {
        bg: 'bg-blue-100 border-blue-300',
        text: 'text-blue-900',
        icon: 'text-blue-600',
        time: 'text-blue-700',
      };
    } else {
      return {
        bg: 'bg-purple-100 border-purple-300',
        text: 'text-purple-900',
        icon: 'text-purple-600',
        time: 'text-purple-700',
      };
    }
  };

  const styles = getAppointmentStyles();
  const duration = getDuration();

  return (
    <div
      className={`${styles.bg} border-l-4 rounded-r-lg p-3 ${styles.text} relative transition-shadow cursor-pointer hover:shadow-md overflow-hidden`}
      style={{ height: `${duration * 2}rem` }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center min-w-0 gap-2 truncate">
          {appointment.type === 'customer' ? (
            <Store className={`w-4 h-4 flex-shrink-0 ${styles.icon}`} />
          ) : (
            <Calendar className={`w-4 h-4 flex-shrink-0 ${styles.icon}`} />
          )}
          <span className="font-medium text-sm truncate block max-w-[10rem]">{appointment.title}</span>
        </div>
        <span className={`text-xs font-semibold ml-2 whitespace-nowrap ${styles.time}`}>{appointment.startTime} - {appointment.endTime}</span>
      </div>
      {appointment.description && (
        <div className="text-xs opacity-75 mt-1 truncate block max-w-full overflow-hidden text-ellipsis">{appointment.description}</div>
      )}
      {appointment.priority && appointment.priority !== 'low' && (
        <div className={`w-2 h-2 rounded-full absolute top-3 right-3 ${
          appointment.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
        }`}></div>
      )}
    </div>
  );
};
