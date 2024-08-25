import Pagination from '@/components/Pagination'
import ExamsTable from '@/components/ExamsTable';
import TableSearch from '@/components/TableSearch'
import { role, examsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { examsColumns } from '@/constants/tableColumns';

const ExamsList = () => {
    const renderRow = (item: ExamsParams) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-encSkyLight'>
            <td className='flex items-center gap-4 p-4'>{item.subject}</td>
            <td>{item.class}</td>
            <td className='hidden md:table-cell'>{item.teacher}</td>
            <td className='hidden md:table-cell'>{item.date}</td>

            <td>
                <div className='flex items-center gap-2'>
                    <Link href={`/list/teachers/${item.id}`}>
                        <button className='flex items-center justify-center rounded-full bg-encSky'>
                            <Image src='/edit.png' alt='' width={16} height={16} />
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
                <h1 className='hidden md:block text-lg font-semibold '>All Exams</h1>

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
            <ExamsTable examsColumns={examsColumns} renderRow={renderRow} data={examsData} />

            {/* PAGINATION */}
            <Pagination />
        </div>
    )
}

export default ExamsList