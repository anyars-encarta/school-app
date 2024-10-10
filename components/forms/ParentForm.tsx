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
    sex: z.enum(['male', 'female'], { message: 'Sex is required' }),
});

type Inputs = z.infer<typeof schema>;

const ParentForm = ({ type, data }: { type: 'create' | 'update', data?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });

    const createStudent = handleSubmit(data => {
        console.log(data)
    });

    console.log(data)
    return (
        <form onSubmit={createStudent} className='flex  flex-col gap-8'>
            <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Parent' : `Update details for ${data?.firstName} ${data?.lastName}`}</h1>

            <span className='text-xs text-gray-400 font-medium'>Authentication Information</span>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Username'
                    type='text'
                    register={register}
                    name='username'
                    defaultValue={data?.username}
                    error={errors?.username}
                />

                <CustomInputField
                    label='Email'
                    type='email'
                    register={register}
                    name='email'
                    defaultValue={data?.email}
                    error={errors?.email}
                />

                <CustomInputField
                    label='Password'
                    type='password'
                    register={register}
                    name='password'
                    defaultValue={data?.password}
                    error={errors?.password}
                />
            </div>

            <span className='text-xs text-gray-400 font-medium'>Personal Information</span>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='First Name'
                    type='text'
                    register={register}
                    name='firstName'
                    defaultValue={data?.firstName}
                    error={errors?.firstName}
                />

                <CustomInputField
                    label='Last Name'
                    type='text'
                    register={register}
                    name='lastName'
                    defaultValue={data?.lastName}
                    error={errors?.lastName}
                />

                <CustomInputField
                    label='Phone'
                    type='text'
                    register={register}
                    name='phone'
                    defaultValue={data?.phone}
                    error={errors?.phone}
                />
            </div>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Address'
                    type='text'
                    register={register}
                    name='address'
                    defaultValue={data?.address}
                    error={errors?.address}
                />

                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label htmlFor='sex' className='text-xs text-gray-500'>
                        Sex
                    </label>

                    <select
                        id="sex"
                        className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                        {...register("sex")}
                        defaultValue={data?.sex}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    {errors.sex?.message &&
                        <p className='text-xs text-red-500'>{errors.sex.message.toString()}</p>
                    }
                </div>
            </div>
            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default ParentForm