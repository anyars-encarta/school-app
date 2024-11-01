import prisma from '@/prisma';
import Image from 'next/image';

const UserCard = async ({ type }: { type: "admin" | "teacher" | "student" | "parent" }) => {
  const modelMap: Record<typeof type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent
  };

  const data = await modelMap[type].count();

  const fullYear = new Date().getFullYear();
  const academicYear = `${fullYear} / ${(fullYear + 1) % 100}`;

  return (
    <div className='rounded-2xl odd:bg-encPurple even:bg-encYellow p-4 flex-1 min-w-[130px]'>
      {/* TOP */}
      <div className='flex items-center justify-between'>
        <span className='text-[10px] bg-white px-2 py-1 rounded-full text-green-600'>{academicYear}</span>

        <Image src='/more.png' alt='' width={20} height={20} />
      </div>

      <h1 className='text-2xl font-semibold my-4'>{data}</h1>
      <h2 className='capitalize text-sm font-medium text-gray-500'>{type}s</h2>
    </div>
  )
}

export default UserCard