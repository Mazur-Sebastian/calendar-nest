import { formatDate } from './formatDate';

export const getDate = (date: string) => formatDate(date).split(' ')[0];
