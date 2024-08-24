'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Events from './Event';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className='bg-white rounded-md'>
            <Calendar onChange={onChange} value={value} />

            <Events />
        </div>
    )
}

export default EventCalendar