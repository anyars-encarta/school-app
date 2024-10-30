'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Event from '../Event';
import { useRouter } from 'next/navigation';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = ({ eventsData }: { eventsData: any}) => {
    const [value, onChange] = useState<Value>(new Date());

    const data = eventsData;

    const router = useRouter();

    useEffect(() => {
        if(value instanceof Date) {
            router.push(`?date=${value}`)
        }
    }, [value, router]);

    return (
        <div className='bg-white p-4 rounded-md'>
            <Calendar onChange={onChange} value={value} />

            <Event eventsData={data} />
        </div>
    )
}

export default EventCalendar