type userTypes = "student" | "teacher" | "admin" | 'parent';

export interface Class {
    id: number;
    name: string;
}

export interface Teacher {
    id: number;
    name: string;
    email: string;
    teacher_id: string;
    role: userTypes;
}
export interface Student {
    id: number;
    name: string;
    email: string;
    registration_id: string;
    class_id: string;
    class_name: string;
}