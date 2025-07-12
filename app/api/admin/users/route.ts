import { type NextRequest, NextResponse } from "next/server"
import { UserDatabase } from "@/lib/database"

// Admin endpoint to manage users
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    const userDb = new UserDatabase()
    const users = await userDb.getAllUsers(limit, offset)
    const totalCount = await userDb.getUserCount()

    return NextResponse.json({
      success: true,
      data: {
        users: users.map((user) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          phone: user.phone,
          city: user.city,
          interests: user.interests,
          createdAt: user.created_at,
          isActive: user.is_active,
        })),
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount,
        },
      },
    })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

// Update user status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, updates } = body

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userDb = new UserDatabase()
    const updatedUser = await userDb.updateUser(userId, updates)

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        name: `${updatedUser.first_name} ${updatedUser.last_name}`,
        email: updatedUser.email,
        isActive: updatedUser.is_active,
      },
    })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// Delete user (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const userDb = new UserDatabase()
    const success = await userDb.deactivateUser(userId)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "User deactivated successfully",
      })
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
  } catch (error) {
    console.error("Error deactivating user:", error)
    return NextResponse.json({ error: "Failed to deactivate user" }, { status: 500 })
  }
}
