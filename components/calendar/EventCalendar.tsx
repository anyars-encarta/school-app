'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Event from '../Event';
import { useRouter } from 'next/navigation';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    const router = useRouter();

    useEffect(() => {
        if(value instanceof Date) {
            router.push(`?date=${value.toLocaleDateString('en-US')}`);
        }
    }, [value, router]);

    return (
        <Calendar onChange={onChange} value={value} />
    )
}

export default EventCalendar;