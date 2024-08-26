import Pagination from '@/components/tables/Pagination'
import ParentTable from '@/components/tables/ParentTable';
import TableSearch from '@/components/TableSearch'
import { role, parentsData } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'
import { parentColumns } from '@/constants/tableColumns';
import FormModal from '@/components/forms/FormModal';
import { ParentParams } from '@/app/types';

const ParentList = () => {
    const renderRow = (item: ParentParams) => (
        <tr key={item.id} className='border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-encSkyLight'>
            <td className='flex items-center gap-4 p-4'>
                <div className='flex flex-col'>
                    <h3 className='font-semibold'>{item.name}</h3>
                    <p className='text-sm text-gray-500'>{item?.email}</p>
                </div>
            </td>

            <td className='hidden md:table-cell'>{item.students?.join(",")}</td>
            <td className='hidden md:table-cell'>{item.phone}</td>
            <td className='hidden md:table-cell'>{item.address}</td>

            <td>
                <div className='flex items-center gap-2'>
                    {role === 'admin' && (
                        <>
                            {/* <Link href={`/list/teachers/${item.id}`}> */}
                            {/* <button className='flex items-center justify-center rounded-full bg-encSky'>
                                    <Image src='/update.png' alt='' width={16} height={16} />
                                </button> */}
                            <FormModal table='parent' type='update' data={
                                {
                                    id: 1,
                                    username: "John-parent",
                                    firstName: 'John-Parent',
                                    lastName: 'Doe-parent',
                                    students: ["Sarah Brewer"],
                                    email: "john@doe.com",
                                    phone: "1234567890",
                                    address: "123 Main St, Anytown, USA",
                                }
                            } />
                            {/* </Link> */}

                            {/* <button className='flex items-center justify-center rounded-full bg-encPurple'>
                                <Image src='/delete.png' alt='' width={16} height={16} />
                            </button> */}
                            <FormModal table='parent' type='delete' id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    )

    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* TOP */}
            <div className='flex items-center justify-between'>
                <h1 className='hidden md:block text-lg font-semibold '>All Parents</h1>

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
                            <FormModal table='parent' type='create' />
                        )}
                    </div>
                </div>
            </div>

            {/* LIST */}
            <ParentTable parentColumns={parentColumns} renderRow={renderRow} data={parentsData} />

            {/* PAGINATION */}
            <Pagination />
        </div>
    )
}

export default ParentList