import { eventsData } from '@/lib/data';
import Image from 'next/image'
import React from 'react'

const Event = () => {
    return (
        <div className='p-4'>
            {/* TITLE */}
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold my-4'>Events</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>

            <div className='flex flex-col gap-4'>
                {eventsData.map((event) => (
                    <div key={event.id} className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-encSky even:border-t-encPurple'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-semibold text-gray-600'>{event.title}</h2>
                            <span className='text-gray-300 text-xs'>{event.startTime} - {event.endTime}</span>
                        </div>

                        <p className='truncate mt-2 text-gray-400 text-sm'>{event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Event;