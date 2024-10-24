'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInputField from "../CustomInputField";
import Image from "next/image";

const schema = z.object({
    subject: z
        .string()
        .min(3, { message: 'Username must be at least 3 characters long!' })
        .max(20, { message: 'Username must be at most 20 characters long!' }),
    class: z.string().min(1, { message: 'First Name is required!' }),
    teacher: z.string().min(1, { message: 'First Name is required!' }),
    date: z.date({ message: 'Birthday is required!' }),
});

type Inputs = z.infer<typeof schema>;

const ExamForm = ({ type, data }: { type: 'create' | 'update', data?: any }) => {
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
            <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Exam' : `Update details for ${data?.subject}`}</h1>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Subject Name'
                    type='text'
                    register={register}
                    name='subject'
                    defaultValue={data?.subject}
                    error={errors?.subject}
                />

                <CustomInputField
                    label='Class'
                    type='text'
                    register={register}
                    name='class'
                    defaultValue={data?.class}
                    error={errors?.class}
                />

                <CustomInputField
                    label='Teacher'
                    type='text'
                    register={register}
                    name='teacher'
                    defaultValue={data?.teacher}
                    error={errors?.teacher}
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
            </div>

            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default ExamForm