import { NextRequest, NextResponse } from 'next/server';
import clientManagement from '../../../src/services/clientManagement';
import { prisma } from '../../../lib/prisma';

// GET /api/providers - Get all providers
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const area = searchParams.get('area');
    const type = searchParams.get('type');
    const isVerified = searchParams.get('isVerified');
    const isActive = searchParams.get('isActive');

    const providers = await prisma.provider.findMany({
      where: {
        ...(area && { area: { contains: area, mode: 'insensitive' } }),
        ...(type && { type }),
        ...(isVerified !== null && { isVerified: isVerified === 'true' }),
        ...(isActive !== null && { isActive: isActive === 'true' }),
      },
      include: {
        reviews: true,
        owner: true,
        bookings: true,
      },
      orderBy: { rating: 'desc' },
    });

    return NextResponse.json({ success: true, data: providers });
  } catch (error) {
    console.error('Error fetching providers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch providers' },
      { status: 500 }
    );
  }
}

// POST /api/providers - Create new provider
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      type,
      address,
      phone,
      hours,
      services,
      area,
      website,
      email,
      description,
      images,
      coordinates,
      ownerId,
    } = body;

    // Validate required fields
    if (!name || !type || !address || !phone || !area) {
      return NextResponse.json(
        { success: false, error: 'Name, type, address, phone, and area are required' },
        { status: 400 }
      );
    }

    const provider = await clientManagement.createProvider({
      name,
      type,
      address,
      phone,
      hours,
      services: services || [],
      area,
      website,
      email,
      description,
      images,
      coordinates,
      ownerId,
    });

    return NextResponse.json({ success: true, data: provider }, { status: 201 });
  } catch (error) {
    console.error('Error creating provider:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create provider' },
      { status: 500 }
    );
  }
}