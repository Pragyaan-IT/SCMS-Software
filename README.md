# To do UI:

- [ ] **Student Dashboard(Once images are captured for attendance)**
  - Basic details: Profile picture,name,hometown address,section,hostel room no.
  - Profile Score [Gets calculated with formula]
  - Attendance 
  - AI chat-bot help in learning gaps (knows student data:attendance, cpi,class entry time, quiz score)
  - Ask Question section can tag subject teacher
  - Time Table
  - Class Resources (material shared by teacher)
  - Quiz page (attempt new quiz, previous quiz scores) --> Can use some quiz creator API
  - Greviance Section

- [ ] **Teacher Dashboard**
  - My Profile: 
    - Attendance 
    - Questions Answered
    - Profile Score
    - Graph showing (X:StudentCount, Y:Time(1hr) avg for all classes)
  - TimeTable
  - Classroom Section:
    -List of sections(can select which one to open)
    - Once Opened Section:
      - Attendance of students(with submit attendance button)
       - Higlighted students in attendance list(if attendance low or cpi low ?)
  -Create & Schedule Quiz Section:
    - Creates & Schedules quiz for a particular section or select multiple sections
    - Can see created quizes (when opens see marks of students in the attempted quiz)
      - Avg rating from students about the quiz
  - Grievance Section
   - Can launch a complain
      - Select from options: projector,ac,light,fan,other
      - Can give a short note
      - Number provided of the grievance manager?? 
      
- [ ] **Grievance Manager Portal**
  - Ongoing Complaints:
    - List of complains with details:
      - Issued by:(Teacher/Student Name)
      - Date and time
      - Location(room number)
      - See problem details regarding( projector,ac,light,fan,other)
      - Note Text
  - Resolved Complains:
    - List of resolved complains (with Duration in which the problem is resolved)

- [ ] **Parent Portal** (Least Priority not in Problem Statement)
  - Ward Details:
    - Photo
    - Name,Number, Hostel name,room no
    - Currnet Attendance
    - CPI
- [ ] **Alert Notification System**
  - See what can be done (Impt)

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
