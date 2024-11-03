"use server"

import prisma from "@/prisma"
import { SubjectInputs } from "./formValidationSchemas"
import { revalidatePath } from "next/cache"

export const createSubject = async (data: SubjectInputs) => {
    try {
        await prisma.subject.create({ 
            data: {
                name: data.name
            } 
        })
        
        revalidatePath("/")
    } catch(e) {
        console.error(e)
    }
}