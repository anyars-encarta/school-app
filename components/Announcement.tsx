import { announcementsData } from '@/lib/data';
import { getAuthData } from '@/lib/utils';
import prisma from '@/prisma';


const Announcement = async () => {
    const { userId, role } = await getAuthData();

    const roleConditions = {
        teacher: { lessons: { some: { teacherId: userId! } } },
        student: { students: { some: { id: userId! } } },
        parent: { students: { some: { parentId: userId! } } },
    };

    const announcements = await prisma.announcement.findMany({
        take: 3,
        orderBy: { date: "desc" },
        where: {
            ...(role !== "admin" && {
                OR: [
                    { classId: null }, { class: roleConditions[role as keyof typeof roleConditions] || {} },
                ],
            }),
        },
    });

    return (
        <div className='p-4 bg-white rounded-md'>
            {/* TITLE */}
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>Announcements</h1>
                <span className='text-gray-400 text-xs'>View All</span>
            </div>

            <div className='flex flex-col gap-4 mt-4'>
                {announcements && announcements.map((announcement) => (
                    <div key={announcement.id} className='p-4 rounded-md border-2 odd:bg-encSkyLight even:bg-encPurpleLight'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-semibold text-gray-600'>{announcement.title}</h2>
                            <span className='text-gray-400 text-xs bg-white p-1 rounded-md'>{new Intl.DateTimeFormat('en-US').format(announcement.date)}</span>
                        </div>

                        <p className='line-clamp-2 mt-1 text-gray-400 text-sm'>{announcement.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Announcement