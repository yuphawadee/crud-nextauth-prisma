import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
    const students = await prisma.student.findMany()
    return Response.json(students)
}

export async function POST(request) {
    try {
        const { stId, name, tel, type } = await request.json()
        const newStudent = await prisma.student.create({
            data: {
                stId,
                name,
                tel,
                type
            }
        })
        return Response.json({
            message: 'Student created successfully!',
            data: {
                newStudent
            }
        })
    } catch (error) {
        return Response.json({
            error
        }, { status: 500 })
    }
}