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
        const result = await prisma.subject.update({
            where: { id: data.id },
            data: { name: data.name },
        });

        return { success: true, error: false }
    } catch (e) {
        console.error('Error updating subject:', e);
        return { success: false, error: true }
    }
}