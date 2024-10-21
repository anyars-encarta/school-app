'use client';

import Announcement from '@/components/Announcement';
import BigCalendar from '@/components/calendar/BigCalendar';
import TeacherChart from '@/components/charts/TeacherChart';
import FormModal from '@/components/forms/FormModal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SingleStudent = ({ params: { id } }: { params: { id: string } }) => {
    return (
        <div className='flex-1 p-4 flex flex-col gap-4 xl:flex-row'>
            {/* LEFT */}
            <div className='w-full xl:w-2/3'>
                {/* TOP */}
                <div className='flex flex-col lg:flex-row gap-4'>
                    {/* USER INFO CARD */}
                    <div className='bg-encSky py-6 rounded-md flex-1 flex gap-4'>
                        {/* IMAGE */}
                        <div className='w-1/3 p-2'>
                            <Image
                                src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                                alt=''
                                width={144}
                                height={144}
                                className='rounded-full w-36 h-36 object-cover' />
                        </div>

                        {/* INFO */}
                        <div className='w-2/3 flex flex-col justify-between gap-4'>
                            <div className='flex items-center gap-4'>
                                <h1 className='text-xl font-semibold'>Jane Doe</h1>
                                <FormModal table='student' type='update' data={
                                    {
                                        id: 1,
                                        studentId: "1234567890",
                                        username: 'john-student',
                                        firstName: "John-student",
                                        lastName: 'Doe-student',
                                        email: "john-student@doe.com",
                                        photo:
                                            "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200",
                                        phone: "1234567890",
                                        subjects: ["Math", "Geometry"],
                                        classe: "1B",
                                        address: "123 Main St, Anytown, USA",
                                    }
                                } />
                            </div>
                            <p className='text-sm text-gray-500'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam rem temporibus obcaecati eaque.</p>

                            <div className='flex items-center justify-between gap-2 flex-wrap text-xs font-medium'>
                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                    <Image src='/blood.png' alt='' width={14} height={14} />
                                    <span>O+</span>
                                </div>

                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                    <Image src='/date.png' alt='' width={14} height={14} />
                                    <span>january, 2026</span>
                                </div>

                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                    <Image src='/mail.png' alt='' width={14} height={14} />
                                    <span>user@something.com</span>
                                </div>

                                <div className='w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2'>
                                    <Image src='/phone.png' alt='' width={14} height={14} />
                                    <span>+1 234 567 890</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* STATS CARD */}
                    <div className='flex-1 flex gap-4 justify-between flex-wrap'>
                        {/* CARD */}
                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src='/singleAttendance.png' alt='' width={24} height={24} className='w-6 h-6' />

                            <div className=''>
                                <h2 className='text-xl font-semibold'>90%</h2>
                                <span className='text-sm text-gray-400'>Attendance</span>
                            </div>
                        </div>

                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src='/singleBranch.png' alt='' width={24} height={24} className='w-6 h-6' />

                            <div className=''>
                                <h2 className='text-xl font-semibold'>6th</h2>
                                <span className='text-sm text-gray-400'>Grade</span>
                            </div>
                        </div>

                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src='/singleLesson.png' alt='' width={24} height={24} className='w-6 h-6' />

                            <div className=''>
                                <h2 className='text-xl font-semibold'>21</h2>
                                <span className='text-sm text-gray-400'>Lessons</span>
                            </div>
                        </div>

                        <div className='bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]'>
                            <Image src='/singleClass.png' alt='' width={24} height={24} className='w-6 h-6' />

                            <div className=''>
                                <h2 className='text-xl font-semibold'>3A</h2>
                                <span className='text-sm text-gray-400'>Class Name</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className='mt-4 bg-white rounded-md p-4 h-[800px]'>
                    <h2 className='text-lg font-semibold'>Student&apos;s Schedule</h2>
                    <BigCalendar />
                </div>
            </div>

            {/* RIGHT */}
            <div className='w-full xl:w-1/3 flex flex-col gap-4'>
                {/* SHORTCUTS */}
                <div className='bg-white p-4 rounded-md'>
                    <h2 className='text-xl font-semibold'>Shortcuts</h2>

                    <div className='mt-3 flex gap-4 flex-wrap text-xs text-gray-500'>
                        <Link href={`/list/lessons?classId=${2}`} className='p-3 rounded-md bg-encSkyLight'>Student&apos;s Lessons</Link>
                        <Link href={`/list/teachers?classId=${2}`} className='p-3 rounded-md bg-encPurpleLight'>Student&apos;s Teachers</Link>
                        <Link href={`/list/exams?classId=${2}`} className='p-3 rounded-md bg-pink-50'>Student&apos;s Exams</Link>
                        <Link href={`/list/assignments?classId=${2}`} className='p-3 rounded-md bg-encSkyLight'>Student&apos;s Assignments</Link>
                        <Link href={`/list/results?studentId=${"student2"}`} className='p-3 rounded-md bg-encYellowLight'>Student&apos;s Results</Link>
                    </div>
                </div>

                {/* PIE CHART */}
                <TeacherChart />
                {/* ANNOUNCEMENTS */}
                <Announcement />
            </div>
        </div>
    )
};

export default SingleStudent