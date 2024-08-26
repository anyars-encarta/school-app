'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInputField from "../CustomInputField";
import Image from "next/image";

const schema = z.object({
    title: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    description: z.string().min(1, { message: 'First Name is required!' }),
    class: z.string().min(1, { message: 'First Name is required!' }),
    date: z.date({ message: 'Birthday is required!' }),
    startTime: z.string().min(1, { message: 'First Name is required!' }),
    endTime: z.string().min(1, { message: 'First Name is required!' }),
});

type Inputs = z.infer<typeof schema>;

const EventForm = ({ type, data }: { type: 'create' | 'update', data?: any }) => {
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
            <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Event' : `Update details for ${data?.title}`}</h1>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Title'
                    type='text'
                    register={register}
                    name='title'
                    defaultValue={data?.title}
                    error={errors?.title}
                />

                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label htmlFor='description' className='text-xs text-gray-500'>
                        Description
                    </label>

                    <textarea id='description' {...register('description')} defaultValue={data?.description} className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full' />

                    {errors.description?.message &&
                        <p className='text-xs text-red-500'>{errors.description.message.toString()}</p>
                    }
                </div>

                <CustomInputField
                    label='Class'
                    type='text'
                    register={register}
                    name='class'
                    defaultValue={data?.class}
                    error={errors?.class}
                />
            </div>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Date'
                    type='date'
                    register={register}
                    name='date'
                    defaultValue={data?.date}
                    error={errors?.date}
                />

                <CustomInputField
                    label='Start Time'
                    type='text'
                    register={register}
                    name='startTime'
                    defaultValue={data?.startTime}
                    error={errors?.startTime}
                />

                <CustomInputField
                    label='End Time'
                    type='text'
                    register={register}
                    name='endTime'
                    defaultValue={data?.endTime}
                    error={errors?.endTime}
                />
            </div>



            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default EventForm