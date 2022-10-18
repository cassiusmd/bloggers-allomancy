import { DateTime } from 'luxon';

// use 'system' for local timezone, 'utc' for UTC
export function ToTimezone(
    value: Date | string,
    timezone = 'America/Los_Angeles'
): DateTime {
    if (value instanceof Date) {
        value = value.toISOString();
    }
    const dt = DateTime.fromISO(value, { zone: 'utc' });
    // return dt.setZone(timezone).toISO({ includeOffset: false });
    return dt.setZone(timezone);
}

export function ToFormattedDate(
    value: Date,
    timezone = 'America/Los_Angeles',
    format = DateTime.DATETIME_MED
): string {
    return ToTimezone(value, timezone).toLocaleString(format);
}

export function ToShortFormattedDate(
    value: Date,
    timezone = 'America/Los_Angeles',
    format = DateTime.DATETIME_SHORT
): string {
    return ToTimezone(value, timezone).toLocaleString(format);
}
