import { CustomInputFieldParams } from '@/app/types';

const CustomInputField = ({ 
    label, 
    type = 'text', 
    register, 
    name, 
    defaultValue, 
    error, 
    inputProps 
}: CustomInputFieldParams) => {

    return (
        <div className='flex flex-col gap-2 w-full md:w-1/4'>
            <label htmlFor="username" className='text-xs text-gray-500'>
                {label}
            </label>

            <input
                type={type} id='username'
                {...register(name)}
                className='outline-none ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full'
                {...inputProps}
                defaultValue={defaultValue}
            />

            {error?.message &&
                <p className='text-xs text-red-500'>{error.message.toString()}</p>
            }
        </div>
    )
}

export default CustomInputField