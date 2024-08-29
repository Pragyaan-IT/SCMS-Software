"use client"
import { useModal } from '@/app/hooks/use-modal-store';
import { Attendance, Class, Student, Subject, Teacher, TeacherClasses, TodayAttendance, TodayClass } from '@/lib/types';
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { toast } from 'sonner';

type AppContextType = {
    classList: Class[];
    teacherList: Teacher[];
    studentList: Student[];
    subjectList: Subject[];
    attendanceList: Attendance[];
    teacherClasses: TeacherClasses[];
    getClassList: () => void;
    getTeacherList: () => void;
    getStudentList: () => void;
    getSubjectList: () => void;
    getAttendance: (teacherId: number) => void;
    getTeacherClasses: (teacherId: number) => void;
    getTodayAttendance: (studentId: string) => Promise<TodayAttendance[]>;
    getTodayClass: (studentId: string, day: string) => Promise<TodayClass[]>;
    getStudentProfile: (studentId: string) => Promise<Student[]>;
    getAllDiscussion: () => Promise<any[]>;
    getDiscussions: (id: number) => Promise<any[]>;
    getDiscussionReply: (id: number) => Promise<any[]>;
    createClass: (name: string) => void;
    createTeacher: ({ name, email, password }: TeacherData) => void;
    createStudent: ({ name, email, password, registration_id, class_id }: StudentData) => void;
    createSubject: (name: string) => void;
    createDiscussion: (studentId: number, title: string, subjectId: number, description: string, type?: string) => void;
    addSubjectToTeacher: (teacherId: number, subjectId: number) => void;
    addTeacherToClass: (teacherId: number, classId: number) => void;
    addSubjectToClass: (subjectId: number, classId: number) => void;
    replyDiscussion: (discussionId: number, reply: string) => void;
    markSolved: (discussionId: number, replyId: number) => void;
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
    const [teacherClasses, setTeacherClasses] = useState<TeacherClasses[]>([])
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

    const getAttendance = async (teacherId: number) => {
        const response = await fetch(`/api/attendance?teacherId=${teacherId}`);
        const data = await response.json();
        const formattedData = data.attendance.map((record: Attendance) => {
            return {
                ...record,
                date: new Date(record.date).toDateString()
            }
        })
        setAttendanceList(formattedData);
    }

    const getTeacherClasses = async (teacherId: number) => {
        const response = await fetch(`/api/teacher/${teacherId}/class`);
        const data = await response.json();
        setTeacherClasses(data.teacherClasses);
    }

    const getTodayAttendance = async (studentId: string): Promise<TodayAttendance[]> => {
        const response = await fetch(`/api/student/${studentId}/attendance`);
        const data = await response.json();
        return data.todayAttendance;
    }

    const getTodayClass = async (studentId: string, day: string): Promise<TodayClass[]> => {
        const response = await fetch(`/api/student/${studentId}/timetable?day=${day}`);
        const data = await response.json();
        console.log(data)
        return data.todayClass;
    }

    const getStudentProfile = async (studentId: string) => {
        const response = await fetch(`/api/student/${studentId}`);
        const data = await response.json();
        return data.student;
    }

    const getAllDiscussion = async () => {
        const response = await fetch('/api/discussion');
        const data = await response.json();
        return data.allDiscussions;
    }

    const getDiscussions = async (id: number) => {
        const response = await fetch(`/api/discussion/${id}`);
        const data = await response.json();
        return data.discussion;
    }

    const getDiscussionReply = async (id: number) => {
        const response = await fetch(`/api/discussion/${id}/reply`);
        const data = await response.json();
        return data.reply;
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

    const createDiscussion = async (studentId: number, title: string, subjectId: number, description: string, type?: string) => {
        try {
            const res = await fetch('/api/discussion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentId,
                    title,
                    subjectId,
                    description,
                    type
                })
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
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding subject');
        }
    }

    const replyDiscussion = async (discussionId: number, reply: string) => {
        try {
            console.log(reply)
            const res = await fetch(`/api/discussion/${discussionId}/reply`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reply })
            })

            if (res.ok) {
                toast.success('Reply added successfully');
                const newReply = await res.json();
                onClose();
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error adding reply');
        }
    }

    const markSolved = async (discussionId: number, replyId: number) => {
        try {
            const res = await fetch(`/api/discussion/${discussionId}/reply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ replyId })
            })

            if (res.ok) {
                toast.success('Marked solved');
            } else {
                const error = await res.json();
            }
        } catch (error) {
            console.error(error);
            toast.error('Error Occured');
        }
    }

    return (
        <AppContext.Provider value={{ classList, teacherList, studentList, subjectList, attendanceList, teacherClasses, getClassList, getTeacherList, getStudentList, getSubjectList, getAttendance, getTeacherClasses, getTodayAttendance, getTodayClass, getStudentProfile, getAllDiscussion, getDiscussions, createClass, getDiscussionReply, createTeacher, createStudent, createSubject, createDiscussion, addSubjectToTeacher, addTeacherToClass, addSubjectToClass, replyDiscussion, markSolved }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider');
    }

    return context;
}

