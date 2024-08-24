import { announcementsData } from '@/lib/data';

const Announcement = () => {
  return (
    <div className='p-4 bg-white rounded-md'>
            {/* TITLE */}
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Announcements</h1>
                <span className='text-gray-400 text-xs'>View All</span>
            </div>

            <div className='flex flex-col gap-4 mt-4'>
                {announcementsData.slice(0, 3).map((announcement) => (
                    <div key={announcement.id} className='p-4 rounded-md border-2 odd:bg-encSkyLight even:bg-encPurpleLight'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-semibold text-gray-600'>{announcement.title}</h2>
                            <span className='text-gray-400 text-xs bg-white p-1 rounded-md'>{announcement.date}</span>
                        </div>

                        <p className='truncate mt-1 text-gray-400 text-sm'>{announcement.description}</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Announcement