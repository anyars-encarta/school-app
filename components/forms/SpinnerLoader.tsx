
import { Loader } from 'lucide-react';

const SpinnerLoader = () => {
  return (
    <div className='flex gap-2'>
        <Loader className='animate-spin' /> 
        <span>Loading...</span>
    </div>
  )
}

export default SpinnerLoader