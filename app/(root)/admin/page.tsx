import UserCard from '@/components/UserCard';
import CountChart from '@/components/charts/CountChart'
import AttendanceChart from '@/components/charts/AttendanceChart';
import FinanceChart from '@/components/charts/FinanceChart';
import Announcement from '@/components/Announcement';
import EventCalendar from '@/components/calendar/EventCalendar';
import CountChartContainer from '@/components/charts/CountChartContainer';
import AttendanceChartContainer from '@/components/charts/AttendanceChartContainer';
import EventCalendarContainer from '@/components/calendar/EventCalendarContainer';

const AdminPage = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* LEFT */}
      <div className='flex flex-col gap-8 w-full lg:w-2/3'>
        <div className='flex gap-4 justify-between flex-wrap'>
          <UserCard type='admin' />
          <UserCard type='student' />
          <UserCard type='teacher' />
          <UserCard type='parent' />
        </div>

        {/* MIDDLE CHARTS */}
        <div className='flex gap-4 flex-col lg:flex-row'>
          {/* COUNT CHART */}
          <div className='w-full lg:w-1/3 h-[450px]'>
            <CountChartContainer />
          </div>

          {/* ATTENDANCE CHART */}
          <div className='w-2/3'>
            <AttendanceChartContainer />
          </div>
        </div>

        {/* FINANCE CHART */}
        <div className='w-full h-[500px]'>
          <FinanceChart />
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 flex flex-col gap-8'>
        <EventCalendarContainer />

        <Announcement />
      </div>
    </div>
  )
}

export default AdminPage