import {useState} from 'react';
import {DateRangePicker, DateRangePickerValue} from '@mantine/dates';

export interface RangeDatePickerProps {
    startingDate?: Date;
    endingDate?: Date;
    callback: (startingDate: Date | null, endingDate: Date | null) => void;
}

export default function RangeDatePicker({startingDate, endingDate, callback}: RangeDatePickerProps) {
    const [value, setValue] = useState<DateRangePickerValue>([
        // new Date(2021, 11, 1),
        // new Date(2021, 11, 5),
        // use provided dates, otherwise use today as starting date and 7 days later as ending date
        startingDate || new Date(),
        endingDate || new Date(new Date().setDate(new Date().getDate() + 7)),
    ]);

    return (
        <DateRangePicker
            label="Book hotel"
            placeholder="Pick dates range"
            value={value}
            onChange={(val) => {
                setValue(val);
                callback(val[0], val[1]);
            }}
        />
    );
}
