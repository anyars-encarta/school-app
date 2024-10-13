import { StudentParams } from '@/app/types'
import FormModal from '@/components/forms/FormModal'
import Pagination from '@/components/tables/Pagination'
import StudentTable from '@/components/tables/StudentTable'
import TableSearch from '@/components/TableSearch'
import { studentColumns } from '@/constants/tableColumns'
import { role, studentsData } from '@/lib/data'
import { ITEM_PER_PAGE } from '@/lib/settings'
import prisma from '@/prisma'
import { Class, Prisma, Student } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type studentList = Student & { class: Class };

const renderRow = (item: studentList) => (
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
                <p className='text-sm text-gray-500'>{item?.class.name}</p>
            </div>
        </td>

        <td className='hidden md:table-cell'>{item.username}</td>
        <td className='hidden md:table-cell'>{item.class.name[0]}</td>
        <td className='hidden md:table-cell'>{item.phone}</td>
        <td className='hidden md:table-cell'>{item.address}</td>

        <td>
            <div className='flex items-center gap-2'>
                {role === 'admin' && (
                    <>
                        <Link href={`/list/students/${item.id}`}>
                            <button className='w-7 h-7 rounded-full flex items-center justify-center bg-encPurple'>
                                <Image src='/view.png' alt='' width={16} height={16} />
                            </button>
                            {/* <FormModal table='student' type='update' data={item} /> */}
                        </Link>


                        {/* <button className='flex items-center justify-center rounded-full bg-encPurple'>
                            <Image src='/delete.png' alt='' width={16} height={16} />
                        </button> */}
                        <FormModal table='student' type='delete' id={item.id} />
                    </>
                )}
            </div>
        </td>
    </tr>
);

const StudentList = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined }
}) => {
    const { page, ...queryParams } = searchParams;

    const p = page ? parseInt(page) : 1;

    // URL PARAMS CONDITIONS
    const query: Prisma.StudentWhereInput = {};

    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)) {
            if (value !== undefined) {
                switch (key) {
                    case "teacherId":
                        query.class = {
                            lessons: {
                                some: {
                                    teacherId: value,
                                },
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

    const [students, count] = await prisma.$transaction([
        prisma.student.findMany({
            where: query,
            include: {
                class: true,
            },
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE * (p - 1)
        }),

        prisma.student.count({where: query})
    ])

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold '>All Students</h1>

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
                            <FormModal table='student' type='create' />
                        )}
                    </div>
                </div>
            </div>

            {/* LIST */}
            <StudentTable studentColumns={studentColumns} renderRow={renderRow} data={students} />

            {/* PAGINATION */}
            <Pagination page={p} count={count}/>
        </div>
    )
}

export default StudentList