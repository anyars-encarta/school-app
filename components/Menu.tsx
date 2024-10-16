'use client';

import { menuItems } from "@/constants/Menu"
import Image from "next/image"
import Link from "next/link"
import { role } from "@/lib/data";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Menu = () => {
    const pathname = usePathname();

    return (
        <div className='mt-4 text-sm'>
            {menuItems.map((item, i) => {

                return (
                    <div className='flex flex-col gap-2' key={i}>
                        <span className='hidden lg:block text-gray-400 font-light my-4'>{item.title}</span>

                        {item.items.map((linkItem, index) => {
                            const isActive = pathname === linkItem.href || pathname.startsWith(`${linkItem.href}/`);

                            if (linkItem.visible.includes(role)) {
                                return (
                                    <Link href={linkItem.href} key={index} className={cn('flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 hover:bg-encSkyLight rounded-md pl-2', { 'bg-encSkyLight': isActive })}>
                                        <Image
                                            src={linkItem.icon}
                                            alt={linkItem.label}
                                            width={20}
                                            height={20}
                                        />

                                        <span className='hidden lg:block'>{linkItem.label}</span>
                                    </Link>
                                )
                            }
                        })}
                    </div>
                )
            })}
        </div>
    )
}

export default Menu