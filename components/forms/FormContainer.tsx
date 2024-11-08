import prisma from '@/prisma';
import FormModal from './FormModal';

export type FormContainerProps = {
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
    data?: any;
    id?: number | string;
};

const FormContainer = async ({
    table,
    type,
    data,
    id
}: FormContainerProps) => {
    let relatedData = {};

    if (type !== "delete") {
        switch (table) {
            case "subject":
                const subjectTeachers = await prisma.teacher.findMany({
                    select: { id: true, name: true, surname: true }
                });
                relatedData = { teachers: subjectTeachers };
                break;

            default:
                break;
        }
    }

    return (
        <FormModal table={table} type={type} data={data} id={id} relatedData={relatedData} />
    )
}

export default FormContainer