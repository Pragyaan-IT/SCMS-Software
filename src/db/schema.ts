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

export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  registration_id: text('registration_id').notNull().unique(),
  password: text('password').notNull(),
  email: text('email').notNull().unique(),
  is_face_registered: boolean('is_face_registered').notNull().default(false),
  created_at: timestamp('created_at').defaultNow(),
});
