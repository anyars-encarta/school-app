import { menuItems } from "@/constants/Menu"
import Image from "next/image"
import Link from "next/link"

const Menu = () => {
    return (
        <div className='mt-4 text-sm'>
            {menuItems.map((item, i) => (
                <div className='flex flex-col gap-2' key={i}>
                    <span className='hidden lg:block text-gray-400 font-light my-4'>{item.title}</span>

                    {item.items.map((linkItem, index) => (
                        <Link href={linkItem.href} key={index} className='flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 hover:bg-red-300 rounded-lg pl-2'>
                            <Image
                                src={linkItem.icon}
                                alt={linkItem.label}
                                width={20}
                                height={20}
                            />

                            <span className='hidden lg:block'>{linkItem.label}</span>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Menu