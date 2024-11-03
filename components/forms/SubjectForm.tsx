'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInputField from "../CustomInputField";
import { SubjectInputs, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject } from "@/lib/actions";
import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SubjectForm = ({ setOpen, type, data }: { setOpen: Dispatch<SetStateAction<boolean>>, type: 'create' | 'update', data?: any }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SubjectInputs>({
        resolver: zodResolver(subjectSchema),
    });

    // AFTER REACT 19, IT WILL BE USEACTIONSTATE
    const [state, FormAction] = useFormState(createSubject, {
        success: false,
        error: false
    });

    const createSubjectHandler = handleSubmit(data => {
        FormAction(data)
    });

    const router = useRouter();

    useEffect(() => {
        if (state.success) {
            toast(`Subject ${type === 'create' ? 'created' : 'updated'} successfully!`)
            router.refresh();
            setOpen(false);
        }
    }, [state]);

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

                {/* <CustomInputField
                    label='Teachers'
                    type='text'
                    register={register}
                    name='teachers'
                    defaultValue={data?.teachers}
                    error={errors?.teachers}
                /> */}
            </div>

            {state.error && <span className='text-red-500'>Something went wrong!</span>}

            <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>{type === 'create' ? 'Create' : 'Update'}</button>
        </form>
    )
}

export default SubjectForm