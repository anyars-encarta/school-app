import Announcement from '@/components/Announcement';
import BigCalendarContainer from '@/components/calendar/BigCalendarContainer';
import { getAuthData } from '@/lib/utils';

// import EventCalendar from '@/components/EventCalendar';

const TeacherPage = async () => {
  const { userId } = await getAuthData();

  return (
    <div className='flex-1 p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule</h1>
          <BigCalendarContainer type="teacherId" id={userId!} />
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