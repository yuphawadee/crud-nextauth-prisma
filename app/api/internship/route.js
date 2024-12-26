import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    const internships = await prisma.internship.findMany()
    return Response.json(internships)
}

export async function POST(request) {
    try {
        const { year, stId, comId, type, desc, status } = await request.json()
        const newInternship = await prisma.internship.create({
            data: {
                year,
                stId,
                comId,
                type,
                desc,
                status
            }
        })
        return Response.json({
            message: 'Student created successfully!',
            data: {
                newInternship
            }
        })
    } catch (error) {
        return Response.json({
            error
        }, { status: 500 })
    }
}

