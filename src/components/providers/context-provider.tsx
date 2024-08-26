"use client"
import { useModal } from '@/app/hooks/use-modal-store';
import { Attendance, Class, Student, Subject, Teacher } from '@/lib/types';
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { toast } from 'sonner';

type AppContextType = {
    classList: Class[];
    teacherList: Teacher[];
    studentList: Student[];
    subjectList: Subject[];
    attendanceList: Attendance[];
    getClassList: () => void;
    getTeacherList: () => void;
    getStudentList: () => void;
    getSubjectList: () => void;
    getAttendance: () => void;
    createClass: (name: string) => void;
    createTeacher: ({ name, email, password }: TeacherData) => void;
    createStudent: ({ name, email, password, registration_id, class_id }: StudentData) => void;
    createSubject: (name: string) => void;
    addSubjectToTeacher: (teacherId: number, subjectId: number) => void;
    addTeacherToClass: (teacherId: number, classId: number) => void;
    addSubjectToClass: (subjectId: number, classId: number) => void;
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
    const [subjectList, setSubjectList] = useState<Subject[]>([])
    const [attendanceList, setAttendanceList] = useState<Attendance[]>([])
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

    const getSubjectList = async () => {
        const response = await fetch('/api/subject');
        const data = await response.json();
        setSubjectList(data.subjects);
    }
    
    const getAttendance = async () => {
        const response = await fetch('/api/attendance');
        const data = await response.json();
        const formattedData = data.attendance.map((record: Attendance) => {
            return {
                ...record,
                date: new Date(record.date).toDateString()
            }
        })
        setAttendanceList(formattedData);
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

    const createSubject = async (name: string) => {
        try {
            const res = await fetch('/api/subject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            })

            if (res.ok) {
                toast.success('Subject created successfully');
                const newSubject = await res.json();
                setSubjectList((prev) => [...prev, ...newSubject]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error creating subject');
        }
    }

    const addSubjectToTeacher = async (teacherId: number, subjectId: number) => {
        try {
            const res = await fetch(`/api/teacher/${teacherId}/subject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subjectId })
            })

            if (res.ok) {
                toast.success('Subject added successfully');
                const newSubject = await res.json();
                // setSubjectList((prev) => [...prev, ...newSubject]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding subject');
        }
    }
    const addTeacherToClass = async (teacherId: number, classId: number) => {
        try {
            console.log(teacherId, classId)
            const res = await fetch(`/api/class/${classId}/teacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ teacherId })
            })

            if (res.ok) {
                toast.success('Teacher added successfully');
                const newTeacher = await res.json();
                // setSubjectList((prev) => [...prev, ...newSubject]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding teacher');
        }
    }
    const addSubjectToClass = async (subjectId: number, classId: number) => {
        try {
            const res = await fetch(`/api/class/${classId}/subject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ subjectId })
            })

            if (res.ok) {
                toast.success('Subject added successfully');
                const newSubject = await res.json();
                // setSubjectList((prev) => [...prev, ...newSubject]);
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding subject');
        }
    }



    return (
        <AppContext.Provider value={{ classList, teacherList, studentList, subjectList, attendanceList, getClassList, getTeacherList, getStudentList, getSubjectList, getAttendance, createClass, createTeacher, createStudent, createSubject, addSubjectToTeacher, addTeacherToClass, addSubjectToClass }}>
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

