"use client"

import { useState, useEffect } from "react"
import NewClassModal from "../modals/NewClassModal";
import NewTeacherModal from "../modals/NewTeacherModal";
import NewStudentModal from "../modals/NewStudentModal";

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
            
        </div>
    )
}

export default ModalProvider