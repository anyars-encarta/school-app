'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChartData } from '@/constants/chart';
import Image from 'next/image';

const AttendanceChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>

                <ResponsiveContainer width='100%' height='90%'>
                    <BarChart
                        width={500}
                        height={300}
                        data={BarChartData}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
                        <XAxis dataKey="name" axisLine={false} tick={{fill: '#d1d5db'}} tickLine={false} />
                        <YAxis axisLine={false} tick={{fill: '#d1d5db'}} tickLine={false} />
                        <Tooltip contentStyle={{borderRadius: '10px', borderColor: 'lightGray'}} />
                        <Legend align='left' verticalAlign='top' wrapperStyle={{ paddingTop: '20px', paddingBottom: '40px'}}/>
                        <Bar dataKey="present" fill="#C3EBFA" legendType='circle' radius={[10, 10, 0, 0]} />
                        <Bar dataKey="absent" fill="#FAE27C" legendType='circle' radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
        </div>
    )
}

export default AttendanceChart