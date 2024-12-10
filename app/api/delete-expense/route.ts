import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { data } = await request.json();

  const result = await db
    .delete(Expenses)
    .where(eq(Expenses.id, data.id))
    .returning();

  return NextResponse.json(result);
}
