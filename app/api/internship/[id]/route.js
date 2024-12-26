import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request, { params }) {
    const studentId = Number(params.id)
    const student = await prisma.internship.findUnique({
        where: {
            id: studentId
        }
    })
    return new Response(JSON.stringify(student), { status: 200 })
}

// PUT Request: อัพเดตข้อมูลนักศึกษา
export async function PUT(request, { params }) {
    try {
        const studentId = Number(params.id)
        if (isNaN(studentId)) {
            return new Response(JSON.stringify({ error: 'Invalid student ID' }), { status: 400 })
        }

        const {  year, stId, comId, type, desc, status } = await request.json()


        // if (!stId || !name || !tel || !type) {
        //     return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
        // }

        const updateInternship = await prisma.internship.update({
            where: { id: studentId },
            data: {
                year,
                stId,
                comId,
                type,
                desc,
                status
            }
        })

        return new Response(JSON.stringify(updateInternship), { status: 200 })
    } catch (error) {
        console.error('Error updating student:', error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const studentId = Number(params.id)
        const deleteStudent = await prisma.internship.delete({
            where: { id: studentId }
        })
        return new Response(JSON.stringify(deleteStudent), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
