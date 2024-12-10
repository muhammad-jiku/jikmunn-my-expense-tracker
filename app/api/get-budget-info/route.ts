import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { eq, getTableColumns, sql } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   const email = request.headers.get('X-User-Email');

//   if (!email) {
//     return NextResponse.json(
//       { error: 'Email is required in headers' },
//       { status: 400 }
//     );
//   }

//   const result = await db
//     .select({
//       ...getTableColumns(Budgets),
//       totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
//       totalItem: sql`count(${Expenses.id})`.mapWith(Number),
//     })
//     .from(Budgets)
//     .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
//     .where(
//       sql`${eq(Budgets.createdBy, email)} AND ${eq(Budgets.id, params.id)}`
//     ) // Combine conditions here
//     // .where(eq(Budgets.createdBy, email))
//     // .where(eq(Budgets.id, params.id))
//     .groupBy(Budgets.id);

//   return NextResponse.json(result);
// }

export async function GET(request: NextRequest) {
  const email = request.headers.get('X-User-Email');
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!email) {
    return NextResponse.json(
      { error: 'Email is required in headers' },
      { status: 400 }
    );
  }

  if (!id) {
    return NextResponse.json(
      { error: 'Budget ID is required' },
      { status: 400 }
    );
  }

  //   const numericId = Number(id); // Convert `id` to a number

  //   if (isNaN(numericId)) {
  //     return NextResponse.json({ error: 'Invalid budget ID' }, { status: 400 });
  //   }

  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(
      sql`${eq(Budgets.createdBy, email)} AND ${eq(Budgets.id, Number(id))}`
    ) // Use `numericId` for comparison
    .groupBy(Budgets.id);

  return NextResponse.json(result);
}
