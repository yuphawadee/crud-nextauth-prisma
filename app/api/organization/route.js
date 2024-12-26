import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET Request: ดึงข้อมูลทั้งหมดจากฐานข้อมูล
export async function GET() {
    const organizations = await prisma.organization.findMany()
    return new Response(JSON.stringify(organizations), { status: 200 })
}

// POST Request: สร้างข้อมูลองค์กรใหม่
export async function POST(request) {
    try {
        const { comId, name, address, coordinator, tel } = await request.json()

        // ตรวจสอบว่า comId หรือ name ซ้ำในระบบหรือไม่
        const existingComId = await prisma.organization.findFirst({
            where: {
                comId: comId
            }
        })

        const existingName = await prisma.organization.findFirst({
            where: {
                name: name
            }
        })

        // ถ้ามี comId หรือ name ซ้ำ ให้คืนค่าข้อความผิดพลาด
        if (existingComId) {
            return new Response(JSON.stringify({
                error: 'รหัสบริษัทนี้ซ้ำในระบบ'
            }), { status: 400 })
        }

        if (existingName) {
            return new Response(JSON.stringify({
                error: 'ชื่อบริษัทนี้ซ้ำในระบบ'
            }), { status: 400 })
        }

        // สร้างข้อมูลองค์กรใหม่
        const newOrganization = await prisma.organization.create({
            data: {
                comId,
                name,
                address,
                coordinator,
                tel
            }
        })
        
        // ส่งข้อมูลที่สร้างใหม่กลับ
        return new Response(JSON.stringify({
            message: 'Organization created successfully!',
            data: newOrganization
        }), { status: 201 })

    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }
}
