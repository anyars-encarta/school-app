'use client';

import Announcement from '@/components/Announcement';
import BigCalendar from '@/components/BigCalendar';
// import EventCalendar from '@/components/EventCalendar';

const TeacherPage = () => {
  return (
    <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
      <div className='h-full bg-white p-4 rounded-md'>
        <h1 className='text-xl font-semibold'>Schedule</h1>
        <BigCalendar />
      </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        {/* <EventCalendar /> */}

        <Announcement />
      </div>
    </div>
  )
}

export default TeacherPage