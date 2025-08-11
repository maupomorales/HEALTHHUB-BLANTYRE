import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.toLowerCase() || ''
  const area = searchParams.get('area') || undefined
  const type = searchParams.get('type') || undefined

  const providers = await prisma.provider.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { address: { contains: q, mode: 'insensitive' } },
                { area: { contains: q, mode: 'insensitive' } },
              ],
            }
          : {},
        area ? { area: { equals: area } } : {},
        type ? { type: { equals: type } } : {},
      ],
    },
    orderBy: { rating: 'desc' },
    take: 100,
  })

  return NextResponse.json({ providers })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, type, rating = 0, address, phone, hours, services = [], area } = body || {}
    if (!name || !type || !address || !phone || !area) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }
    const created = await prisma.provider.create({
      data: { name, type, rating, address, phone, hours, services, area },
    })
    return NextResponse.json(created, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}


