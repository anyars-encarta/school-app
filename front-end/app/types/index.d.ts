import { FieldError } from "react-hook-form";

declare type TeacherParams = {
    id: number;
    teacherId: string;
    name: string;
    email?: string;
    photo?: string;
    phone: string;
    subjects?: string[];
    classes?: string[];
    address?: string;
};

declare type StudentParams = {
    id: number;
    studentId: string;
    name: string;
    email?: string;
    photo?: string;
    phone?: string;
    grade: number;
    class: string;
    address: string;
};

declare type ParentParams = {
    id: number;
    name: string;
    students: string[];
    email?: string;
    phone: string;
    address: string;
};

declare type SubjectParams = {
    id: number;
    name: string;
    teachers: string[];
}

declare type ClassesParams = {
    id: number;
    name: string;
    capacity: string;
    grade: string;
    supervisor: string;
};

declare type LessonsParams = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
};

declare type ExamsParams = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    date: string;
};

declare type AssignmentsParams = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    dueDate: string;
};

declare type ResultsParams = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    student: string;
    date: string;
    type: 'exam' | 'assignment';
    score: string;
};

declare type EventsParams = {
    id: number;
    title: string;
    description: string;
    class: string;
    date: string;
    startTime: string;
    endTime: string;
};

declare type AnnouncementsParams = {
    id: number;
    title: string;
    description: string;
    class: string;
    date: string;
};

declare type TableColumnParams = {
    header: string;
    accessor: string;
    className?: string;
};

declare type CustomInputFieldParams = {
    label: string;
type?: string;
register: any;
name: string;
defaultValue?: string;
error?: FieldError;
inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}
