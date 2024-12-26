import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET Request: ดึงข้อมูลนักศึกษาจากฐานข้อมูล
export async function GET(request, { params }) {
    const studentId = Number(params.id)
    const student = await prisma.student.findUnique({
        where: {
            id: studentId
        }
    })
    return new Response(JSON.stringify(student), { status: 200 })
}

// PUT Request: อัพเดตข้อมูลนักศึกษา
export async function PUT(request, { params }) {
    try {
        // ตรวจสอบว่า id เป็นตัวเลข
        const studentId = Number(params.id)
        if (isNaN(studentId)) {
            return new Response(JSON.stringify({ error: 'Invalid student ID' }), { status: 400 })
        }

        const { stId, name, tel, type } = await request.json()

        // ตรวจสอบว่าทุกฟิลด์ที่จำเป็นมีข้อมูล
        if (!stId || !name || !tel || !type) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
        }

        // อัปเดตข้อมูลนักศึกษาในฐานข้อมูล
        const updateStudent = await prisma.student.update({
            where: { id: studentId },
            data: {
                stId,
                name,
                tel,
                type
            }
        })

        return new Response(JSON.stringify(updateStudent), { status: 200 })
    } catch (error) {
        console.error('Error updating student:', error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

// DELETE Request: ลบข้อมูลนักศึกษา
export async function DELETE(request, { params }) {
    try {
        const studentId = Number(params.id)
        const deleteStudent = await prisma.student.delete({
            where: { id: studentId }
        })
        return new Response(JSON.stringify(deleteStudent), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
