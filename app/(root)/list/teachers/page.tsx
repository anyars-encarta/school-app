import { TeacherParams } from '@/app/types';
import FormModal from '@/components/forms/FormModal';
import Pagination from '@/components/tables/Pagination'
import TeacherTable from '@/components/tables/TeacherTable';
import TableSearch from '@/components/TableSearch'
import { teacherColumns } from '@/constants/tableColumns'
import { role, teachersData } from '@/lib/data'
import { ITEM_PER_PAGE } from '@/lib/settings';
import prisma from '@/prisma';
import { Class, Prisma, Subject, Teacher } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link'

type teacherList = Teacher & { subjects: Subject[] } & { classes: Class[] };

const renderRow = (item: teacherList) => (
    <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-encSkyLight'>
        <td className='flex items-center gap-4 p-4'>
            <Image
                src={item.img || '/user.svg'}
                alt='teacher'
                width={40}
                height={40}
                className='md:hidden xl:block w-10 h-10 rounded-full object-cover'
            />

            <div className='flex flex-col'>
                <h3 className='font-semibold'>{item.name}</h3>
                <p className='text-sm text-gray-500'>{item?.email}</p>
            </div>
        </td>

        <td className='hidden md:table-cell'>{item.id}</td>
        <td className='hidden md:table-cell'>{item.subjects.map(subject => subject.name)?.join(",")}</td>
        <td className='hidden md:table-cell'>{item.classes.map(classItem => classItem.name)?.join(",")}</td>
        <td className='hidden md:table-cell'>{item.phone}</td>
        <td className='hidden md:table-cell'>{item.address}</td>

        <td>
            <div className='flex items-center gap-2'>
                {role === 'admin' && (
                    <>
                        <Link href={`/list/teachers/${item.id}`}>
                            <button className='w-7 h-7 rounded-full flex items-center justify-center bg-encPurple'>
                                <Image src='/view.png' alt='' width={16} height={16} />
                            </button>
                            {/* <FormModal table='teacher' type='update' data={item} /> */}
                        </Link>


                        {/* <button className='flex items-center justify-center rounded-full bg-encPurple'>
                            <Image src='/delete.png' alt='' width={16} height={16} />
                        </button> */}
                        <FormModal table='teacher' type='delete' id={item.id} />
                    </>
                )}
            </div>
        </td>
    </tr>
);

const TeacherList = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITIONS
    const query: Prisma.TeacherWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "classId":
                        query.lessons = {
                            some: {
                                classId: parseInt(value),
                            },
                        };
                        break;

                    case "search":
                        query.name = {
                            contains: value,
                            mode: "insensitive",
                        }
                }
            }
        }
    }

    const [teachers, count] = await prisma.$transaction([
        prisma.teacher.findMany({
            where: query,
            include: {
                subjects: true,
                classes: true
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1)
        }),

        prisma.teacher.count({where: query})
    ])

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold '>All Teachers</h1>

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
                            <FormModal table='teacher' type='create' />
                        )}
                    </div>
                </div>
            </div>

            {/* LIST */}
            <TeacherTable teacherColumns={teacherColumns} renderRow={renderRow} data={teachers} />

            {/* PAGINATION */}
            <Pagination page={p} count={count} />
        </div>
    )
}

export default TeacherList