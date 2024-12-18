import { db } from '@/utils/dbConfig';
import { Incomes } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { data } = await request.json();

  const result = await db
    .delete(Incomes)
    .where(eq(Incomes.id, data.id))
    .returning();

  return NextResponse.json(result);
}
