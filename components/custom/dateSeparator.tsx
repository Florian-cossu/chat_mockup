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
  locale, // Si pas fourni, on utilisera la locale du navigateur
  timeZone // Si pas fourni, on utilisera le timezone du navigateur
}: DateSeparatorProps) {
  
  const formatDateSeparator = (timestamp: Date | string) => {
    // Détection automatique de la locale et timezone si non fournies
    const userLocale = locale || navigator.language || 'en-US';
    const userTimeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Conversion en date locale de l'utilisateur
    const dateObj = new Date(timestamp);
    
    // Dates de référence dans le timezone de l'utilisateur
    const now = new Date();
    const today = new Date(now.toLocaleString("en-US", { timeZone: userTimeZone }));
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Date du message dans le timezone de l'utilisateur
    const messageDate = new Date(dateObj.toLocaleString("en-US", { timeZone: userTimeZone }));
    
    // Fonction pour obtenir juste la date (sans l'heure) pour comparaison
    const getDateString = (d: Date) => d.toDateString();
    
    // Textes localisés pour les jours relatifs
    const getRelativeDay = (locale: string) => {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
      
      if (getDateString(messageDate) === getDateString(today)) {
        // Pour "aujourd'hui", on utilise RelativeTimeFormat avec 0 jours
        return rtf.format(0, 'day');
      } else if (getDateString(messageDate) === getDateString(yesterday)) {
        return rtf.format(-1, 'day');
      } else if (getDateString(messageDate) === getDateString(tomorrow)) {
        return rtf.format(1, 'day');
      }
      
      return null; // Pas un jour relatif
    };
    
    const relativeDay = getRelativeDay(userLocale);
    
    if (relativeDay) {
      // Capitaliser la première lettre
      return relativeDay.charAt(0).toUpperCase() + relativeDay.slice(1);
    }
    
    // Formatage de date complète localisée
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
      <span className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
        {formatDateSeparator(date)}
      </span>
    </div>
  );
}