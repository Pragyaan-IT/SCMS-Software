import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["teacher", "student", "parent"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: roleEnum("role").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  grade: text("grade"),
  parent_id: integer("parent_id").references(() => users.id),
});

export const teachers = pgTable("teachers", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id),
  subject: text("subject"),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teacher_id: integer("teacher_id").references(() => teachers.id),
});

export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  student_id: integer("student_id").references(() => students.id),
  class_id: integer("class_id").references(() => classes.id),
  date: timestamp("date").notNull(),
  present: boolean("present").notNull(),
});

// Define relations
export const usersRelations = relations(users, ({ many, one }) => ({
  studentProfile: one(students, {
    fields: [users.id],
    references: [students.user_id],
  }),
  teacherProfile: one(teachers, {
    fields: [users.id],
    references: [teachers.user_id],
  }),
  childrenProfiles: many(students),
}));

export const studentsRelations = relations(students, ({ one }) => ({
  user: one(users, {
    fields: [students.user_id],
    references: [users.id],
  }),
  parent: one(users, {
    fields: [students.parent_id],
    references: [users.id],
  }),
}));

export const teachersRelations = relations(teachers, ({ one, many }) => ({
  user: one(users, {
    fields: [teachers.user_id],
    references: [users.id],
  }),
  classes: many(classes),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(teachers, {
    fields: [classes.teacher_id],
    references: [teachers.id],
  }),
  attendances: many(attendance),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  student: one(students, {
    fields: [attendance.student_id],
    references: [students.id],
  }),
  class: one(classes, {
    fields: [attendance.class_id],
    references: [classes.id],
  }),
}));
