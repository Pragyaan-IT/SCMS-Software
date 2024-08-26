import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["admin", "teacher", "student", "parent"]);

// Admin Table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default('admin'),
});

// Students Table
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  registration_id: text("registration_id").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  is_face_registered: boolean("is_face_registered").notNull().default(false),
  class_id: integer("class_id").references(() => classes.id),
  role: roleEnum("role").notNull().default('student'),
  created_at: timestamp("created_at").defaultNow(),
});


// Teachers Table
export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teacher_id: text("teacher_id").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default('teacher'),
});

export const teacherSubjects = pgTable("teacher_subjects", {
  id: serial("id").primaryKey(),
  teacher_id: integer("teacher_id").references(() => teachers.id).notNull(),
  subject_id: integer("subject_id").references(() => subjects.id).notNull(),
});


// Classes Table
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const classTeachers = pgTable("class_teachers", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id").references(() => classes.id).notNull(),
  teacher_id: integer("teacher_id").references(() => teachers.id).notNull(),
});

// Subjects Table
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teacher_id: integer("teacher_id").references(() => teachers.id).notNull(),
  class_id: integer("class_id").references(() => classes.id),
});


export const classStudents = pgTable("class_students", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id").references(() => classes.id).notNull(),
  student_id: integer("student_id").references(() => students.id).notNull(),
});

export const classSubjects = pgTable("class_subjects", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id").references(() => classes.id).notNull(),
  subject_id: integer("subject_id").references(() => subjects.id).notNull(),
});


// Timetable Table
export const timetable = pgTable("timetable", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id").references(() => classes.id).notNull(),
  day: text("day").notNull(),
  slot: text("slot").notNull(),
  subject_id: integer("subject_id").references(() => subjects.id).notNull(),
  teacher_id: integer("teacher_id").references(() => teachers.id).notNull(),
});

// Attendance Table
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id").references(() => students.id).notNull(),
  timetable_id: integer("timetable_id").references(() => timetable.id).notNull(),
  date: timestamp("date").notNull(),
  present: boolean("present").notNull(),
});

// Marks Table
export const marks = pgTable("marks", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  student_id: integer("student_id").references(() => students.id).notNull(),
  subject_id: integer("subject_id").references(() => subjects.id).notNull(),
  marks: integer("marks").notNull(),
  date: timestamp("date").notNull(),
});
