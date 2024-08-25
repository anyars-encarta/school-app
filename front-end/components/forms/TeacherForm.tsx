'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInputField from "../CustomInputField";

const schema = z.object({
    username: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
    firstName: z.string().min(1, { message: 'First Name is required!' }),
    lastName: z.string().min(1, { message: 'Last Name is required!' }),
    phone: z.string().min(1, { message: 'Phone number is required!' }),
    address: z.string().min(1).optional(),
    birthday: z.date({ message: 'Birthday is required!' }),
    sex: z.enum(['male', 'female'], { message: 'Sex is required' }),
    img: z.instanceof(File, { message: 'Image is required' })
});

type Inputs = z.infer<typeof schema>;

const TeacherForm = ({ type, data }: { type: 'create' | 'update', data?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const createTeacher = handleSubmit(data => {
        console.log(data)
    });

    return (
        <form onSubmit={createTeacher} className='flex  flex-col gap-8'>
            <h1 className='text-xl font-semibold'>Create a new Teacher</h1>

            <span className='text-xs text-gray-400 font-medium'>Authentication Information</span>

            <CustomInputField
                label='Username'
                type='Create'
                register={register}
                name='username'
                defaultValue={data?.username}
                error={errors?.username}
            />

            <span className='text-xs text-gray-400 font-medium'>Personal Information</span>

            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default TeacherForm