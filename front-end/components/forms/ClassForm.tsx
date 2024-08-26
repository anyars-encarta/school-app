'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInputField from "../CustomInputField";
import Image from "next/image";

const schema = z.object({
    name: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    capacity: z.number().min(1, { message: 'First Name is required!' }),
    grade: z.number().min(1, { message: 'First Name is required!' }),
    supervisor: z.string().min(1, { message: 'First Name is required!' }),
});

type Inputs = z.infer<typeof schema>;

const ClassForm = ({ type, data }: { type: 'create' | 'update', data?: any }) => {
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
            <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Class' : `Update details for ${data?.name}`}</h1>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Class Name'
                    type='text'
                    register={register}
                    name='name'
                    defaultValue={data?.name}
                    error={errors?.name}
                />

                <CustomInputField
                    label='Capacity'
                    type='number'
                    register={register}
                    name='capacity'
                    defaultValue={data?.capacity}
                    error={errors?.capacity}
                />

                <CustomInputField
                    label='Grade'
                    type='number'
                    register={register}
                    name='grade'
                    defaultValue={data?.grade}
                    error={errors?.grade}
                />
            </div>

            <div className='flex items-center justify-between flex-wrap gap-4'>
            <CustomInputField
                    label='Supervisor'
                    type='text'
                    register={register}
                    name='supervisor'
                    defaultValue={data?.supervisor}
                    error={errors?.supervisor}
                />
            </div>

            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default ClassForm