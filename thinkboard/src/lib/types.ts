import { z } from "zod";

export const FormSchema = z.object({
    email: z.string().describe('Email').email({ message: 'Invalid email address' }),
    password: z.string().describe('Password').min(6, { message: 'Password must be at least 6 characters long' }).max(8, { message: 'Password must be at most 8 characters long' }),
})