import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm/sql';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  const result = await db
    .select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, email));

  return NextResponse.json(result);
}
