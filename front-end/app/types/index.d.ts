declare type TeacherParams = {
    id: string;
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
    id: string;
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
    id: string;
    name: string;
    students: string[];
    email?: string;
    phone: string;
    address: string;
};

declare type TableColumnParams = {
    header: string;
    accessor: string;
    className?: string;
};