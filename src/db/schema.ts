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
  name: text("name").notNull(),
  registration_id: text("registration_id").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  is_face_registered: boolean("is_face_registered").notNull().default(false),
  created_at: timestamp("created_at").defaultNow(),
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
