import { cn } from "@/lib/utils";

interface DateSeparatorProps {
  date: Date | string;
  className?: string;
  locale?: string;
  timeZone?: string;
}

export default function DateSeparator({ 
  date, 
  className,
  locale,
  timeZone
}: DateSeparatorProps) {
  
  const formatDateSeparator = (timestamp: Date | string) => {
    const userLocale = locale || navigator.language || 'en-US';
    const userTimeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const dateObj = new Date(timestamp);
    
    const now = new Date();
    const today = new Date(now.toLocaleString("en-US", { timeZone: userTimeZone }));
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const messageDate = new Date(dateObj.toLocaleString("en-US", { timeZone: userTimeZone }));
    
    const getDateString = (d: Date) => d.toDateString();
    
    const getRelativeDay = (locale: string) => {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      
      if (getDateString(messageDate) === getDateString(today)) {
        return rtf.format(0, 'day');
      } else if (getDateString(messageDate) === getDateString(yesterday)) {
        return rtf.format(-1, 'day');
      } else if (getDateString(messageDate) === getDateString(tomorrow)) {
        return rtf.format(1, 'day');
      }
      
      return null;
    };
    
    const relativeDay = getRelativeDay(userLocale);
    
    if (relativeDay) {
      return relativeDay.charAt(0).toUpperCase() + relativeDay.slice(1);
    }
    
    return messageDate.toLocaleDateString(userLocale, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: userTimeZone
    });
  };

  return (
    <div className={cn("flex justify-center my-2", className)}>
      <span className="px-3 py-1 text-xs text-gray-500 dark:text-white/40 bg-gray-100 dark:bg-accent rounded-full">
        {formatDateSeparator(date)}
      </span>
    </div>
  );
}