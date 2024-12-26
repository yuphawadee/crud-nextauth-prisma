import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export async function GET() {
    const organizations = await prisma.organization.findMany()
    return Response.json(organizations)
}

export async function POST(request) {
    try {
        const { comId, name, address, coordinator, tel } = await request.json()
        const newOrganization = await prisma.organization.create({
            data: {
                comId,
                name,
                address,
                coordinator,
                tel
            }
        })
        return Response.json({
            message: 'Student created successfully!',
            data: {
                newOrganization
            }
        })
    } catch (error) {
        return Response.json({
            error
        }, { status: 500 })
    }
}