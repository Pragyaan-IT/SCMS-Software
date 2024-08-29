import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  time
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
  "admin",
  "teacher",
  "student",
  "parent",
]);

// Admin Table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default("admin"),
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
  role: roleEnum("role").notNull().default("student"),
  created_at: timestamp("created_at").defaultNow(),
});

// Teachers Table
export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teacher_id: text("teacher_id").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: roleEnum("role").notNull().default("teacher"),
});

export const teacherSubjects = pgTable("teacher_subjects", {
  id: serial("id").primaryKey(),
  teacher_id: integer("teacher_id")
    .references(() => teachers.id)
    .notNull(),
  subject_id: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
});

// Classes Table
export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

export const classTeachers = pgTable("class_teachers", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id")
    .references(() => classes.id)
    .notNull(),
  teacher_id: integer("teacher_id")
    .references(() => teachers.id)
    .notNull(),
});

// Subjects Table
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});


export const classSubjects = pgTable("class_subjects", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id")
    .references(() => classes.id)
    .notNull(),
  subject_id: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
});

// Timetable Table
export const timetable = pgTable("timetable", {
  id: serial("id").primaryKey(),
  class_id: integer("class_id")
    .references(() => classes.id)
    .notNull(),
  day: text("day").notNull(),
  slot: text("slot").notNull(),
  subject_id: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  teacher_id: integer("teacher_id")
    .references(() => teachers.id)
    .notNull(),
});

// Attendance Table
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id")
    .references(() => students.id)
    .notNull(),
  timetable_id: integer("timetable_id")
    .references(() => timetable.id)
    .notNull(),
  date: timestamp("date").notNull(),
  time: time("time").notNull(),
  present: boolean("present").notNull(),
});

// Marks Table
export const marks = pgTable("marks", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  student_id: integer("student_id")
    .references(() => students.id)
    .notNull(),
  subject_id: integer("subject_id")
    .references(() => subjects.id)
    .notNull(),
  marks: integer("marks").notNull(),
  date: timestamp("date").notNull(),
});

// Complaints Table
export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  teacherName: text("teacher_name").notNull(),
  teacherId: text("teacher_id").notNull(),
  classroomNumber: text("classroom_number").notNull(),
  message: text("message").notNull(),
  receivedAt: timestamp("received_at").defaultNow().notNull(),
  isResolved: boolean("is_resolved").default(false).notNull(),
});

// Discussion Table
export const discussions = pgTable("discussions", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id")
    .references(() => students.id)
    .notNull(),
  title: text("title").notNull(),
  subject_id: integer("subject_id").references(() => subjects.id).notNull(),
  type: text("type"),
  description: text("description").notNull(),
  is_solved: boolean("is_solved").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

// Discussion Replies Table
export const discussionReplies = pgTable("discussion_replies", {
  id: serial("id").primaryKey(),
  discussion_id: integer("discussion_id")
    .references(() => discussions.id)
    .notNull(),
  teacher_id: integer("teacher_id")
    .references(() => teachers.id),
  student_id: integer("student_id")
    .references(() => students.id),
  reply: text("reply").notNull(),
  is_solution: boolean("is_solution").default(false).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});