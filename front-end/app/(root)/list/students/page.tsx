import Pagination from '@/components/tables/Pagination'
import StudentTable from '@/components/tables/StudentTable'
import TableSearch from '@/components/TableSearch'
import { studentColumns } from '@/constants/tableColumns'
import { role, studentsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

const StudentList = () => {
    const renderRow = (item: StudentParams) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-encSkyLight'>
            <td className='flex items-center gap-4 p-4'>
                <Image
                    src={item.photo || '/user.svg'}
                    alt='teacher'
                    width={40}
                    height={40}
                    className='md:hidden xl:block w-10 h-10 rounded-full object-cover'
                />

                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-sm text-gray-500'>{item?.class}</p>
                </div>
            </td>

            <td className='hidden md:table-cell'>{item.studentId}</td>
            <td className='hidden md:table-cell'>{item.grade}</td>
            <td className='hidden md:table-cell'>{item.phone}</td>
            <td className='hidden md:table-cell'>{item.address}</td>

            <td>
                <div className='flex items-center gap-2'>
                    <Link href={`/list/students/${item.id}`}>
                        <button className='flex items-center justify-center rounded-full bg-encSky'>
                            <Image src='/view.png' alt='' width={16} height={16} />
                        </button>
                    </Link>

                    {role === 'admin' && (
                        <button className='flex items-center justify-center rounded-full bg-encPurple'>
                            <Image src='/delete.png' alt='' width={16} height={16} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    )

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
                            <button className='w-8 h-8 rounded-full bg-encYellow flex items-center justify-center'>
                                <Image src='/plus.png' alt='filter' width={14} height={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* LIST */}
            <StudentTable studentColumns={studentColumns} renderRow={renderRow} data={studentsData} />

            {/* PAGINATION */}
            <Pagination />
        </div>
    )
}

export default StudentList