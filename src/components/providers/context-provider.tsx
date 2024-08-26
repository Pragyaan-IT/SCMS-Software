"use client"
import { useModal } from '@/app/hooks/use-modal-store';
import { Class, Student, Teacher } from '@/lib/types';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { toast } from 'sonner';

type AppContextType = {
    classList: Class[];
    teacherList: Teacher[];
    studentList: Student[];
    getClassList: () => void;
    getTeacherList: () => void;
    getStudentList: () => void;
    createClass: (name: string) => void;
    createTeacher: ({ name, email, password }: TeacherData) => void;
    createStudent: ({ name, email, password, registration_id, class_id }: StudentData) => void;
};

interface TeacherData {
    name: string;
    email: string;
    password: string;
}
interface StudentData {
    name: string;
    email: string;
    password: string;
    registration_id: string;
    class_id: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [classList, setClassList] = useState<Class[]>([]);
    const [teacherList, setTeacherList] = useState<Teacher[]>([])
    const [studentList, setStudentList] = useState<Student[]>([])
    const { onClose } = useModal();

    const getClassList = async () => {
        const response = await fetch('/api/class');
        const data = await response.json();
        setClassList(data.classes);
    }
    const getTeacherList = async () => {
        const response = await fetch('/api/teacher');
        const data = await response.json();
        setTeacherList(data.teachers);
    }
    const getStudentList = async () => {
        const response = await fetch('/api/student');
        const data = await response.json();
        setStudentList(data.students);
    }

    const createClass = async (name: string) => {
        try {
            const res = await fetch('/api/class', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            })

            if (res.ok) {
                toast.success('Class created successfully');
                const newClass = await res.json();
                setClassList((prev) => [...prev, ...newClass]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error creating class');
        }
    }

    const createTeacher = async ({ name, email, password }: TeacherData) => {
        try {
            const res = await fetch('/api/teacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })

            if (res.ok) {
                toast.success('Teacher created successfully');
                const newTeacher = await res.json();
                setTeacherList((prev) => [...prev, ...newTeacher]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed, Please try again.q');
        }
    }

    const createStudent = async ({ name, email, password, registration_id, class_id }: StudentData) => {
        try {
            const res = await fetch('/api/student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, registration_id, class_id })
            })

            if (res.ok) {
                toast.success('Student created successfully');
                const newStudent = await res.json();
                setStudentList((prev) => [...prev, ...newStudent]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed, Please try again.q');
        }
    }

    return (
        <AppContext.Provider value={{ classList, teacherList, studentList, getClassList, getTeacherList, getStudentList, createClass, createTeacher, createStudent }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
}