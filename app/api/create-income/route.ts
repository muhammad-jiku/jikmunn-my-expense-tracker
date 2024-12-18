import { db } from '@/utils/dbConfig';
import { Incomes } from '@/utils/schema';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { data } = await request.json();

  const result = await db
    .insert(Incomes)
    .values({
      name: data?.name,
      amount: data?.amount,
      createdBy: data?.createdBy,
      icon: data?.icon,
    })
    .returning({
      insertedId: Incomes.id,
    });

  return NextResponse.json(result);
}
