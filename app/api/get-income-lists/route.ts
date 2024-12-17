import { db } from '@/utils/dbConfig';
import { Expenses, Incomes } from '@/utils/schema';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
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
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Incomes)
    .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
    .where(eq(Incomes.createdBy, email))
    .groupBy(Incomes.id)
    .orderBy(desc(Incomes.id));

  return NextResponse.json(result);
}
