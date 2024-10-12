'use client';

import { ITEM_PER_PAGE } from '@/lib/settings'
import { useRouter } from 'next/navigation'
import React from 'react'

const Pagination = ({ page, count }: { page: number, count: number }) => {
    const router = useRouter();

    const navigatePage = (newPage: number) => {
        const params = new URLSearchParams(window.location.search)
        params.set("page", newPage.toString())
        router.push(`${window.location.pathname}?${params.toString()}`)
    };

    return (
        <div className='p-4 flex items-center justify-between text-gray-500'>
            <button disabled className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Prev</button>

            <div className='flex items-center gap-2 text-sm'>
                {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => i + 1).map((item, index) => (
                    <button
                        key={index}
                        className={`px-2 rounded-md ${page === item ? 'bg-encSky' : 'bg-slate-200'}`}
                        onClick={() => navigatePage(item)}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <button className='py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed'>Next</button>
        </div>
    )
}

export default Pagination