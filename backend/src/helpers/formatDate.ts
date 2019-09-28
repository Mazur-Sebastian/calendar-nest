import { format, parseISO } from 'date-fns';

import { dateFormat } from 'src/constants/config';

export const formatDate = (date: string) => {
    const parsedDate = parseISO(date);
    const lockedDate = format(parsedDate, dateFormat);

    return lockedDate;
};
