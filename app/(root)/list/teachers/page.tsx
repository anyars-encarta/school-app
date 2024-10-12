import { TeacherParams } from '@/app/types';
import FormModal from '@/components/forms/FormModal';
import Pagination from '@/components/tables/Pagination'
import TeacherTable from '@/components/tables/TeacherTable';
import TableSearch from '@/components/TableSearch'
import { teacherColumns } from '@/constants/tableColumns'
import { role, teachersData } from '@/lib/data'
import prisma from '@/prisma';
import { Class, Subject, Teacher } from '@prisma/client';
import Image from 'next/image'
import Link from 'next/link'

type teacherList = Teacher & {subjects: Subject[]} & {classes: Class[]};

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
        <td className='hidden md:table-cell'>{item.subjects?.join(",")}</td>
        <td className='hidden md:table-cell'>{item.classes?.join(",")}</td>
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

const TeacherList = async () => {
    const teachers = await prisma.teacher.findMany({include: {subjects: true, classes: true}});
console.log(teachers)
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
            <Pagination />
        </div>
    )
}

export default TeacherList