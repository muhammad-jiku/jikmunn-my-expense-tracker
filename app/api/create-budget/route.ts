import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { data } = await request.json();

  const result = await db
    .insert(Budgets)
    .values({
      name: data?.name,
      amount: data?.amount,
      createdBy: data?.createdBy,
      icon: data?.icon,
    })
    .returning({
      insertedId: Budgets.id,
    });

  return NextResponse.json(result);
}
