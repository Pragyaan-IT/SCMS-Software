type userTypes = "student" | "teacher" | "admin" | "parent";

export interface Class {
  id: number;
  name: string;
}

export interface Subject {
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

export interface Attendance {
  attendanceId: number;
  studentName: string;
  className: string;
  day: string;
  slot: string;
  present: boolean;
  date: Date;
}

export interface TeacherClasses {
  id: number;
  className: string;
}

export interface TodayAttendance{
    slot: string;
    subjectName: string;
    attendance: boolean;
}

export interface TodayClass{
    slot: string;
    subjectName: string;
    day: string;
    teacherName: string;
}

export interface TimetableEntry {
  id: number;
  class_id: number;
  class_name: string;
  day: string;
  slot: string;
  subject_name: string;
  teacher_name: string;
}
