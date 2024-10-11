import UserCard from '@/components/UserCard';
import CountChart from '@/components/charts/CountChart'
import AttendanceChart from '@/components/charts/AttendanceChart';
import FinanceChart from '@/components/charts/FinanceChart';
import Announcement from '@/components/Announcement';
import EventCalendar from '@/components/calendar/EventCalendar';

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='flex flex-col gap-8 w-full lg:w-2/3'>
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='student' />
          <UserCard type='teacher' />
          <UserCard type='parent' />
          <UserCard type='staff' />
        </div>

        {/* MIDDLE CHARTS */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* COUNT CHART */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChart />
          </div>

          {/* ATTENDANCE CHART */}
          <div className='w-2/3'>
            <AttendanceChart />
          </div>
        </div>

        {/* FINANCE CHART */}
        <div className='w-full h-[500px]'>
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendar />

        <Announcement />
      </div>
    </div>
  )
}

export default AdminPage