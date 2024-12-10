import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  const { data } = await request.json();

  const expenseResult = await db
    .delete(Expenses)
    .where(eq(Expenses.budgetId, data.id))
    .returning();

  if (expenseResult) {
    const result = await db
      .delete(Budgets)
      .where(eq(Budgets.id, data.id))
      .returning();

    return NextResponse.json(result);
  }
}
