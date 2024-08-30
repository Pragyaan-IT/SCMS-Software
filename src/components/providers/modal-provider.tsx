"use client"

import { useState, useEffect } from "react"
import NewClassModal from "../modals/NewClassModal";
import NewTeacherModal from "../modals/NewTeacherModal";
import NewStudentModal from "../modals/NewStudentModal";
import NewSubjetModal from "../modals/NewSubjectModal";
import ClassSubject from "../modals/ClassSubject";
import ClassTeacher from "../modals/ClassTeacher";
import NewDiscusionModal from "../modals/NewDiscussionModal";
import NewResourcesModal from "../modals/NewResourcesModal";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) return null;

    return (
        <div>
            <NewClassModal />
            <NewTeacherModal />
            <NewStudentModal />
            <NewSubjetModal />
            <ClassSubject />
            <ClassTeacher />
            <NewDiscusionModal />
            <NewResourcesModal />
            
        </div>
    )
}

export default ModalProvider