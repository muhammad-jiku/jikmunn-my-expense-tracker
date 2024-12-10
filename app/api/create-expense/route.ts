import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { data } = await request.json();

  const result = await db
    .insert(Expenses)
    .values({
      name: data?.name,
      amount: data?.amount,
      budgetId: data?.budgetId,
      createdAt: data?.createdAt,
    })
    .returning({
      insertedId: Expenses.id,
    });

  return NextResponse.json(result);
}
