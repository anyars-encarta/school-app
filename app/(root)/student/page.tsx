import Announcement from '@/components/Announcement';
import BigCalendar from '@/components/calendar/BigCalendar';
import BigCalendarContainer from '@/components/calendar/BigCalendarContainer';
import EventCalendarContainer from '@/components/calendar/EventCalendarContainer';
import { getAuthData } from '@/lib/utils';
import prisma from '@/prisma';

const StudentPage = async ({ searchParams }: { searchParams: { [keys: string]: string | undefined } }) => {
  const { userId } = await getAuthData();

  const classItem = await prisma.class.findMany({
    where: {
      students: { some: { id: userId! } }
    }
  });

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row'>
      {/* LEFT */}
      <div className='w-full xl:w-2/3'>
        <div className='h-full bg-white p-4 rounded-md'>
          <h1 className='text-xl font-semibold'>Schedule (4A)</h1>
          <BigCalendarContainer type="classId" id={classItem[0].id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendarContainer searchParams={searchParams} />

        <Announcement />
      </div>
    </div>
  )
}

export default StudentPage