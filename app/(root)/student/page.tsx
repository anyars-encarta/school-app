'use client';

import Announcement from '@/components/Announcement';
import BigCalendar from '@/components/calendar/BigCalendar';
import BigCalendarContainer from '@/components/calendar/BigCalendarContainer';
import EventCalendarContainer from '@/components/calendar/EventCalendarContainer';

const StudentPage = ({ searchParams }: { searchParams: { [keys: string]: string | undefined } }) => {
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
      <div className='h-full bg-white p-4 rounded-md'>
        <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
        <BigCalendarContainer type="classId"/>
      </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendarContainer searchParams={searchParams}/>

        <Announcement />
      </div>
    </div>
  )
}

export default StudentPage