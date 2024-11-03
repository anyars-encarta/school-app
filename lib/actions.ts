"use server"

import prisma from "@/prisma"
import { SubjectInputs } from "./formValidationSchemas"
import { revalidatePath } from "next/cache"

type CurrentState = { success: boolean, error: boolean }
export const createSubject = async (currentState: CurrentState, data: SubjectInputs) => {
    try {
        await prisma.subject.create({ 
            data: {
                name: data.name
            } 
        })
        
        revalidatePath("/list/subjects");
        return {success: true, error: false}
    } catch(e) {
        console.error(e);
        return {success: false, error: true}
    }
}