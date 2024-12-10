import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  //   const email = request.headers.get('X-User-Email');
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  console.log(id);
  //   if (!email) {
  //     return NextResponse.json(
  //       { error: 'Email is required in headers' },
  //       { status: 400 }
  //     );
  //   }

  if (!id) {
    return NextResponse.json(
      { error: 'Budget ID is required' },
      { status: 400 }
    );
  }

  const result = await db
    .select()
    .from(Expenses)
    .where(eq(Expenses.budgetId, Number(id)))
    .orderBy(desc(Expenses.id));

  return NextResponse.json(result);
}
