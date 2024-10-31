import prisma from "@/prisma";

const EventList = async ({ dateParam }: { dateParam: string | undefined }) => {
    const date = dateParam ? new Date(dateParam) : new Date();

    const data = await prisma.event.findMany({
        where: {
            startTime: {
                gte: new Date(date.setHours(0, 0, 0, 0)),
                lte: new Date(date.setHours(23, 59, 59, 999)),
            }
        }
    });
    
    return data.map((event: any) => (
        <div key={event.id} className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-encSky even:border-t-encPurple'>
            <div className='flex items-center justify-between'>
                <h2 className='font-semibold text-gray-600'>{event.title}</h2>
                <span className='text-gray-300 text-xs'>{event.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false})} - {event.endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false})}</span>
            </div>

            <p className='truncate mt-2 text-gray-400 text-sm'>{event.description}</p>
        </div>
    ))
}

export default EventList