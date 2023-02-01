import i18n from 'i18n-js';
import { IFillYourDataModal } from './interfaces';

export const prettyDate = (date: string) => {
  const newDate = new Date(date);
  if (!newDate) { return 'invalid date'; }
  return `${newDate.getDate()} ${i18n.t('month_' + (newDate.getMonth() + 1))} ${newDate.getFullYear()}`;
};

export const prettyDateForCalendar = (date: string | Date) => {
  const newDate = new Date(date);
  if (!newDate) { return 'invalid date'; }
  return `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2).slice(-2)}-${('0' + newDate.getDate()).slice(-2)}`;
};

export function sameDay(d1: Date | string, d2: Date | string): boolean {
  const date1 = new Date(d1);
  const date2 = new Date(d2);
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}

export const hourOptions = (lowerLimit: any, upperLimit: any, date?: Date | string) => {
  const result = [] as any;
  let lowerLimitNew = lowerLimit;
  if (date && sameDay(date, new Date())) {
    lowerLimitNew = new Date().getHours() + 1;
  }
  for (let i = lowerLimitNew ?? 0; i <= (upperLimit ?? 24); i++) {
    result.push({
      value: i,
      label: `${i}:00`,
    });
  }
  return result;
};

export const triggerFillYourDataModal = ({ lastShownDate, daysToBeShown, isVisible }: IFillYourDataModal): boolean => {
  if (!lastShownDate) {
    return true;
  } else {
    const date = new Date(lastShownDate);
    const today = new Date();
    // @ts-ignore
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= daysToBeShown) {
      return true;
    } else {
      return false;
    }
  }
}
