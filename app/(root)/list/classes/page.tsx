import Pagination from '@/components/tables/Pagination'
import ClassTable from '@/components/tables/ClassTable';
import TableSearch from '@/components/TableSearch'
import { role, classesData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { classColumns } from '@/constants/tableColumns';
import FormModal from '@/components/forms/FormModal';
import { ClassesParams } from '@/app/types';
import { Announcement, Class, Lesson, Prisma, Student, Teacher } from '@prisma/client';
import prisma from '@/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';

type classList = Class & { supervisor: Teacher }

const renderRow = (item: classList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-encSkyLight'>
        <td className='flex items-center gap-4 p-4'>{item.name}</td>
        <td className='hidden md:table-cell'>{item.capacity}</td>
        <td className='hidden md:table-cell'>{item.name[0]}</td>
        <td className='hidden md:table-cell'>{item.supervisor.name + ' ' + item.supervisor.surname}</td>

        <td>
            <div className='flex items-center gap-2'>
                {role === 'admin' && (
                    <>
                        {/* <Link href={`/list/teachers/${item.id}`}> */}
                        {/* <button className='flex items-center justify-center rounded-full bg-encSky'>
                                <Image src='/update.png' alt='' width={16} height={16} />
                            </button> */}
                        <FormModal table='class' type='update' data={
                            {
                                id: 1,
                                name: "1A",
                                capacity: 20,
                                grade: 1,
                                supervisor: "Joseph Padilla",
                            }
                        } />
                        {/* </Link> */}


                        {/* <button className='flex items-center justify-center rounded-full bg-encPurple'>
                            <Image src='/delete.png' alt='' width={16} height={16} />
                        </button> */}
                        <FormModal table='class' type='delete' id={item.id} />
                    </>
                )}
            </div>
        </td>
    </tr>
);

const ClassesList = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITIONS
    const query: Prisma.ClassWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "supervisorId":
                        query.supervisorId = value;
                        break;
                    case "search":
                        query.name = {
                            contains: value,
                            mode: "insensitive",
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }

    const [classes, count] = await prisma.$transaction([
        prisma.class.findMany({
            where: query,
            include: {
                supervisor: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1)
        }),

        prisma.class.count({ where: query })
    ]);

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold '>All Classes</h1>

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
                            <FormModal table='class' type='create' />
                        )}
                    </div>
                </div>
            </div>

            {/* LIST */}
            <ClassTable classColumns={classColumns} renderRow={renderRow} data={classes} />

            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    )
}

export default ClassesList