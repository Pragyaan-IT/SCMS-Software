// dummy-data.ts

export const dummyClasses = [
  { id: 1, name: "Class 1A" },
  { id: 2, name: "Class 2B" },
  { id: 3, name: "Class 3C" },
];

export const dummyStudents = [
  { id: 1, name: "Alice Johnson", class_id: 1 },
  { id: 2, name: "Bob Smith", class_id: 1 },
  { id: 3, name: "Charlie Brown", class_id: 2 },
  { id: 4, name: "Diana Ross", class_id: 2 },
  { id: 5, name: "Ethan Hunt", class_id: 3 },
  { id: 6, name: "Fiona Apple", class_id: 3 },
];

export const dummyTimetable = [
  { id: 1, class_id: 1, day: "Monday", slot: "1st Period", subject_id: 1, teacher_id: 1 },
  { id: 2, class_id: 1, day: "Monday", slot: "2nd Period", subject_id: 2, teacher_id: 2 },
  { id: 3, class_id: 2, day: "Monday", slot: "1st Period", subject_id: 3, teacher_id: 3 },
  { id: 4, class_id: 2, day: "Monday", slot: "2nd Period", subject_id: 4, teacher_id: 4 },
  { id: 5, class_id: 3, day: "Monday", slot: "1st Period", subject_id: 5, teacher_id: 5 },
  { id: 6, class_id: 3, day: "Monday", slot: "2nd Period", subject_id: 6, teacher_id: 6 },
];

export const dummyAttendance = [
  { id: 1, student_id: 1, timetable_id: 1, date: "2023-08-01", present: true },
  { id: 2, student_id: 2, timetable_id: 1, date: "2023-08-01", present: false },
  { id: 3, student_id: 1, timetable_id: 2, date: "2023-08-01", present: true },
  { id: 4, student_id: 2, timetable_id: 2, date: "2023-08-01", present: true },
  { id: 5, student_id: 3, timetable_id: 3, date: "2023-08-01", present: true },
  { id: 6, student_id: 4, timetable_id: 3, date: "2023-08-01", present: false },
  { id: 7, student_id: 3, timetable_id: 4, date: "2023-08-01", present: true },
  { id: 8, student_id: 4, timetable_id: 4, date: "2023-08-01", present: true },
  { id: 9, student_id: 5, timetable_id: 5, date: "2023-08-01", present: false },
  { id: 10, student_id: 6, timetable_id: 5, date: "2023-08-01", present: true },
  { id: 11, student_id: 5, timetable_id: 6, date: "2023-08-01", present: true },
  { id: 12, student_id: 6, timetable_id: 6, date: "2023-08-01", present: true },
  // Add more attendance records for different dates
  { id: 13, student_id: 1, timetable_id: 1, date: "2023-08-02", present: true },
  { id: 14, student_id: 2, timetable_id: 1, date: "2023-08-02", present: true },
  { id: 15, student_id: 3, timetable_id: 3, date: "2023-08-02", present: false },
  { id: 16, student_id: 4, timetable_id: 3, date: "2023-08-02", present: true },
  { id: 17, student_id: 5, timetable_id: 5, date: "2023-08-02", present: true },
  { id: 18, student_id: 6, timetable_id: 5, date: "2023-08-02", present: false },
];