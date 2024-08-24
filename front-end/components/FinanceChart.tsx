'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChartData } from '@/constants/chart';
import Image from 'next/image'

const FinanceChart = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold'>Finance</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>

            {/* CHART */}
            <ResponsiveContainer width="100%" height="90%">
                <LineChart
                    width={500}
                    height={300}
                    data={LineChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke='#ddd' />
                    <XAxis dataKey="name" axisLine={false} tick={{ fill: '#d1d5db' }} tickLine={false} tickMargin={10} />
                    <YAxis axisLine={false} tick={{ fill: '#d1d5db' }} tickLine={false} tickMargin={20} />
                    <Tooltip contentStyle={{ borderRadius: '10px', borderColor: 'lightGray' }} />
                    <Legend align='center' verticalAlign='top' wrapperStyle={{ paddingTop: '10px', paddingBottom: '30px' }} />
                    <Line type="monotone" dataKey="expense" stroke="#CFCEFF" strokeWidth={5} />
                    <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={5} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default FinanceChart