import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  grade: text('grade'),
  parent_id: integer('parent_id').references(() => users.id),
});

export const teachers = pgTable('teachers', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
  subject: text('subject'),
});

export const classes = pgTable('classes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  teacher_id: integer('teacher_id').references(() => teachers.id),
});

export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  student_id: integer('student_id').references(() => students.id),
  class_id: integer('class_id').references(() => classes.id),
  date: timestamp('date').notNull(),
  present: boolean('present').notNull(),
});