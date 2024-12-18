import { db } from '@/utils/dbConfig';
import { Incomes } from '@/utils/schema';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const email = request.headers.get('X-User-Email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required in headers' },
      { status: 400 }
    );
  }

  const result = await db
    .select({
      ...getTableColumns(Incomes),
      totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(Number),
    })
    .from(Incomes)
    .where(eq(Incomes.createdBy, email))
    .groupBy(Incomes.id);

  return NextResponse.json(result);
}
