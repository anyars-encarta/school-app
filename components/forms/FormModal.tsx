'use client';

import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import SpinnerLoader from "./SpinnerLoader";
// import TeacherForm from "./TeacherForm";
// import StudentForm from "./StudentForm";
// import ParentForm from "./ParentForm";

// LAZY LOADING IMPORTS
const TeacherForm = dynamic(() => import("./TeacherForm"), {
    loading: () => <SpinnerLoader />
});

const StudentForm = dynamic(() => import("./StudentForm"), {
    loading: () => <SpinnerLoader />
});

const ParentForm = dynamic(() => import("./ParentForm"), {
    loading: () => <SpinnerLoader />
});

const SubjectForm = dynamic(() => import("./SubjectForm"), {
    loading: () => <SpinnerLoader />
});

const ClassForm = dynamic(() => import("./ClassForm"), {
    loading: () => <SpinnerLoader />
});

const LessonForm = dynamic(() => import("./LessonForm"), {
    loading: () => <SpinnerLoader />
});

const ExamForm = dynamic(() => import("./ExamForm"), {
    loading: () => <SpinnerLoader />
});

const AssignmentForm = dynamic(() => import("./AssignmentForm"), {
    loading: () => <SpinnerLoader />
});

const ResultForm = dynamic(() => import("./ResultForm"), {
    loading: () => <SpinnerLoader />
});

const EventForm = dynamic(() => import("./EventForm"), {
    loading: () => <SpinnerLoader />
});

const AnnouncementForm = dynamic(() => import("./AnnouncementForm"), {
    loading: () => <SpinnerLoader />
});

const forms: {
    [key: string]: (type: 'create' | 'update', data?: any) => JSX.Element;
} = {
    teacher: (type, data) => <TeacherForm type={type} data={data} />,
    student: (type, data) => <StudentForm type={type} data={data} />,
    parent: (type, data) => <ParentForm type={type} data={data} />,
    subject: (type, data) => <SubjectForm type={type} data={data} />,
    class: (type, data) => <ClassForm type={type} data={data} />,
    lesson: (type, data) => <LessonForm type={type} data={data} />,
    exam: (type, data) => <ExamForm type={type} data={data} />,
    assignment: (type, data) => <AssignmentForm type={type} data={data} />,
    result: (type, data) => <ResultForm type={type} data={data} />,
    event: (type, data) => <EventForm type={type} data={data} />,
    announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
};

const FormModal = ({
    table,
    type,
    data,
    id
}: {
    table:
    'teacher'
    | 'student'
    | 'parent'
    | 'parent'
    | 'subject'
    | 'class'
    | 'lesson'
    | 'exam'
    | 'assignment'
    | 'result'
    | 'attendance'
    | 'event'
    | 'announcement';
    type: 'create' | 'update' | 'delete';
    data?: any
    id?: number;
}) => {
    const size = type === 'create' ? 'w-8 h-8' : 'w-7 h-7'
    const bgColor = type === 'create' ? 'bg-encYellow' : type === 'update' ? 'bg-encSky' : 'bg-encPurple';

    const [open, setOpen] = useState(false);

    const Form = () => {
        return (
            type === 'delete' && id ? (
                <form action="" className='p-4 flex flex-col gap-4'>
                    <span className='text-center font-medium'>All data will be lost. Are you sure you want to delete this {table}?</span>
                    <button className='bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center'>Delete</button>
                </form>
            ) : type === 'create' || type === 'update' ? (
                forms[table](type, data)
            ): (
                'Form Not found'
            )
        )
    };

    return (
        <>
            <button
                className={`${size}w-7 h-7 rounded-full flex items-center justify-center bg-encPurple ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} alt='' width={16} height={16} />
            </button>

            {open && (
                <div className='w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center'>
                    <div className='bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]'>
                        <Form />
                        <div className='absolute top-4 right-4 cursor-pointer' onClick={() => setOpen(false)}>
                            <Image src='/close.png' alt='' width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormModal