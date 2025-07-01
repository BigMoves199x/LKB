/* 'use server'

// app/api/applicants/[id]/status/route.ts
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { status } = await req.json();

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  try {
    await sql`
      UPDATE applicants
      SET status = ${status}
      WHERE id = ${id}
    `;

    return NextResponse.json({ message: 'Status updated' });
  } catch (error) {
    console.error('Error updating status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
 */