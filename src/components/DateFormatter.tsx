import React from 'react';
import { formatInTimeZone } from 'date-fns-tz'

interface DateFormatterProps {
    isoDateString: string;
    timeZone: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ isoDateString, timeZone }) => {

    const date = new Date(isoDateString);
    const formattedDate = formatInTimeZone(date, timeZone, 'EEEE, MMMM d, yyyy, HH:mm') // 2014-10-25 06:46:20-04:00
    return <>{formattedDate}</>;
};

export default DateFormatter;
