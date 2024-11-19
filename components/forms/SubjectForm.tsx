'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "../CustomInputField";
import { SubjectInputs, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({ setOpen, type, data, relatedData }: { setOpen: Dispatch<SetStateAction<boolean>>, type: 'create' | 'update', data?: any, relatedData?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubjectInputs>({
        resolver: zodResolver(subjectSchema),
    });

    console.log("showing in SubjectForm", relatedData);

    // AFTER REACT 19, IT WILL BE USEACTIONSTATE
    const [state, FormAction] = useFormState(type === 'create' ? createSubject : updateSubject, {
        success: false,
        error: false
    });

    const createSubjectHandler = handleSubmit((data) => {
        FormAction(data);
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Subject ${type === 'create' ? 'created' : 'updated'} successfully!`)
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type, setOpen]);

    const {teachers} = relatedData;

    return (
        <form onSubmit={createSubjectHandler} className='flex  flex-col gap-8'>
            <h1 className='text-xl font-semibold'>{type === 'create' ? 'Create a new Subject' : `Update details for ${data?.name}`}</h1>

            <div className='flex items-center justify-between flex-wrap gap-4'>
                <CustomInputField
                    label='Subject Name'
                    type='text'
                    register={register}
                    name='name'
                    defaultValue={data?.name}
                    error={errors?.name}
                />

                {data && (
                    <CustomInputField
                        label="Id"
                        name="id"
                        defaultValue={data?.id}
                        register={register}
                        error={errors?.id}
                        hidden
                    />
                )}

                <div className='flex flex-col gap-2 w-full md:w-1/4'>
                    <label htmlFor='teachers' className='text-xs text-gray-500'>
                        Teachers
                    </label>

                    <select
                        multiple
                        id="teachers"
                        className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                        {...register("teachers")}
                        defaultValue={data?.teachers}
                    >
                        {teachers.map((teacher: {id: string, name: string, surname: string}) => (
                            <option key={teacher.id} value={teacher.id}>{teacher.name + " " + teacher.surname}</option>
                        ))}
                    </select>

                    {errors.teachers?.message && (
                        <p className='text-xs text-red-500'>{errors.teachers.message.toString()}</p>
                    )}
                </div>
            </div>

            {state.error && <span className='text-red-500'>Something went wrong!</span>}

            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default SubjectForm