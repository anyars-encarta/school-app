import Pagination from '@/components/tables/Pagination'
import EventsTable from '@/components/tables/EventsTable';
import TableSearch from '@/components/TableSearch'
import { role, eventsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { eventsColumns } from '@/constants/tableColumns';
import FormModal from '@/components/forms/FormModal';
import { EventsParams } from '@/app/types';
import { Class, Event, Prisma } from '@prisma/client';
import prisma from '@/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';

type eventsList = Event & { class: Class };

const renderRow = (item: eventsList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-encSkyLight'>
        <td className='flex items-center gap-4 p-4'>{item.title}</td>
        <td className='hidden md:table-cell'>{item.description}</td>
        <td>{item.class.name}</td>
        <td className='hidden md:table-cell'>{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td className='hidden md:table-cell'>{item.startTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}</td>
        <td className='hidden md:table-cell'>{item.endTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: false })}</td>

        <td>
            <div className='flex items-center gap-2'>
                {role === 'admin' && (
                    <>
                        {/* <Link href={`/list/teachers/${item.id}`}> */}
                        {/* <button className='flex items-center justify-center rounded-full bg-encSky'>
                                <Image src='/update.png' alt='' width={16} height={16} />
                            </button> */}
                        <FormModal table='event' type='update' data={
                            {
                                id: 1,
                                title: "Lake Trip",
                                description: "A memorable Lake Trip to entertain both students and teachers. It will be full of fun, excitement and lessons to learn from the trip.",
                                class: "1A",
                                date: "2025-01-01",
                                startTime: "10:00 AM",
                                endTime: "11:00 AM",
                            }
                        } />
                        {/* </Link> */}


                        {/* <button className='flex items-center justify-center rounded-full bg-encPurple'>
                            <Image src='/delete.png' alt='' width={16} height={16} />
                        </button> */}
                        <FormModal table='event' type='delete' id={item.id} />
                    </>
                )}
            </div>
        </td>
    </tr>
);

const EventsList = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITIONS
    const query: Prisma.EventWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "search":
                        query.title = { contains: value, mode: "insensitive" }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [events, count] = await prisma.$transaction([
        prisma.event.findMany({
            where: query,
            include: {
                class: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1)
        }),

        prisma.event.count({ where: query })
    ]);

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold '>All Events</h1>

                <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
                    <TableSearch />

                    <div className='flex items-center gap-4 self-end'>
                        <button className='w-8 h-8 rounded-full bg-encYellow flex items-center justify-center'>
                            <Image src='/filter.png' alt='filter' width={14} height={14} />
                        </button>

                        <button className='w-8 h-8 rounded-full bg-encYellow flex items-center justify-center'>
                            <Image src='/sort.png' alt='filter' width={14} height={14} />
                        </button>

                        {role === 'admin' && (
                            // <button className='w-8 h-8 rounded-full bg-encYellow flex items-center justify-center'>
                            //     <Image src='/create.png' alt='filter' width={14} height={14} />
                            // </button>
                            <FormModal table='event' type='create' />
                        )}
                    </div>
                </div>
            </div>

            {/* LIST */}
            <EventsTable eventsColumns={eventsColumns} renderRow={renderRow} data={events} />

            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    )
}

export default EventsList