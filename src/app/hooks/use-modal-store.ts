import { create } from 'zustand';

export type ModalType = "newClass" | "newTeacher" | "newStudent" | "newSubject" | "addTeacher" | "addSubject";

interface ModalData {
    classId?: number;
    teacherId?: number;
}

interface ModalStore {
    type: ModalType | null;
    isOpen: boolean;
    data: ModalData;
    onOpen: (type: ModalType, data?:ModalData) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: {},
    isOpen: false,
    onOpen: (type, data={}) => set({type, isOpen: true, data}),
    onClose: () => set({ type: null, isOpen: false }),
}));