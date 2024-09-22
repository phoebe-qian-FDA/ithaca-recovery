import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const updateAdmin = async (request: Request) => {
  try {
    // Parse the request body
    const { uid, name, email } = await request.json();
    
    // Check if UID is provided
    if (!uid) {
      return NextResponse.json({ error: "UID is required" }, { status: 400 });
    }

    // Use Prisma to update the admin's name and email by UID
    const updatedAdmin = await prisma.admin.update({
      where: { uid },
      data: { name, email },
    });

    // Return the updated admin data
    return NextResponse.json(updatedAdmin, { status: 200 });
  } catch (error) {
    // Handle errors, e.g., when admin is not found
    return NextResponse.json({ error: "Admin not found or update failed" }, { status: 500 });
  }
};

export { updateAdmin as PUT };
