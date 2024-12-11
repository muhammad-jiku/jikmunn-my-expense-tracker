import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request) {
  const { data } = await request.json();

  const result = await db
    .update(Budgets)
    .set({
      name: data?.name,
      amount: data?.amount,
      icon: data?.icon,
    })
    .where(eq(Budgets.id, data?.id))
    .returning();

  return NextResponse.json(result);
}
