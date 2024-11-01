import prisma from "@/prisma";
import CountChart from "./CountChart";
import Image from "next/image";

const CountChartContainer = async () => {
    const data = await prisma.student.groupBy({ by: ["sex"], _count: true });

    const boys = data.find((d) => d.sex === "MALE")?._count || 0;
    const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;;
    const total = boys + girls;

    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* TITLE */}
            <div className='flex items-center justify-between'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src='/moreDark.png' alt='' width={20} height={20} />
            </div>

            {/* CHART */}
            <CountChart boys={boys} girls={girls} />

            <div className='flex gap-16 justify-center'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-encSky rounded-full' />
                    <h1 className='font-bold'>{boys}</h1>
                    <h2 className='text-xs text-gray-300'>Boys ({(boys / total * 100).toFixed(0)}%)</h2>
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-encYellow rounded-full' />
                    <h1 className='font-bold'>{girls}</h1>
                    <h2 className='text-xs text-gray-300'>Girls ({(girls / total * 100).toFixed(0)}%)</h2>
                </div>
            </div>
        </div>
    )
}

export default CountChartContainer