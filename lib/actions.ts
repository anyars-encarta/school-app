"use server"

import prisma from "@/prisma"
import { SubjectInputs } from "./formValidationSchemas"

type CurrentState = { success: boolean, error: boolean }
export const createSubject = async (currentState: CurrentState, data: SubjectInputs) => {
    try {
        await prisma.subject.create({
            data: { name: data.name }
        })

        return { success: true, error: false }
    } catch (e) {
        console.error(e);
        return { success: false, error: true }
    }
}

export const updateSubject = async (currentState: CurrentState, data: SubjectInputs) => {
    try {
        await prisma.subject.update({
            where: { id: data.id },
            data: { name: data.name },
        });

        return { success: true, error: false }
    } catch (e) {
        console.error('Error updating subject:', e);
        return { success: false, error: true }
    }
}

export const deleteSubject = async (currentState: CurrentState, data: FormData) => {
    const id = data.get("id") as string;

    try {
        await prisma.subject.delete({
            where: {
               id: parseInt(id)
            },
        });

        return { success: true, error: false }
    } catch (e) {
        console.error('Error updating subject:', e);
        return { success: false, error: true }
    }
}

export const deleteStudent = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteParent = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteTeacher = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteClass = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteLesson = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteExam = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteAssignment = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteResult = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteEvent = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteAttendance = async (currentState: CurrentState, data: SubjectInputs) => {

};

export const deleteAnnouncement = async (currentState: CurrentState, data: SubjectInputs) => {

};