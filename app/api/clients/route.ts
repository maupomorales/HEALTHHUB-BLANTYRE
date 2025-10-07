import { NextRequest, NextResponse } from 'next/server';
import clientManagement from '../../../src/services/clientManagement';
import { prisma } from '../../../lib/prisma';

// GET /api/clients - Get all clients
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const isActive = searchParams.get('isActive');

    const users = await prisma.user.findMany({
      where: {
        ...(role && { role: role as any }),
        ...(isActive !== null && { isActive: isActive === 'true' }),
      },
      include: {
        ownedProviders: true,
        reviews: true,
        bookings: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST /api/clients - Create new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, role, avatar, preferences } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const user = await clientManagement.createUser({
      name,
      email,
      phone,
      role: role || 'CLIENT',
      avatar,
      preferences,
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create client' },
      { status: 500 }
    );
  }
}




