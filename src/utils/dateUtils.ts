import { format } from 'date-fns';

export const formatDate = (timestamp: number): string => {
  return format(new Date(timestamp), 'EEEE, MMMM d, yyyy | h:mm a');
};