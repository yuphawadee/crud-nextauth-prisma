import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET Request: ดึงข้อมูลนักศึกษาจากฐานข้อมูล
export async function GET(request, { params }) {
    const organizationId = Number(params.id)
    const organization = await prisma.organization.findUnique({
        where: {
            id: organizationId
        }
    })
    return new Response(JSON.stringify(organization), { status: 200 })
}

// PUT Request: อัพเดตข้อมูลนักศึกษา
export async function PUT(request, { params }) {
    try {
        // ตรวจสอบว่า id เป็นตัวเลข
        // const studentId = Number(params.id)
        // if (isNaN(studentId)) {
        //     return new Response(JSON.stringify({ error: 'Invalid student ID' }), { status: 400 })
        // }

        // const { stId, name, tel, type } = await request.json()

        // ตรวจสอบว่าทุกฟิลด์ที่จำเป็นมีข้อมูล
        // if (!stId || !name || !tel || !type) {
        //     return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
        // }

        // อัปเดตข้อมูลนักศึกษาในฐานข้อมูล
        const { comId, name, address, coordinator, tel } = await request.json()
        const organizationId = Number(params.id)
        const updateOrganization = await prisma.organization.update({
            where: { id: organizationId },
            data: {
                comId,
                name,
                address,
                coordinator,
                tel
            }
        })
        return new Response(JSON.stringify(updateOrganization), { status: 200 })
    } catch (error) {
        console.error('Error updating organization:', error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}

// DELETE Request: ลบข้อมูลนักศึกษา
export async function DELETE(request, { params }) {
    try {
        const comId = Number(params.id)
        const deleteOrganization = await prisma.organization.delete({
            where: { id: comId }
        })
        return new Response(JSON.stringify(deleteOrganization), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
