## Core Tasks

- **Automated Attendance System**

  - Face recognition upon entering the classroom.
  - Counting the number of students in class.
  - Monitoring student attention based on posture.

- **Resource Usage Analysis**

  - Time spent on whiteboard, projector, and verbal instruction.

- **Attendance and Performance Reports**

  - Average class attendance report.
  - Weekly/monthly student performance reports sent to parents.
  - Teacher's performance report.

- **User Interfaces**

  - Attendance review UI for teachers.
  - Teacher's Dashboard:
    - Highlights students with low attendance.
    - Notifies parents of low attendance.
  - Student Dashboard.
  - Parent Dashboard.
  - Admin Dashboard:
    - Complete details of all teachers and students.

- **Emergency System Requirements**

- **Teacher-Student Interaction**

  - Online Q/A with teachers:
    - Number of questions answered appears in teacher's profile.
  - Student open chat.
  - Grievance section on Teacher's Dashboard for reporting issues in the classroom.

- **Focus on At-Risk Students**
  - Highlight students with lower grades or low attendance in the teacher's portal for extra attention.

## How to Run

```bash

pnpm install

pnpm run dev

```

## Run Supabase Locally

- Install Docker

```bash

# Install Supabase CLI

scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase

# Start Supabase

supabase start

```

## Seed Database

```bash

pnpm run db:seed

```

## Sync Database

```bash

pnpm run db:push

```
